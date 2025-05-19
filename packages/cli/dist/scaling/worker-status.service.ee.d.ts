import type { WorkerStatus } from '@n8n/api-types';
import { InstanceSettings } from 'n8n-core';
import { JobProcessor } from './job-processor';
export declare class WorkerStatusService {
    private readonly jobProcessor;
    private readonly instanceSettings;
    constructor(jobProcessor: JobProcessor, instanceSettings: InstanceSettings);
    generateStatus(): WorkerStatus;
    private getOsCpuString;
}
