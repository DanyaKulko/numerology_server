import type {FastifyPluginAsync} from "fastify";
import fp from "fastify-plugin";
import logger from "../utils/logger";

const loggerPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.addHook("onResponse", async (request, reply) => {
        logger.info(
            `[${reply.statusCode}] Request: ${request.method} ${request.url} from ${request.ip} - Response time: ${reply.elapsedTime.toFixed(2)} ms`,
        );
    });
};

export default fp(loggerPlugin);
