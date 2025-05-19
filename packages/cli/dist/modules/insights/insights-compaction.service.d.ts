import { Logger } from 'n8n-core';
import { InsightsByPeriodRepository } from './database/repositories/insights-by-period.repository';
import { InsightsRawRepository } from './database/repositories/insights-raw.repository';
import { InsightsConfig } from './insights.config';
export declare class InsightsCompactionService {
    private readonly insightsByPeriodRepository;
    private readonly insightsRawRepository;
    private readonly insightsConfig;
    private readonly logger;
    private compactInsightsTimer;
    constructor(insightsByPeriodRepository: InsightsByPeriodRepository, insightsRawRepository: InsightsRawRepository, insightsConfig: InsightsConfig, logger: Logger);
    startCompactionTimer(): void;
    stopCompactionTimer(): void;
    compactInsights(): Promise<void>;
    compactRawToHour(): Promise<number>;
    compactHourToDay(): Promise<number>;
    compactDayToWeek(): Promise<number>;
}
