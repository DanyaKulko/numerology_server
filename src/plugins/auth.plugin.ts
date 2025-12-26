import type { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import config from "../config";
import fastifyJwt from '@fastify/jwt';

const authPlugin = async (fastify: FastifyInstance) => {
    fastify.register(fastifyJwt, {
        secret: config.JWT_SECRET,
        sign: {
            expiresIn: "1w",
        },
    });

    fastify.decorate("authenticate", async (request: FastifyRequest) => {
        return request.jwtVerify();
    });
};

export default fp(authPlugin, {
    name: "auth",
});
