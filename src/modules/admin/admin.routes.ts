import {FastifyInstance} from "fastify";
import AdminController from "./admin.controller";

export default async function adminRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/categories',
        {
            preHandler: [fastify.authenticate]
        },
        AdminController.getCategories
    );

    fastify.get(
        '/categories/:slug',
        {
            preHandler: [fastify.authenticate]
        },
        AdminController.getCategoryBySlug
    );

    fastify.get(
        '/positions/:slug',
        {
            preHandler: [fastify.authenticate]
        },
        AdminController.getPositionBySlug
    );

    fastify.post(
        '/interpretations',
        {
            preHandler: [fastify.authenticate]
        },
        AdminController.saveInterpretation
    );

    fastify.post(
        '/categories/translation',
        {
            preHandler: [fastify.authenticate]
        },
        AdminController.saveCategoryTranslation
    );

    fastify.post(
        '/positions/translation',
        {
            preHandler: [fastify.authenticate]
        },
        AdminController.savePositionTranslation
    );

    fastify.post(
        '/report/pdf',
        {
            preHandler: [fastify.authenticate]
        },
        AdminController.generateAdminPdf
    );
}
