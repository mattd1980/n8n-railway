import type { User, ExecutionEntity, TestDefinition, TestRun } from '@n8n/db';
import { ExecutionRepository, TestCaseExecutionRepository, TestMetricRepository, TestRunRepository, WorkflowRepository } from '@n8n/db';
import { ErrorReporter, Logger } from 'n8n-core';
import type { IWorkflowBase } from 'n8n-workflow';
import { ActiveExecutions } from '../../active-executions';
import { NodeTypes } from '../../node-types';
import { Telemetry } from '../../telemetry';
import { WorkflowRunner } from '../../workflow-runner';
export interface TestRunMetadata {
    testRunId: string;
    userId: string;
}
export interface TestCaseRunMetadata extends TestRunMetadata {
    pastExecutionId: string;
    annotation: ExecutionEntity['annotation'];
    highlightedData: ExecutionEntity['metadata'];
}
export declare class TestRunnerService {
    private readonly logger;
    private readonly telemetry;
    private readonly workflowRepository;
    private readonly workflowRunner;
    private readonly executionRepository;
    private readonly activeExecutions;
    private readonly testRunRepository;
    private readonly testCaseExecutionRepository;
    private readonly testMetricRepository;
    private readonly nodeTypes;
    private readonly errorReporter;
    private abortControllers;
    constructor(logger: Logger, telemetry: Telemetry, workflowRepository: WorkflowRepository, workflowRunner: WorkflowRunner, executionRepository: ExecutionRepository, activeExecutions: ActiveExecutions, testRunRepository: TestRunRepository, testCaseExecutionRepository: TestCaseExecutionRepository, testMetricRepository: TestMetricRepository, nodeTypes: NodeTypes, errorReporter: ErrorReporter);
    cleanupIncompleteRuns(): Promise<void>;
    private getStartNodesData;
    private runTestCase;
    syncMetrics(testDefinitionId: string, evaluationWorkflow: IWorkflowBase): Promise<Set<string>>;
    private runTestCaseEvaluation;
    static getEvaluationMetricsNodes(workflow: IWorkflowBase): import("n8n-workflow").INode[];
    private extractEvaluationResult;
    private getUsedTestMetricNames;
    runTest(user: User, test: TestDefinition): Promise<void>;
    canBeCancelled(testRun: TestRun): boolean;
    cancelTestRun(testRunId: string): Promise<void>;
    getExampleEvaluationInputData(test: TestDefinition, annotationTagId: string): Promise<{
        annotations: {
            vote: import("n8n-workflow").AnnotationVote | null | undefined;
            tags: Pick<import("@n8n/db").AnnotationTagEntity, "id" | "name">[] | undefined;
            highlightedData: {
                [k: string]: string;
            };
        };
        originalExecution: Record<string, any>;
        newExecution: Record<string, any>;
    } | null>;
}
