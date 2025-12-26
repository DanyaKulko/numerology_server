import {FastifyInstance} from "fastify";
import StatisticsController from "./statistics.controller";

export default async function statisticsRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/',
        {},
        StatisticsController.getStatistics
    );

    fastify.post(
        '/',
        {
            preHandler: [fastify.authenticate]
        },
        StatisticsController.saveStatistics
    );

    fastify.delete(
        '/',
        {
            preHandler: [fastify.authenticate]
        },
        StatisticsController.deleteStatistic
    );
}
