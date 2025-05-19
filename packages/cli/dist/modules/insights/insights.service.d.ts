import { type InsightsSummary, type InsightsDateRange } from '@n8n/api-types';
import { LicenseState } from '@n8n/backend-common';
import { Logger } from 'n8n-core';
import type { PeriodUnit } from './database/entities/insights-shared';
import { InsightsByPeriodRepository } from './database/repositories/insights-by-period.repository';
import { InsightsCollectionService } from './insights-collection.service';
import { InsightsCompactionService } from './insights-compaction.service';
import { InsightsPruningService } from './insights-pruning.service';
export declare class InsightsService {
    private readonly insightsByPeriodRepository;
    private readonly compactionService;
    private readonly collectionService;
    private readonly pruningService;
    private readonly licenseState;
    private readonly logger;
    constructor(insightsByPeriodRepository: InsightsByPeriodRepository, compactionService: InsightsCompactionService, collectionService: InsightsCollectionService, pruningService: InsightsPruningService, licenseState: LicenseState, logger: Logger);
    startTimers(): void;
    stopTimers(): void;
    shutdown(): Promise<void>;
    getInsightsSummary({ periodLengthInDays, }: {
        periodLengthInDays: number;
    }): Promise<InsightsSummary>;
    getInsightsByWorkflow({ maxAgeInDays, skip, take, sortBy, }: {
        maxAgeInDays: number;
        skip?: number;
        take?: number;
        sortBy?: string;
    }): Promise<{
        count: number;
        data: {
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
        date: string;
        values: {
            total: number;
            succeeded: number;
            failed: number;
            failureRate: number;
            averageRunTime: number;
            timeSaved: number;
        };
    }[]>;
    getAvailableDateRanges(): InsightsDateRange[];
    getMaxAgeInDaysAndGranularity(dateRangeKey: InsightsDateRange['key']): InsightsDateRange & {
        maxAgeInDays: number;
    };
}
