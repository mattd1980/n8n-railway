import type { TestCaseExecutionErrorCode, TestRunErrorCode } from '@n8n/db';
import { UnexpectedError } from 'n8n-workflow';
export declare class TestCaseExecutionError extends UnexpectedError {
    readonly code: TestCaseExecutionErrorCode;
    constructor(code: TestCaseExecutionErrorCode, extra?: Record<string, unknown>);
}
export declare class TestRunError extends UnexpectedError {
    readonly code: TestRunErrorCode;
    constructor(code: TestRunErrorCode, extra?: Record<string, unknown>);
}
