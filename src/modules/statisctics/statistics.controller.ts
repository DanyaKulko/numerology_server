import {FastifyRequest} from "fastify";
import StatisticsService from "./statistics.service";
import {SaveStatisticRequest} from "./statistics.types";

class StatisticsController {
    async getStatistics(req: FastifyRequest) {
        return StatisticsService.getStatistics();
    }

    async saveStatistics(req: FastifyRequest<SaveStatisticRequest>) {
        return StatisticsService.saveStatistics(req.body.stats);
    }

    async deleteStatistic(req: FastifyRequest<{ Params: { key: string } }>) {
        return StatisticsService.deleteStatistic(req.params.key);
    }
}

export default new StatisticsController();
