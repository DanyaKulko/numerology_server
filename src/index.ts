import Fastify, {FastifyInstance} from 'fastify';
import cors from '@fastify/cors';
import adminRoutes from "./modules/admin/admin.routes";
import logger from "./utils/logger";
import loggerPlugin from "./plugins/logger.plugin";
import config from "./config";
import errorHandlerPlugin from "./plugins/errorHandler.plugin";
import {prisma} from "./db";
import reviewsRoutes from "./modules/reviews/reviews.router";
import statisticsRoutes from "./modules/statisctics/statistics.router";
import authPlugin from "./plugins/auth.plugin";
import paymentRoutes from "./modules/payment/payment.routes";
import fastifyRawBody from "fastify-raw-body";
import matrixRoutes from "./modules/matrix/matrix.routes";
import authRoutes from "./modules/auth/auth.routes";
import reportController from "./modules/report/report.controller";
import siteStatusController from "./modules/site-status/site-status.controller";

async function buildServer(): Promise<FastifyInstance> {
    const server = Fastify({ logger: false });

    await registerPlugins(server);
    await registerRoutes(server);

    for (const signal of ["SIGINT", "SIGTERM"]) {
        process.on(signal, async () => {
            logger.error(`Received ${signal}, closing server.`);
            await server.close();
            process.exit(0);
        });
    }

    return server;
}

async function registerPlugins(server: FastifyInstance): Promise<void> {
    try {
        await server.register(cors, { origin: true });
        // await server.register(helmet);
        await server.register(authPlugin);
        await server.register(loggerPlugin);
        await server.register(errorHandlerPlugin);
        await server.register(fastifyRawBody, {
            global: false,
        });
    } catch (error) {
        logger.error("Error registering plugins", error);
        throw error;
    }
}

async function registerRoutes(server: FastifyInstance): Promise<void> {
    try {
        await reportController(server); // todo: adapt to route plugin
        await siteStatusController(server); // todo: adapt to route plugin
        await server.register(authRoutes, { prefix: "api/auth" });
        await server.register(adminRoutes, { prefix: "api/admin" });
        await server.register(reviewsRoutes, { prefix: "api/reviews" });
        await server.register(statisticsRoutes, { prefix: "api/statistics" });
        await server.register(paymentRoutes, { prefix: "api/payments" });
        await server.register(matrixRoutes, { prefix: "api/matrix" });
    } catch (error) {
        logger.error("Error registering routes", error);
        throw error;
    }
}

buildServer().then(async (server) => {
    try {
        await prisma.$connect();
        logger.info('Database connected.');

        await server.ready();

        await server.listen({ port: config.PORT, host: '0.0.0.0' });
        logger.info(`Server listening at http://localhost:${config.PORT}`);

        if (!config.PROD) {
            logger.info(
                `Swagger UI available at http://localhost:${config.PORT}/docs`,
            );
        }
    } catch (error) {
        logger.error("Error starting server", error);
        process.exit(1);
    }
});

export default buildServer;
