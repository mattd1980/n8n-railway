import { OperationalError } from 'n8n-workflow';
export declare class TaskRunnerAcceptTimeoutError extends OperationalError {
    constructor(taskId: string, runnerId: string);
}
