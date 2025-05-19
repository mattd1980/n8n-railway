import { UserError } from 'n8n-workflow';
import type { TaskRunner } from '../../task-runners/task-broker/task-broker.service';
export declare class TaskRunnerOomError extends UserError {
    readonly runnerId: TaskRunner['id'];
    description: string;
    constructor(runnerId: TaskRunner['id'], isCloudDeployment: boolean);
}
