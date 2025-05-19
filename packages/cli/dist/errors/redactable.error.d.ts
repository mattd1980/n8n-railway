import { UnexpectedError } from 'n8n-workflow';
export declare class RedactableError extends UnexpectedError {
    constructor(fieldName: string, args: string);
}
