import {FastifyInstance} from "fastify";
import ReviewsController from "./reviews.controller";

export default async function reviewsRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/',
        {},
        ReviewsController.getReviews
    );

    fastify.get(
        '/:id',
        {},
        ReviewsController.getReviewById
    );

    fastify.post(
        '/',
        {
            preHandler: [fastify.authenticate]
        },
        ReviewsController.saveReview
    );

    fastify.delete(
        '/:id',
        {
            preHandler: [fastify.authenticate]
        },
        ReviewsController.deleteReview
    );
}
