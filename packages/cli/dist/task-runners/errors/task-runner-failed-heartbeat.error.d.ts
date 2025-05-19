import { UserError } from 'n8n-workflow';
export declare class TaskRunnerFailedHeartbeatError extends UserError {
    description: string;
    constructor(heartbeatInterval: number, isSelfHosted: boolean);
}
