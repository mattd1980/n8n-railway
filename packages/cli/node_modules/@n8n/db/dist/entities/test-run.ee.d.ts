import type { IDataObject } from 'n8n-workflow';
import { WithTimestampsAndStringId } from './abstract-entity';
import type { TestCaseExecution } from './test-case-execution.ee';
import { TestDefinition } from './test-definition.ee';
import { AggregatedTestRunMetrics } from './types-db';
import type { TestRunErrorCode, TestRunFinalResult } from './types-db';
export type TestRunStatus = 'new' | 'running' | 'completed' | 'error' | 'cancelled';
export declare class TestRun extends WithTimestampsAndStringId {
    testDefinition: TestDefinition;
    testDefinitionId: string;
    status: TestRunStatus;
    runAt: Date | null;
    completedAt: Date | null;
    metrics: AggregatedTestRunMetrics;
    totalCases: number;
    passedCases: number;
    failedCases: number;
    errorCode: TestRunErrorCode | null;
    errorDetails: IDataObject | null;
    testCaseExecutions: TestCaseExecution[];
    finalResult?: TestRunFinalResult | null;
}
