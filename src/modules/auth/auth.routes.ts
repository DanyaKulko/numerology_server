import { FastifyInstance } from "fastify";
import AuthController from "./auth.controller";

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/login', AuthController.login);

    fastify.post('/register', AuthController.createAdmin);

    fastify.get('/me', {
        onRequest: [fastify.authenticate]
    }, AuthController.me);
}
