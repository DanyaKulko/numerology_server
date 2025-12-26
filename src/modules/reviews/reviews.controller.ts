import {FastifyRequest} from "fastify";
import ReviewsService from "./reviews.service";
import {SaveReviewRequest} from "./reviews.types";

class ReviewsController {
    async getReviews(req: FastifyRequest) {
        return ReviewsService.getReviews();
    }

    async getReviewById(req: FastifyRequest<{ Params: { id: string } }>) {
        return ReviewsService.getReviewById(Number(req.params.id));
    }

    async saveReview(req: FastifyRequest<SaveReviewRequest>) {
        return ReviewsService.saveReview(req.body);
    }

    async deleteReview(req: FastifyRequest<{ Params: { id: string } }>) {
        return ReviewsService.deleteReview(Number(req.params.id));
    }
}

export default new ReviewsController();
