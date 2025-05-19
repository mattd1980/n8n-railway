import { SharedWorkflowRepository } from '@n8n/db';
import { type WorkflowExecuteAfterContext } from '@n8n/decorators';
import { Logger } from 'n8n-core';
import { InsightsMetadataRepository } from './database/repositories/insights-metadata.repository';
import { InsightsRawRepository } from './database/repositories/insights-raw.repository';
import { InsightsConfig } from './insights.config';
export declare class InsightsCollectionService {
    private readonly sharedWorkflowRepository;
    private readonly insightsRawRepository;
    private readonly insightsMetadataRepository;
    private readonly insightsConfig;
    private readonly logger;
    private readonly cachedMetadata;
    private bufferedInsights;
    private flushInsightsRawBufferTimer;
    private isAsynchronouslySavingInsights;
    private flushesInProgress;
    constructor(sharedWorkflowRepository: SharedWorkflowRepository, insightsRawRepository: InsightsRawRepository, insightsMetadataRepository: InsightsMetadataRepository, insightsConfig: InsightsConfig, logger: Logger);
    startFlushingTimer(): void;
    stopFlushingTimer(): void;
    shutdown(): Promise<void>;
    handleWorkflowExecuteAfter(ctx: WorkflowExecuteAfterContext): Promise<void>;
    private saveInsightsMetadataAndRaw;
    flushEvents(): Promise<void>;
}
