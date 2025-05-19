import { ResponseError } from './abstract/response.error';
export declare class UnprocessableRequestError extends ResponseError {
    constructor(message: string, hint?: string | undefined);
}
