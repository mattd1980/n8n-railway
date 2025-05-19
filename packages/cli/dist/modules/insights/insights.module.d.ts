import type { BaseN8nModule } from '@n8n/decorators';
import { InstanceSettings, Logger } from 'n8n-core';
import { InsightsService } from './insights.service';
import './insights.controller';
export declare class InsightsModule implements BaseN8nModule {
    private readonly logger;
    private readonly insightsService;
    private readonly instanceSettings;
    constructor(logger: Logger, insightsService: InsightsService, instanceSettings: InstanceSettings);
    initialize(): void;
    startBackgroundProcess(): void;
    stopBackgroundProcess(): void;
}
