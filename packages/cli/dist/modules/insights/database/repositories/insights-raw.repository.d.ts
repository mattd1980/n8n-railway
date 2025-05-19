import { DataSource, Repository } from '@n8n/typeorm';
import { InsightsRaw } from '../entities/insights-raw';
export declare class InsightsRawRepository extends Repository<InsightsRaw> {
    constructor(dataSource: DataSource);
    getRawInsightsBatchQuery(compactionBatchSize: number): import("@n8n/typeorm").SelectQueryBuilder<{
        id: number;
        metaId: number;
        type: string;
        value: number;
        periodStart: Date;
    }>;
}
