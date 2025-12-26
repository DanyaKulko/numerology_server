import { FastifyRequest } from 'fastify';
import MatrixService from "./matrix.service";
import { MatrixParams, UpdateMatrixBody } from "./matrix.types";

class MatrixController {
    async getAll(req: FastifyRequest) {
        return MatrixService.getAllMatrix();
    }

    async getByType(req: FastifyRequest<{ Params: MatrixParams }>) {
        const { type } = req.params;
        return MatrixService.getMatrixByType(type);
    }

    async update(req: FastifyRequest<{ Params: MatrixParams, Body: UpdateMatrixBody }>) {
        const { type } = req.params;
        return MatrixService.updateMatrix(type, req.body);
    }
}

export default new MatrixController();
