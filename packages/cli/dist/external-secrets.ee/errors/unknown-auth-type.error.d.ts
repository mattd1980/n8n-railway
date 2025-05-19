import { UnexpectedError } from 'n8n-workflow';
export declare class UnknownAuthTypeError extends UnexpectedError {
    constructor(authType: string);
}
