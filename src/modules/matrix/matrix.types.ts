import { MatrixType } from '@prisma/client';

export interface UpdateMatrixBody {
    price?: number;
    oldPrice?: number | null;
    isActive?: boolean;
    translations?: Record<string, string>;
}

export interface MatrixParams {
    type: MatrixType;
}
