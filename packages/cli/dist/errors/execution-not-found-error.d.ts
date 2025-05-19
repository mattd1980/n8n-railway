import { UnexpectedError } from 'n8n-workflow';
export declare class ExecutionNotFoundError extends UnexpectedError {
    constructor(executionId: string);
}
