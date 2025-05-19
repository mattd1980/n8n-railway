import { ApplicationError } from 'n8n-workflow';
export declare class TimeoutError extends ApplicationError {
    description: string;
    constructor(taskTimeout: number);
}
