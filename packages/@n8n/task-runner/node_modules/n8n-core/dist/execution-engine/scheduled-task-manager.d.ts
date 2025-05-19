import { CronJob } from 'cron';
import type { CronExpression, Workflow } from 'n8n-workflow';
import { InstanceSettings } from '../instance-settings';
export declare class ScheduledTaskManager {
    private readonly instanceSettings;
    constructor(instanceSettings: InstanceSettings);
    readonly cronJobs: Map<string, CronJob<null, null>[]>;
    registerCron(workflow: Workflow, cronExpression: CronExpression, onTick: () => void): void;
    deregisterCrons(workflowId: string): void;
    deregisterAllCrons(): void;
}
