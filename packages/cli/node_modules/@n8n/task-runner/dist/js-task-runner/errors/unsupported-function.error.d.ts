import { ApplicationError } from 'n8n-workflow';
export declare class UnsupportedFunctionError extends ApplicationError {
    constructor(functionName: string);
}
