import {Language} from "./admin.types";
import {prisma} from "../../db";
import HttpError from "../../errors/HttpError";

class AdminService {
    async getCategories() {
        return prisma.matrixCategory.findMany({
            orderBy: {type: 'asc'},
            include: {
                translations: true
            }
        });
    }

    async getCategoryBySlug(slug: string) {
        const category = await prisma.matrixCategory.findUnique({
            where: {slug},
            include: {
                positions: {
                    orderBy: {sortOrder: 'asc'},
                    include: {
                        translations: true
                    }
                },
                translations: true
            }
        });

        if (!category) throw new HttpError(404, 'Category not found');
        return category;
    }

    async getPositionBySlug(slug: string) {
        const position = await prisma.matrixPosition.findUnique({
            where: {slug},
            include: {
                translations: true,
                interpretations: true // Получаем тексты на всех языках и арканах
            }
        });

        if (!position) throw new HttpError(404, 'Position not found');
        return position;
    }

    async saveInterpretation(data: {
        positionId: number;
        arcana: number;
        translations: { language: Language; title: string; content: string }[]
    }) {
        const {positionId, arcana, translations} = data;

        if (!positionId || !arcana || !translations) {
            throw new HttpError(400, 'Missing required fields');
        }

        return prisma.$transaction(
            translations.map((t) =>
                prisma.interpretation.upsert({
                    where: {
                        positionId_arcana_language: {
                            positionId: Number(positionId),
                            arcana: Number(arcana),
                            language: t.language,
                        },
                    },
                    update: {title: t.title || '', content: t.content || ''},
                    create: {
                        positionId: Number(positionId),
                        arcana: Number(arcana),
                        language: t.language,
                        title: t.title || '',
                        content: t.content || '',
                    },
                })
            )
        );
    }

    async saveCategoryTranslation(data: {
        categoryId: number;
        translations: { language: Language; title: string; content: string }[]
    }) {
        const {categoryId, translations} = data;

        return prisma.$transaction(
            translations.map((t) =>
                prisma.categoryTranslation.upsert({
                    where: {
                        categoryId_language: {
                            categoryId: Number(categoryId),
                            language: t.language,
                        },
                    },
                    update: {title: t.title, description: t.content},
                    create: {
                        categoryId: Number(categoryId),
                        language: t.language,
                        title: t.title || '',
                        description: t.content || '',
                    },
                })
            )
        );
    }

    async savePositionTranslation(data: {
        positionId: number; translations: { language: Language; title: string; }[]
    }) {
        const {positionId, translations} = data;

        return prisma.$transaction(
            translations.map((t) =>
                prisma.positionTranslation.upsert({
                    where: {
                        positionId_language: {positionId: Number(positionId), language: t.language}
                    },
                    update: {name: t.title},
                    create: {positionId: Number(positionId), language: t.language, name: t.title, description: ''}
                })
            ))
    }
}

export default new AdminService()
