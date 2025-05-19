import { UserError } from 'n8n-workflow';
export declare class MissingExecutionStopError extends UserError {
    constructor(executionId: string);
}
