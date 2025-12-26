import {prisma} from "../../db";

class StatisticsService {
    async getStatistics() {
        return prisma.statistic.findMany({
            orderBy: { id: 'asc' }
        });
    }

    async saveStatistics(data: { key: string; value: string; labels: any }[]) {
        return prisma.$transaction(
            data.map(item =>
                prisma.statistic.upsert({
                    where: { key: item.key },
                    update: {
                        value: item.value,
                        labels: item.labels
                    },
                    create: {
                        key: item.key,
                        value: item.value,
                        labels: item.labels
                    }
                })
            )
        );
    }

    async deleteStatistic(key: string) {
        return prisma.statistic.delete({ where: { key } });
    }
}

export default new StatisticsService()
