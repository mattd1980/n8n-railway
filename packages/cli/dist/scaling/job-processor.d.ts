import type { RunningJobSummary } from '@n8n/api-types';
import { ExecutionRepository, WorkflowRepository } from '@n8n/db';
import { InstanceSettings, Logger } from 'n8n-core';
import { ManualExecutionService } from '../manual-execution.service';
import { NodeTypes } from '../node-types';
import type { Job, JobId, JobResult } from './scaling.types';
export declare class JobProcessor {
    private readonly logger;
    private readonly executionRepository;
    private readonly workflowRepository;
    private readonly nodeTypes;
    private readonly instanceSettings;
    private readonly manualExecutionService;
    private readonly runningJobs;
    constructor(logger: Logger, executionRepository: ExecutionRepository, workflowRepository: WorkflowRepository, nodeTypes: NodeTypes, instanceSettings: InstanceSettings, manualExecutionService: ManualExecutionService);
    processJob(job: Job): Promise<JobResult>;
    stopJob(jobId: JobId): void;
    getRunningJobIds(): JobId[];
    getRunningJobsSummary(): RunningJobSummary[];
    private encodeWebhookResponse;
}
