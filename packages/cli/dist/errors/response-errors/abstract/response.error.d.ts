import { BaseError } from 'n8n-workflow';
export declare abstract class ResponseError extends BaseError {
    readonly httpStatusCode: number;
    readonly errorCode: number;
    readonly hint: string | undefined;
    constructor(message: string, httpStatusCode: number, errorCode?: number, hint?: string | undefined, cause?: unknown);
}
