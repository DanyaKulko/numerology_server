import { FastifyInstance } from 'fastify';
import { MatrixType, Language } from '@prisma/client';
import { MatrixCategoryType } from '../../utils/dataFetcher';
import { MatrixGeneratorFactory } from "../matrix/pdf-generator/categories";

interface GetDemoReportBody {
    day: string;
    month: string;
    year: string;
    lang: Language;
    matrixType: MatrixType;
    partnerDate?: { day: string; month: string; year: string };
}

export default async function reportController(fastify: FastifyInstance) {

    fastify.post<{ Body: GetDemoReportBody }>('/api/demo', async (req, reply) => {
        const { day, month, year, lang, matrixType, partnerDate } = req.body;

        try {
            const generator = MatrixGeneratorFactory.getGenerator(matrixType);

            const buffer = await generator.generateSummary({
                day,
                month,
                year,
                lang,
                matrixCategory: matrixType as unknown as MatrixCategoryType,
                partnerDate
            });

            reply.header('Content-Type', 'application/pdf');
            reply.header('Content-Disposition', `attachment; filename="demo_${matrixType}.pdf"`);
            return reply.send(buffer);

        } catch (error: any) {
            req.log.error(error);
            return reply.status(500).send({ error: error.message });
        }
    });
}
