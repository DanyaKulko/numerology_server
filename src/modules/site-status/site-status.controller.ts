import { FastifyInstance } from 'fastify';
import { MatrixType, Language } from '@prisma/client';
import { MatrixCategoryType } from '../../utils/dataFetcher';
import { MatrixGeneratorFactory } from "../matrix/pdf-generator/categories";
import {prisma} from "../../db";

interface UpdateSiteConfigBody {
    key: 'site_status';
    value: string;
}

export default async function siteStatusController(fastify: FastifyInstance) {

    fastify.get('/api/site-config/site_status', async (req, reply) => {
        // res: status 'ONLINE' | 'MAINTENANCE' | 'OFFLINE'
        try {
            let siteStatus = 'ONLINE';

            const configStatus = await prisma.siteConfig.findFirst({
                where: { key: 'site_status' }
            })

            if (configStatus) {
                siteStatus = configStatus.value;
            }
            return {status: siteStatus};

        } catch (error: any) {
            req.log.error(error);
            return reply.status(500).send({ error: error.message });
        }
    });

    fastify.put<{ Body: UpdateSiteConfigBody }>('/api/site-config', async (req, reply) => {
        const { key, value } = req.body;

        try {
            const updatedConfig = await prisma.siteConfig.upsert({
                where: { key },
                update: { value },
                create: { key, value }
            });

            return reply.send(updatedConfig);

        } catch (error: any) {
            req.log.error(error);
            return reply.status(500).send({ error: error.message });
        }
    });
}
