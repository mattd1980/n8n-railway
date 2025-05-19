import { LicenseState } from '@n8n/backend-common';
import { Logger } from 'n8n-core';
import { InsightsByPeriodRepository } from './database/repositories/insights-by-period.repository';
import { InsightsConfig } from './insights.config';
export declare class InsightsPruningService {
    private readonly insightsByPeriodRepository;
    private readonly config;
    private readonly licenseState;
    private readonly logger;
    private pruneInsightsTimeout;
    private isStopped;
    private readonly delayOnError;
    constructor(insightsByPeriodRepository: InsightsByPeriodRepository, config: InsightsConfig, licenseState: LicenseState, logger: Logger);
    get isPruningEnabled(): boolean;
    get pruningMaxAgeInDays(): number;
    startPruningTimer(): void;
    private clearPruningTimer;
    stopPruningTimer(): void;
    private scheduleNextPrune;
    pruneInsights(): Promise<void>;
}
