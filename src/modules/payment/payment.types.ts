import {Language, MatrixType} from "@prisma/client";

export interface CreateCheckoutBody {
    matrixType: MatrixType;
    email: string;
    name?: string;
    day: number;
    month: number;
    year: number;
    lang: Language;
    partnerDate?: {
        day: number;
        month: number;
        year: number;
    };
}


export interface GetOrdersParams {
    page: number;
    limit: number;
    paidStatus?: 'true' | 'false';
}
