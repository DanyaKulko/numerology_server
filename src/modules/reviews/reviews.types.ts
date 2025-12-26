import {Language} from "../admin/admin.types";

export interface SaveReviewRequest {
    Body: {
        id?: number;
        isActive: boolean;
        translations: {
            language: Language;
            content: string;
        }[]
    }
}
