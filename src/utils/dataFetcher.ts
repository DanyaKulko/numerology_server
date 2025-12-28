import {
    STRUCTURE_CHILD,
    STRUCTURE_COMPATIBILITY,
    STRUCTURE_FINANCE,
    STRUCTURE_GENERAL,
    STRUCTURE_PROGNOSIS
} from "./reportStructures";
import {prisma} from "../db";
import {Language} from "../modules/admin/admin.types";

export type MatrixCategoryType = 'GENERAL'| 'COMPATIBILITY' | 'CHILD' | 'PROGNOSIS' | 'FINANCE';

const getStructure = (type: MatrixCategoryType) => {
    switch (type) {
        case 'FINANCE':
            return STRUCTURE_FINANCE;
        case 'GENERAL':
            return STRUCTURE_GENERAL;
        case 'COMPATIBILITY':
            return STRUCTURE_COMPATIBILITY
        case 'CHILD':
            return STRUCTURE_CHILD;
        case 'PROGNOSIS':
            return STRUCTURE_PROGNOSIS;
        default:
            return STRUCTURE_GENERAL;
    }
}

export async function getReportData(matrixNumbers: any, lang: Language = 'FI', type: MatrixCategoryType = 'GENERAL') {
    console.log(`🔍 Building Report: ${type} [${lang}]`);

    const structure = getStructure(type);

    const categorySlugs = structure.map(s => s.categorySlug);
    const positionSlugs = structure.flatMap(s => s.items.map(i => i.positionSlug));

    const [categoriesDB, positionsDB] = await Promise.all([
        prisma.matrixCategory.findMany({
            where: { slug: { in: categorySlugs } },
            include: { translations: { where: { language: lang } } }
        }),
        prisma.matrixPosition.findMany({
            where: { slug: { in: positionSlugs } },
            include: {
                interpretations: { where: { language: lang } },
                translations: { where: { language: lang } }
            }
        })
    ]);

    const reportSections = structure.map(sectionConfig => {
        const catDB = categoriesDB.find((c: any) => c.slug === sectionConfig.categorySlug);

        let catTitle = `[NOT_FOUND: Cat ${sectionConfig.categorySlug}]`;
        let catDesc: string | null = "";

        if (catDB) {
            if (catDB.translations.length > 0) {
                catTitle = catDB.translations[0].title;
                catDesc = catDB.translations[0].description;
            } else {
                catTitle = `[NO_TRANS: ${sectionConfig.categorySlug}]`;
            }
        }

        const items = sectionConfig.items.map(itemConfig => {
            const arcana = Number(matrixNumbers[itemConfig.matrixKey]);
            const posDB = positionsDB.find((p: any) => p.slug === itemConfig.positionSlug);

            let itemTitle = `[NOT_FOUND: Pos ${itemConfig.positionSlug}]`;
            let itemContent = `[NOT_FOUND: Content for Arcana ${arcana}]`;

            if (posDB) {
                const posName = posDB.translations[0]?.name || posDB.slug;
                itemTitle = `${posName} (${arcana})`;

                const interpretation = posDB.interpretations.find((i: any) => i.arcana === arcana);

                if (interpretation && interpretation.content) {
                    itemContent = interpretation.content;
                } else {
                    itemContent = `<span style="color:red; font-weight:bold;">
                        [MISSING CONTENT: ${itemConfig.positionSlug} / Arcana ${arcana} / Lang ${lang}]
                    </span>`;
                }
            }

            return {
                title: itemTitle,
                content: itemContent,
                slug: itemConfig.positionSlug,
                arcana: arcana
            };
        });

        return {
            title: catTitle,
            description: catDesc,
            items: items
        };
    });

    return {
        matrix: matrixNumbers,
        sections: reportSections
    };
}
