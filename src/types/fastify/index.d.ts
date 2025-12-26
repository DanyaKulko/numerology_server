import "fastify";

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: FastifyMiddleware;
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: PayloadType;
    }
}
