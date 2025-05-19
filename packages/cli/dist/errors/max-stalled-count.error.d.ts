import { OperationalError } from 'n8n-workflow';
export declare class MaxStalledCountError extends OperationalError {
    constructor(cause: Error);
}
