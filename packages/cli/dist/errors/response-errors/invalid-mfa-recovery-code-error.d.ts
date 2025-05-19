import { ForbiddenError } from './forbidden.error';
export declare class InvalidMfaRecoveryCodeError extends ForbiddenError {
    constructor(hint?: string);
}
