import { ResponseError } from './abstract/response.error';
export declare class ConflictError extends ResponseError {
    constructor(message: string, hint?: string | undefined);
}
