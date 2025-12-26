import {CreateCheckoutBody, GetOrdersParams} from "./payment.types";
import config from "../../config";
import HttpError from "../../errors/HttpError";
import {prisma} from "../../db";
import Stripe from "stripe";
import logger from "../../utils/logger";
import {MatrixGeneratorFactory} from "../matrix/pdf-generator/categories";
import {MatrixCategoryType} from "../../utils/dataFetcher";
import MatrixService from "../matrix/matrix.service";
import {Prisma} from "@prisma/client";

class PaymentService {
    protected stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(config.STRIPE.SECRET_KEY);
    }

    async getAllOrders({ page, limit, paidStatus }: GetOrdersParams) {
        const skip = (page - 1) * limit;

        const where: Prisma.OrderWhereInput = {};
        if (paidStatus === 'true') {
            where.isPaid = true;
        } else if (paidStatus === 'false') {
            where.isPaid = false;
        }

        // Выполняем два запроса параллельно для эффективности
        const [orders, total] = await prisma.$transaction([
            prisma.order.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.order.count({ where })
        ]);

        return {
            data: orders,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit)
            }
        };
    }

    async createCheckoutSession({day, month, year, lang, name, matrixType, partnerDate, email}: CreateCheckoutBody) {
        const matrix = await MatrixService.getMatrixByType(matrixType);
        if (!matrix.isActive) {
            throw new HttpError(400, 'Selected matrix type is not available for purchase');
        }

        const translations = matrix.translations as Record<string, string>;
        const productName = translations[lang] || translations['EN'] || translations['FI'] || matrix.type;

        const unitAmount = Math.round(Number(matrix.price) * 100);


        const order = await prisma.order.create({
            data: {
                email,
                name: name || 'Unknown User',
                matrixType,
                day: Number(day),
                month: Number(month),
                year: Number(year),
                lang: lang || 'FI',
                isPaid: false,
                partnerDay: partnerDate ? Number(partnerDate.day) : null,
                partnerMonth: partnerDate ? Number(partnerDate.month) : null,
                partnerYear: partnerDate ? Number(partnerDate.year) : null,
            },
        });

        const successUrl = `https://${config.DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `https://${config.DOMAIN}/`;

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: productName,
                    },
                    unit_amount: unitAmount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            metadata: {
                order_id: order.id,
            },
            customer_email: email,
            success_url: successUrl,
            cancel_url: cancelUrl,
        });

        await prisma.order.update({
            where: {id: order.id},
            data: {stripeSessionId: session.id},
        });

        return {url: session.url};
    }

    async handleWebhookEvent(sig: string, rawBody: any) {
        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(rawBody, sig, config.STRIPE.WEBHOOK_SECRET);
        } catch (err: any) {
            logger.error(`Webhook signature verification failed: ${err.message}`);
            throw new HttpError(400, `Webhook Error: ${err.message}`);
        }

        if ([
            'checkout.session.completed',
            'payment_intent.succeeded',
            'charge.succeeded'
        ].includes(event.type)) {

            const session = event.data.object as Stripe.Checkout.Session;
            const orderId = session.metadata?.order_id;

            if (orderId) {
                try {
                    const order = await prisma.order.update({
                        where: {id: orderId},
                        data: {isPaid: true},
                    });

                    logger.info(`Order ${orderId} paid successfully.`);

                    (async () => {
                        try {
                            const generator = MatrixGeneratorFactory.getGenerator(order.matrixType);

                            const partnerDate = (order.partnerDay && order.partnerMonth && order.partnerYear)
                                ? {
                                    day: order.partnerDay,
                                    month: order.partnerMonth,
                                    year: order.partnerYear
                                }
                                : null;

                            // Генерируем полный отчет
                            const pdfBuffer = await generator.generateFull({
                                day: order.day,
                                month: order.month,
                                year: order.year,
                                lang: order.lang,
                                matrixCategory: order.matrixType as unknown as MatrixCategoryType,
                                partnerDate
                            });

                            if (pdfBuffer) {
                                // await sendPaymentSuccessEmail(order.email, pdfBuffer);
                                logger.info(`Email sent for order ${order.id}`);
                            }
                        } catch (e) {
                            logger.error(`Failed post-payment processing for order ${order.id}:`, e);
                        }
                    })().catch(() => {
                    });

                } catch (err) {
                    logger.error(`Error processing order ${orderId}:`, err);
                }
            }
        }

        return {received: true};
    }
}

export default new PaymentService()
