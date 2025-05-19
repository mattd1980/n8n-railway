import { UserError } from 'n8n-workflow';
export declare class TaskRejectError extends UserError {
    reason: string;
    constructor(reason: string);
}
