import {FastifyInstance} from "fastify";
import PaymentController from "./payment.controller";

export default async function paymentRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/',
        {
            preHandler: [fastify.authenticate]
        },
        PaymentController.getAll
    );

    fastify.post(
        '/checkout-session',
        {
            // preHandler: [fastify.authenticate]
        },
        PaymentController.createCheckoutSession
    );

    fastify.post(
        '/webhook',
        {
            config: {
                rawBody: true
            }
        },
        PaymentController.handleWebhook
    );
}
