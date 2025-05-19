import { ResponseError } from './abstract/response.error';
export declare class ServiceUnavailableError extends ResponseError {
    constructor(message: string, errorCode?: number);
}
