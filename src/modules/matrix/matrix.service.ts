import {MatrixType} from "@prisma/client";
import {prisma} from "../../db";
import HttpError from "../../errors/HttpError";
import {UpdateMatrixBody} from "./matrix.types";

class MatrixService {
    async getAllMatrix() {
        return prisma.matrixProduct.findMany({
            orderBy: { type: 'asc' }
        });
    }

    async getMatrixByType(type: MatrixType) {
        const matrix = await prisma.matrixProduct.findUnique({
            where: { type }
        });

        if (!matrix) {
            throw new HttpError(404, 'Matrix not found');
        }
        return matrix;
    }

    async updateMatrix(type: MatrixType, data: UpdateMatrixBody) {
        await this.getMatrixByType(type);

        return prisma.matrixProduct.update({
            where: { type },
            data: {
                ...(data.price !== undefined && { price: data.price }),
                ...(data.oldPrice !== undefined && { oldPrice: data.oldPrice }),
                ...(data.isActive !== undefined && { isActive: data.isActive }),
                ...(data.translations !== undefined && { translations: data.translations }),
            }
        });
    }
}

export default new MatrixService();
