import type { TaskRunner } from '@n8n/task-runner';
import { UnexpectedError } from 'n8n-workflow';
export declare class TaskRunnerDisconnectedError extends UnexpectedError {
    readonly runnerId: TaskRunner['id'];
    description: string;
    constructor(runnerId: TaskRunner['id'], isCloudDeployment: boolean);
}
