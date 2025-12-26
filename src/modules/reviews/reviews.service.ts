import {prisma} from "../../db";
import {Language} from "../admin/admin.types";

class ReviewsService {
    async getReviews() {
        return prisma.review.findMany({
            include: { translations: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getReviewById(id: number) {
        return prisma.review.findUnique({
            where: { id },
            include: { translations: true }
        });
    }

    async saveReview(data: {
        id?: number;
        isActive: boolean;
        translations: { language: Language; content: string }[]
    }) {
        const { id, isActive, translations } = data;

        if (id) {
            return prisma.review.update({
                where: { id: Number(id) },
                data: {
                    isActive,
                    translations: {
                        deleteMany: {},
                        create: translations
                    }
                }
            });
        } else {
            // Create
            return prisma.review.create({
                data: {
                    isActive,
                    translations: { create: translations }
                }
            });
        }
    }

    async deleteReview(id: number) {
        return prisma.review.delete({ where: { id: Number(id) } });
    }
}

export default new ReviewsService()
