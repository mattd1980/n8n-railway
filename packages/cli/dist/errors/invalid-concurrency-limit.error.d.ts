import { UserError } from 'n8n-workflow';
export declare class InvalidConcurrencyLimitError extends UserError {
    constructor(value: number);
}
