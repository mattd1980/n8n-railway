import { ResponseError } from './abstract/response.error';
export declare class NotFoundError extends ResponseError {
    static isDefinedAndNotNull<T>(value: T | undefined | null, message: string, hint?: string): asserts value is T;
    constructor(message: string, hint?: string | undefined);
}
