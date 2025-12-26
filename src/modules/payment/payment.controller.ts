import {FastifyRequest} from 'fastify';
import {CreateCheckoutBody} from "./payment.types";
import PaymentService from "./payment.service";

class PaymentController {
    async getAll(req: FastifyRequest) {
        const { page = 1, limit = 20, paid } = req.query as {
            page?: number;
            limit?: number;
            paid?: 'true' | 'false';
        };

        return PaymentService.getAllOrders({
            page: Number(page),
            limit: Number(limit),
            paidStatus: paid // 'true', 'false' или undefined
        });
    }
    async createCheckoutSession(req: FastifyRequest<{ Body: CreateCheckoutBody }>) {
        return PaymentService.createCheckoutSession(req.body)
    }

    async handleWebhook(req: FastifyRequest) {
        const sig = req.headers['stripe-signature'] as string;
        const rawBody = req.rawBody;

        return PaymentService.handleWebhookEvent(sig, rawBody);
    }
}

export default new PaymentController();
