import {FastifyReply, FastifyRequest} from "fastify";
import AdminService from "./admin.service";
import {
    GetCategoryBySlugRequest,
    GetPositionBySlugRequest, Language,
    SaveCategoryTranslationRequest,
    SaveInterpretationRequest, SavePositionTranslationRequest
} from "./admin.types";
import {MatrixCategoryType} from "../../utils/dataFetcher";
import {MatrixGeneratorFactory} from "../matrix/pdf-generator/categories";

class AdminController {
    async getCategories(req: FastifyRequest) {
        return AdminService.getCategories()
    }

    async getCategoryBySlug(req: FastifyRequest<GetCategoryBySlugRequest>) {
        const {slug} = req.params;
        return AdminService.getCategoryBySlug(slug);
    }

    async getPositionBySlug(req: FastifyRequest<GetPositionBySlugRequest>) {
        const {slug} = req.params;
        return AdminService.getPositionBySlug(slug);
    }

    async saveInterpretation(req: FastifyRequest<SaveInterpretationRequest>) {
        const {positionId, arcana, translations} = req.body;
        return AdminService.saveInterpretation({positionId, arcana, translations});
    }

    async saveCategoryTranslation(req: FastifyRequest<SaveCategoryTranslationRequest>) {
        const {categoryId, translations} = req.body;
        return AdminService.saveCategoryTranslation({categoryId, translations});
    }

    async savePositionTranslation(req: FastifyRequest<SavePositionTranslationRequest>) {
        const {positionId, translations} = req.body;
        return AdminService.savePositionTranslation({positionId, translations});
    }

    async generateAdminPdf(req: FastifyRequest, reply: FastifyReply) {
        const {day, month, year, lang, type, category, partnerDate} = req.body as {
            day: string,
            month: string,
            year: string,
            lang: Language;
            type: 'summary' | 'full',
            category: MatrixCategoryType,
            partnerDate?: {
                day: number;
                month: number;
                year: number;
            };
        };

        const method = type === 'summary' ? 'generateSummary' : 'generateFull';

        const res = await MatrixGeneratorFactory.getGenerator(category)[method]({
            day,
            month,
            year,
            lang,
            matrixCategory: category as unknown as MatrixCategoryType,
            partnerDate
        });

        reply.header('Content-Type', 'application/pdf');
        reply.header('Content-Disposition', 'attachment; filename="matrix_report.pdf"');

        return res;
    }
}

export default new AdminController();
