import { ResponseError } from './abstract/response.error';
export declare class AuthError extends ResponseError {
    constructor(message: string, errorCode?: number);
}
