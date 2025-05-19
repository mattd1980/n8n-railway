import type { EntityManager } from '@n8n/typeorm';
import { DataSource, Repository } from '@n8n/typeorm';
import type { IDataObject } from 'n8n-workflow';
import { TestCaseExecution } from '../entities';
import type { TestCaseExecutionErrorCode } from '../entities/types-db';
type StatusUpdateOptions = {
    testRunId: string;
    pastExecutionId: string;
    trx?: EntityManager;
};
type MarkAsFailedOptions = StatusUpdateOptions & {
    errorCode?: TestCaseExecutionErrorCode;
    errorDetails?: IDataObject;
};
type MarkAsWarningOptions = MarkAsFailedOptions;
type MarkAsRunningOptions = StatusUpdateOptions & {
    executionId: string;
};
type MarkAsEvaluationRunningOptions = StatusUpdateOptions & {
    evaluationExecutionId: string;
};
type MarkAsCompletedOptions = StatusUpdateOptions & {
    metrics: Record<string, number>;
};
export declare class TestCaseExecutionRepository extends Repository<TestCaseExecution> {
    constructor(dataSource: DataSource);
    createBatch(testRunId: string, pastExecutionIds: string[]): Promise<TestCaseExecution[]>;
    markAsRunning({ testRunId, pastExecutionId, executionId, trx }: MarkAsRunningOptions): Promise<import("@n8n/typeorm").UpdateResult>;
    markAsEvaluationRunning({ testRunId, pastExecutionId, evaluationExecutionId, trx, }: MarkAsEvaluationRunningOptions): Promise<import("@n8n/typeorm").UpdateResult>;
    markAsCompleted({ testRunId, pastExecutionId, metrics, trx }: MarkAsCompletedOptions): Promise<import("@n8n/typeorm").UpdateResult>;
    markAllPendingAsCancelled(testRunId: string, trx?: EntityManager): Promise<import("@n8n/typeorm").UpdateResult>;
    markAsFailed({ testRunId, pastExecutionId, errorCode, errorDetails, trx, }: MarkAsFailedOptions): Promise<import("@n8n/typeorm").UpdateResult>;
    markAsWarning({ testRunId, pastExecutionId, errorCode, errorDetails, }: MarkAsWarningOptions): Promise<import("@n8n/typeorm").UpdateResult>;
}
export {};
