import { ForbiddenError } from './forbidden.error';
export declare class InvalidMfaCodeError extends ForbiddenError {
    constructor(hint?: string);
}
