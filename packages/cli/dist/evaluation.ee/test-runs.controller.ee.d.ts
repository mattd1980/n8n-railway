import { TestCaseExecutionRepository, TestRunRepository } from '@n8n/db';
import express from 'express';
import { InstanceSettings } from 'n8n-core';
import { TestRunsRequest } from '../evaluation.ee/test-definitions.types.ee';
import { TestRunnerService } from '../evaluation.ee/test-runner/test-runner.service.ee';
import { Telemetry } from '../telemetry';
import { TestDefinitionService } from './test-definition.service.ee';
export declare class TestRunsController {
    private readonly testDefinitionService;
    private readonly testRunRepository;
    private readonly testCaseExecutionRepository;
    private readonly testRunnerService;
    private readonly instanceSettings;
    private readonly telemetry;
    constructor(testDefinitionService: TestDefinitionService, testRunRepository: TestRunRepository, testCaseExecutionRepository: TestCaseExecutionRepository, testRunnerService: TestRunnerService, instanceSettings: InstanceSettings, telemetry: Telemetry);
    private getTestDefinition;
    private getTestRun;
    getMany(req: TestRunsRequest.GetMany): Promise<{
        finalResult: import("@n8n/db").TestRunFinalResult | null;
        testDefinition: import("@n8n/db").TestDefinition;
        testDefinitionId: string;
        status: import("@n8n/db/dist/entities/test-run.ee").TestRunStatus;
        runAt: Date | null;
        completedAt: Date | null;
        metrics: import("@n8n/db").AggregatedTestRunMetrics;
        totalCases: number;
        passedCases: number;
        failedCases: number;
        errorCode: import("@n8n/db").TestRunErrorCode | null;
        errorDetails: import("n8n-workflow").IDataObject | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getOne(req: TestRunsRequest.GetOne): Promise<import("@n8n/db/dist/repositories/test-run.repository.ee").TestRunSummary>;
    getTestCases(req: TestRunsRequest.GetCases): Promise<import("@n8n/db").TestCaseExecution[]>;
    delete(req: TestRunsRequest.Delete): Promise<{
        success: boolean;
    }>;
    cancel(req: TestRunsRequest.Cancel, res: express.Response): Promise<void>;
}
