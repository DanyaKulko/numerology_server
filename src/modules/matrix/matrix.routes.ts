import MatrixController from "./matrix.controller";

export default function matrixRoutes(fastify: any) {
    fastify.get(
        '/',
        {
            // preHandler: [fastify.authenticate]
        },
        MatrixController.getAll
    );

    fastify.get(
        '/:type',
        {
            // preHandler: [fastify.authenticate]
        },
        MatrixController.getByType
    );

    fastify.put(
        '/:type',
        {
            preHandler: [fastify.authenticate]
        },
        MatrixController.update
    );
}

