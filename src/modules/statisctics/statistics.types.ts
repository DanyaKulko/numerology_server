import {Language} from "../admin/admin.types";

export interface SaveStatisticRequest {
    Body: {
        stats: {
            key: string;
            value: string;
            labels: Record<Language, string>; // { RU: "...", EN: "..." }
        }[]
    }
}
