import { ExecutionRepository } from '@n8n/db';
import { InstanceSettings, Logger } from 'n8n-core';
import { ActiveExecutions } from './active-executions';
import { OwnershipService } from './services/ownership.service';
import { WorkflowRunner } from './workflow-runner';
export declare class WaitTracker {
    private readonly logger;
    private readonly executionRepository;
    private readonly ownershipService;
    private readonly activeExecutions;
    private readonly workflowRunner;
    private readonly instanceSettings;
    private waitingExecutions;
    mainTimer: NodeJS.Timeout;
    constructor(logger: Logger, executionRepository: ExecutionRepository, ownershipService: OwnershipService, activeExecutions: ActiveExecutions, workflowRunner: WorkflowRunner, instanceSettings: InstanceSettings);
    has(executionId: string): boolean;
    init(): void;
    private startTracking;
    getWaitingExecutions(): Promise<void>;
    stopExecution(executionId: string): void;
    startExecution(executionId: string): Promise<void>;
    stopTracking(): void;
}
