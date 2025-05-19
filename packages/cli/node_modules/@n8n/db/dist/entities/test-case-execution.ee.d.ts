import type { IDataObject } from 'n8n-workflow';
import { WithStringId } from './abstract-entity';
import type { ExecutionEntity } from './execution-entity';
import { TestRun } from './test-run.ee';
import type { TestCaseExecutionErrorCode } from './types-db';
export type TestCaseRunMetrics = Record<string, number | boolean>;
export type TestCaseExecutionStatus = 'new' | 'running' | 'evaluation_running' | 'success' | 'error' | 'warning' | 'cancelled';
export declare class TestCaseExecution extends WithStringId {
    testRun: TestRun;
    pastExecution: ExecutionEntity | null;
    pastExecutionId: string | null;
    execution: ExecutionEntity | null;
    executionId: string | null;
    evaluationExecution: ExecutionEntity | null;
    evaluationExecutionId: string | null;
    status: TestCaseExecutionStatus;
    runAt: Date | null;
    completedAt: Date | null;
    errorCode: TestCaseExecutionErrorCode | null;
    errorDetails: IDataObject | null;
    metrics: TestCaseRunMetrics;
}
