import { ResponseError } from './abstract/response.error';
export declare class NotImplementedError extends ResponseError {
    constructor(message: string, hint?: string | undefined);
}
