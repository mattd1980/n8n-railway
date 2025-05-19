import { ResponseError } from './abstract/response.error';
export declare class ForbiddenError extends ResponseError {
    constructor(message?: string, hint?: string);
}
