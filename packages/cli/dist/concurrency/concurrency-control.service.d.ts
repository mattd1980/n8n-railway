import { ExecutionRepository } from '@n8n/db';
import { Logger } from 'n8n-core';
import type { WorkflowExecuteMode as ExecutionMode } from 'n8n-workflow';
import { EventService } from '../events/event.service';
import { Telemetry } from '../telemetry';
export declare const CLOUD_TEMP_PRODUCTION_LIMIT = 999;
export declare const CLOUD_TEMP_REPORTABLE_THRESHOLDS: number[];
export type ConcurrencyQueueType = 'production' | 'evaluation';
export declare class ConcurrencyControlService {
    private readonly logger;
    private readonly executionRepository;
    private readonly telemetry;
    private readonly eventService;
    private isEnabled;
    private readonly limits;
    private readonly queues;
    private readonly limitsToReport;
    constructor(logger: Logger, executionRepository: ExecutionRepository, telemetry: Telemetry, eventService: EventService);
    has(executionId: string): boolean;
    throttle({ mode, executionId }: {
        mode: ExecutionMode;
        executionId: string;
    }): Promise<void>;
    release({ mode }: {
        mode: ExecutionMode;
    }): void;
    remove({ mode, executionId }: {
        mode: ExecutionMode;
        executionId: string;
    }): void;
    removeAll(executionIdsToCancel: string[]): Promise<void>;
    disable(): void;
    private logInit;
    private isUnlimited;
    private shouldReport;
    private getQueue;
}
