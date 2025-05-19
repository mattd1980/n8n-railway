import { ResponseError } from './abstract/response.error';
export declare class UnauthenticatedError extends ResponseError {
    constructor(message?: string, hint?: string);
}
