import {Implements} from "../../types/common";
import {RouteGenericInterface} from "fastify";

export const languages = ['RU', 'EN', 'FI', 'SV'] as const;
export type Language = typeof languages[number];

export type GetCategoryBySlugRequest = Implements<
    RouteGenericInterface,
    {
        Params: {
            slug: string;
        };
    }
>;

export type GetPositionBySlugRequest = Implements<
    RouteGenericInterface,
    {
        Params: {
            slug: string;
        };
    }
>;

export type SaveInterpretationRequest = Implements<
    RouteGenericInterface,
    {
        Body: {
            positionId: number;
            arcana: number;
            translations: { language: Language; title: string; content: string }[]
        };
    }
>;

export type SaveCategoryTranslationRequest = Implements<
    RouteGenericInterface,
    {
        Body: {
            categoryId: number;
            translations: { language: Language; title: string; content: string }[]
        };
    }
>;

export type SavePositionTranslationRequest = Implements<
    RouteGenericInterface,
    {
        Body: {
            positionId: number;
            translations: { language: Language; title: string; }[]
        };
    }
>;


