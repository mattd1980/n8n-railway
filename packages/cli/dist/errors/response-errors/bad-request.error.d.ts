import { ResponseError } from './abstract/response.error';
export declare class BadRequestError extends ResponseError {
    constructor(message: string, errorCode?: number);
}
