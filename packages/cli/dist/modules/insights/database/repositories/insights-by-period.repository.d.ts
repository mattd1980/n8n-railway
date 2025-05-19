import type { SelectQueryBuilder } from '@n8n/typeorm';
import { DataSource, Repository } from '@n8n/typeorm';
import { InsightsByPeriod } from '../entities/insights-by-period';
import type { PeriodUnit } from '../entities/insights-shared';
export declare class InsightsByPeriodRepository extends Repository<InsightsByPeriod> {
    private isRunningCompaction;
    constructor(dataSource: DataSource);
    private escapeField;
    private getPeriodFilterExpr;
    private getPeriodStartExpr;
    getPeriodInsightsBatchQuery({ periodUnitToCompactFrom, compactionBatchSize, maxAgeInDays, }: {
        periodUnitToCompactFrom: PeriodUnit;
        compactionBatchSize: number;
        maxAgeInDays: number;
    }): SelectQueryBuilder<{
        id: number;
        metaId: number;
        type: string;
        value: number;
        periodStart: Date;
    }>;
    getAggregationQuery(periodUnit: PeriodUnit): SelectQueryBuilder<import("@n8n/typeorm").ObjectLiteral>;
    compactSourceDataIntoInsightPeriod({ sourceBatchQuery, sourceTableName, periodUnitToCompactInto, }: {
        sourceBatchQuery: SelectQueryBuilder<{
            id: number;
            metaId: number;
            type: string;
            value: number;
            periodStart: Date;
        }>;
        sourceTableName?: string;
        periodUnitToCompactInto: PeriodUnit;
    }): Promise<number>;
    private getAgeLimitQuery;
    getPreviousAndCurrentPeriodTypeAggregates({ periodLengthInDays, }: {
        periodLengthInDays: number;
    }): Promise<Array<{
        period: 'previous' | 'current';
        type: 0 | 1 | 2 | 3;
        total_value: string | number;
    }>>;
    private parseSortingParams;
    getInsightsByWorkflow({ maxAgeInDays, skip, take, sortBy, }: {
        maxAgeInDays: number;
        skip?: number;
        take?: number;
        sortBy?: string;
    }): Promise<{
        count: number;
        rows: {
            workflowId: string;
            projectId: string;
            workflowName: string;
            projectName: string;
            failed: number;
            total: number;
            succeeded: number;
            failureRate: number;
            runTime: number;
            averageRunTime: number;
            timeSaved: number;
        }[];
    }>;
    getInsightsByTime({ maxAgeInDays, periodUnit, }: {
        maxAgeInDays: number;
        periodUnit: PeriodUnit;
    }): Promise<{
        periodStart: string;
        failed: number;
        succeeded: number;
        runTime: number;
        timeSaved: number;
    }[]>;
    pruneOldData(maxAgeInDays: number): Promise<{
        affected: number | null | undefined;
    }>;
}
