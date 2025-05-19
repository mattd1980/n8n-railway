"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TestRunnerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRunnerService = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const flatted_1 = require("flatted");
const difference_1 = __importDefault(require("lodash/difference"));
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const node_assert_1 = __importDefault(require("node:assert"));
const active_executions_1 = require("../../active-executions");
const config_1 = __importDefault(require("../../config"));
const constants_1 = require("../../constants");
const errors_ee_1 = require("../../evaluation.ee/test-runner/errors.ee");
const node_types_1 = require("../../node-types");
const telemetry_1 = require("../../telemetry");
const workflow_execute_additional_data_1 = require("../../workflow-execute-additional-data");
const workflow_runner_1 = require("../../workflow-runner");
const evaluation_metrics_ee_1 = require("./evaluation-metrics.ee");
const utils_ee_1 = require("./utils.ee");
let TestRunnerService = TestRunnerService_1 = class TestRunnerService {
    constructor(logger, telemetry, workflowRepository, workflowRunner, executionRepository, activeExecutions, testRunRepository, testCaseExecutionRepository, testMetricRepository, nodeTypes, errorReporter) {
        this.logger = logger;
        this.telemetry = telemetry;
        this.workflowRepository = workflowRepository;
        this.workflowRunner = workflowRunner;
        this.executionRepository = executionRepository;
        this.activeExecutions = activeExecutions;
        this.testRunRepository = testRunRepository;
        this.testCaseExecutionRepository = testCaseExecutionRepository;
        this.testMetricRepository = testMetricRepository;
        this.nodeTypes = nodeTypes;
        this.errorReporter = errorReporter;
        this.abortControllers = new Map();
    }
    async cleanupIncompleteRuns() {
        await this.testRunRepository.markAllIncompleteAsFailed();
    }
    getStartNodesData(workflow, pastExecutionData, pastExecutionWorkflowData) {
        const workflowInstance = new n8n_workflow_1.Workflow({
            nodes: workflow.nodes,
            connections: workflow.connections,
            active: false,
            nodeTypes: this.nodeTypes,
        });
        const pastWorkflowNodeIdByName = new Map(pastExecutionWorkflowData.nodes.map((node) => [node.name, node.id]));
        const workflowNodeNameById = new Map(workflow.nodes.map((node) => [node.id, node.name]));
        const pastExecutionTriggerNode = (0, utils_ee_1.getPastExecutionTriggerNode)(pastExecutionData);
        (0, node_assert_1.default)(pastExecutionTriggerNode, 'Could not find the trigger node of the past execution');
        const pastExecutionTriggerNodeId = pastWorkflowNodeIdByName.get(pastExecutionTriggerNode);
        (0, node_assert_1.default)(pastExecutionTriggerNodeId, 'Could not find the trigger node ID of the past execution');
        const triggerNode = workflowNodeNameById.get(pastExecutionTriggerNodeId);
        if (!triggerNode) {
            throw new errors_ee_1.TestCaseExecutionError('TRIGGER_NO_LONGER_EXISTS');
        }
        const triggerNodeData = pastExecutionData.resultData.runData[pastExecutionTriggerNode][0];
        (0, node_assert_1.default)(triggerNodeData, 'Trigger node data not found');
        const triggerToStartFrom = {
            name: triggerNode,
            data: triggerNodeData,
        };
        const startNodes = workflowInstance
            .getChildNodes(triggerNode, n8n_workflow_1.NodeConnectionTypes.Main, 1)
            .map((nodeName) => ({
            name: nodeName,
            sourceData: { previousNode: pastExecutionTriggerNode },
        }));
        return {
            startNodes,
            triggerToStartFrom,
        };
    }
    async runTestCase(workflow, pastExecutionData, pastExecutionWorkflowData, mockedNodes, metadata, abortSignal) {
        if (abortSignal.aborted) {
            return;
        }
        const pinData = (0, utils_ee_1.createPinData)(workflow, mockedNodes, pastExecutionData, pastExecutionWorkflowData);
        const startNodesData = this.getStartNodesData(workflow, pastExecutionData, pastExecutionWorkflowData);
        const data = {
            ...startNodesData,
            executionMode: 'evaluation',
            runData: {},
            pinData,
            workflowData: { ...workflow, pinData },
            userId: metadata.userId,
            partialExecutionVersion: 2,
        };
        if (config_1.default.getEnv('executions.mode') === 'queue') {
            data.executionData = {
                startData: {
                    startNodes: startNodesData.startNodes,
                },
                resultData: {
                    pinData,
                    runData: {},
                },
                manualData: {
                    userId: metadata.userId,
                    partialExecutionVersion: 2,
                    triggerToStartFrom: startNodesData.triggerToStartFrom,
                },
            };
        }
        const executionId = await this.workflowRunner.run(data);
        (0, node_assert_1.default)(executionId);
        abortSignal.addEventListener('abort', () => {
            this.activeExecutions.stopExecution(executionId);
        });
        await this.testCaseExecutionRepository.markAsRunning({
            testRunId: metadata.testRunId,
            pastExecutionId: metadata.pastExecutionId,
            executionId,
        });
        const executePromise = this.activeExecutions.getPostExecutePromise(executionId);
        return await executePromise;
    }
    async syncMetrics(testDefinitionId, evaluationWorkflow) {
        const usedTestMetricNames = await this.getUsedTestMetricNames(evaluationWorkflow);
        const existingTestMetrics = await this.testMetricRepository.find({
            where: {
                testDefinition: { id: testDefinitionId },
            },
        });
        const existingMetricNames = new Set(existingTestMetrics.map((metric) => metric.name));
        const metricsToAdd = (0, difference_1.default)(Array.from(usedTestMetricNames), Array.from(existingMetricNames));
        const metricsToRemove = (0, difference_1.default)(Array.from(existingMetricNames), Array.from(usedTestMetricNames));
        const metricsToAddEntities = metricsToAdd.map((metricName) => this.testMetricRepository.create({
            name: metricName,
            testDefinition: { id: testDefinitionId },
        }));
        await this.testMetricRepository.save(metricsToAddEntities);
        metricsToRemove.forEach(async (metricName) => {
            const metric = existingTestMetrics.find((m) => m.name === metricName);
            (0, node_assert_1.default)(metric, 'Existing metric not found');
            await this.testMetricRepository.delete(metric.id);
        });
        return usedTestMetricNames;
    }
    async runTestCaseEvaluation(evaluationWorkflow, evaluationInputData, abortSignal, metadata) {
        if (abortSignal.aborted) {
            return;
        }
        const data = await (0, workflow_execute_additional_data_1.getRunData)(evaluationWorkflow, [evaluationInputData]);
        data.executionMode = 'integrated';
        const executionId = await this.workflowRunner.run(data);
        (0, node_assert_1.default)(executionId);
        abortSignal.addEventListener('abort', () => {
            this.activeExecutions.stopExecution(executionId);
        });
        await this.testCaseExecutionRepository.markAsEvaluationRunning({
            testRunId: metadata.testRunId,
            pastExecutionId: metadata.pastExecutionId,
            evaluationExecutionId: executionId,
        });
        const executePromise = this.activeExecutions.getPostExecutePromise(executionId);
        return await executePromise;
    }
    static getEvaluationMetricsNodes(workflow) {
        return workflow.nodes.filter((node) => node.type === constants_1.EVALUATION_METRICS_NODE);
    }
    extractEvaluationResult(execution, evaluationWorkflow) {
        const lastNodeExecuted = execution.data.resultData.lastNodeExecuted;
        (0, node_assert_1.default)(lastNodeExecuted, 'Could not find the last node executed in evaluation workflow');
        const metricsNodes = TestRunnerService_1.getEvaluationMetricsNodes(evaluationWorkflow);
        const metricsRunData = metricsNodes.flatMap((node) => execution.data.resultData.runData[node.name]);
        const metricsData = metricsRunData.reverse().map((data) => data.data?.main?.[0]?.[0]?.json);
        const metricsResult = metricsData.reduce((acc, curr) => ({ ...acc, ...curr }), {}) ?? {};
        return metricsResult;
    }
    async getUsedTestMetricNames(evaluationWorkflow) {
        const metricsNodes = TestRunnerService_1.getEvaluationMetricsNodes(evaluationWorkflow);
        const metrics = metricsNodes.map((node) => {
            const metricsParameter = node.parameters?.metrics;
            (0, node_assert_1.default)(metricsParameter, 'Metrics parameter not found');
            const metricsNames = metricsParameter.assignments.map((assignment) => assignment.name);
            return metricsNames;
        });
        return new Set(metrics.flat());
    }
    async runTest(user, test) {
        this.logger.debug('Starting new test run', { testId: test.id });
        const workflow = await this.workflowRepository.findById(test.workflowId);
        (0, node_assert_1.default)(workflow, 'Workflow not found');
        const testRun = await this.testRunRepository.createTestRun(test.id);
        (0, node_assert_1.default)(testRun, 'Unable to create a test run');
        const abortController = new AbortController();
        this.abortControllers.set(testRun.id, abortController);
        const testRunMetadata = {
            testRunId: testRun.id,
            userId: user.id,
        };
        let testRunEndStatusForTelemetry;
        const abortSignal = abortController.signal;
        const { manager: dbManager } = this.executionRepository;
        try {
            const evaluationWorkflow = await this.workflowRepository.findById(test.evaluationWorkflowId);
            if (!evaluationWorkflow) {
                throw new errors_ee_1.TestRunError('EVALUATION_WORKFLOW_NOT_FOUND');
            }
            const pastExecutions = await this.executionRepository
                .createQueryBuilder('execution')
                .select('execution.id')
                .leftJoin('execution.annotation', 'annotation')
                .leftJoin('annotation.tags', 'annotationTag')
                .where('annotationTag.id = :tagId', { tagId: test.annotationTagId })
                .andWhere('execution.workflowId = :workflowId', { workflowId: test.workflowId })
                .getMany();
            this.logger.debug('Found past executions', { count: pastExecutions.length });
            if (pastExecutions.length === 0) {
                throw new errors_ee_1.TestRunError('PAST_EXECUTIONS_NOT_FOUND');
            }
            await this.testCaseExecutionRepository.createBatch(testRun.id, pastExecutions.map((e) => e.id));
            const testMetricNames = await this.syncMetrics(test.id, evaluationWorkflow);
            const pastExecutionIds = pastExecutions.map((e) => e.id);
            await this.testRunRepository.markAsRunning(testRun.id, pastExecutions.length);
            this.telemetry.track('User ran test', {
                user_id: user.id,
                test_id: test.id,
                run_id: testRun.id,
                executions_ids: pastExecutionIds,
                workflow_id: test.workflowId,
                evaluation_workflow_id: test.evaluationWorkflowId,
            });
            const metrics = new evaluation_metrics_ee_1.EvaluationMetrics(testMetricNames);
            for (const pastExecutionId of pastExecutionIds) {
                if (abortSignal.aborted) {
                    this.logger.debug('Test run was cancelled', {
                        testId: test.id,
                        stoppedOn: pastExecutionId,
                    });
                    break;
                }
                this.logger.debug('Running test case', { pastExecutionId });
                try {
                    const pastExecution = await this.executionRepository.findOne({
                        where: { id: pastExecutionId },
                        relations: ['executionData', 'metadata', 'annotation', 'annotation.tags'],
                    });
                    (0, node_assert_1.default)(pastExecution, 'Execution not found');
                    const executionData = (0, flatted_1.parse)(pastExecution.executionData.data);
                    const testCaseMetadata = {
                        ...testRunMetadata,
                        pastExecutionId,
                        highlightedData: pastExecution.metadata,
                        annotation: pastExecution.annotation,
                    };
                    const testCaseExecution = await this.runTestCase(workflow, executionData, pastExecution.executionData.workflowData, test.mockedNodes, testCaseMetadata, abortSignal);
                    this.logger.debug('Test case execution finished', { pastExecutionId });
                    if (!testCaseExecution || testCaseExecution.data.resultData.error) {
                        await dbManager.transaction(async (trx) => {
                            await this.testRunRepository.incrementFailed(testRun.id, trx);
                            await this.testCaseExecutionRepository.markAsFailed({
                                testRunId: testRun.id,
                                pastExecutionId,
                                errorCode: 'FAILED_TO_EXECUTE_WORKFLOW',
                                trx,
                            });
                        });
                        continue;
                    }
                    const testCaseRunData = testCaseExecution.data.resultData.runData;
                    const originalRunData = executionData.resultData.runData;
                    const evaluationInputData = (0, utils_ee_1.formatTestCaseExecutionInputData)(originalRunData, pastExecution.executionData.workflowData, testCaseRunData, workflow, testCaseMetadata);
                    const evalExecution = await this.runTestCaseEvaluation(evaluationWorkflow, evaluationInputData, abortSignal, testCaseMetadata);
                    (0, node_assert_1.default)(evalExecution);
                    this.logger.debug('Evaluation execution finished', { pastExecutionId });
                    const { addedMetrics } = metrics.addResults(this.extractEvaluationResult(evalExecution, evaluationWorkflow));
                    if (evalExecution.data.resultData.error) {
                        await dbManager.transaction(async (trx) => {
                            await this.testRunRepository.incrementFailed(testRun.id, trx);
                            await this.testCaseExecutionRepository.markAsFailed({
                                testRunId: testRun.id,
                                pastExecutionId,
                                errorCode: 'FAILED_TO_EXECUTE_EVALUATION_WORKFLOW',
                                trx,
                            });
                        });
                    }
                    else {
                        await dbManager.transaction(async (trx) => {
                            await this.testRunRepository.incrementPassed(testRun.id, trx);
                            await this.testCaseExecutionRepository.markAsCompleted({
                                testRunId: testRun.id,
                                pastExecutionId,
                                metrics: addedMetrics,
                                trx,
                            });
                        });
                    }
                }
                catch (e) {
                    await dbManager.transaction(async (trx) => {
                        await this.testRunRepository.incrementFailed(testRun.id, trx);
                        if (e instanceof errors_ee_1.TestCaseExecutionError) {
                            await this.testCaseExecutionRepository.markAsFailed({
                                testRunId: testRun.id,
                                pastExecutionId,
                                errorCode: e.code,
                                errorDetails: e.extra,
                                trx,
                            });
                        }
                        else {
                            await this.testCaseExecutionRepository.markAsFailed({
                                testRunId: testRun.id,
                                pastExecutionId,
                                errorCode: 'UNKNOWN_ERROR',
                                trx,
                            });
                            this.errorReporter.error(e);
                        }
                    });
                }
            }
            if (abortSignal.aborted) {
                await dbManager.transaction(async (trx) => {
                    await this.testRunRepository.markAsCancelled(testRun.id, trx);
                    await this.testCaseExecutionRepository.markAllPendingAsCancelled(testRun.id, trx);
                    testRunEndStatusForTelemetry = 'cancelled';
                });
            }
            else {
                const aggregatedMetrics = metrics.getAggregatedMetrics();
                await this.testRunRepository.markAsCompleted(testRun.id, aggregatedMetrics);
                this.logger.debug('Test run finished', { testId: test.id, testRunId: testRun.id });
                testRunEndStatusForTelemetry = 'completed';
            }
        }
        catch (e) {
            if (e instanceof n8n_workflow_1.ExecutionCancelledError) {
                this.logger.debug('Evaluation execution was cancelled. Cancelling test run', {
                    testRunId: testRun.id,
                    stoppedOn: e.extra?.executionId,
                });
                await dbManager.transaction(async (trx) => {
                    await this.testRunRepository.markAsCancelled(testRun.id, trx);
                    await this.testCaseExecutionRepository.markAllPendingAsCancelled(testRun.id, trx);
                });
                testRunEndStatusForTelemetry = 'cancelled';
            }
            else if (e instanceof errors_ee_1.TestRunError) {
                await this.testRunRepository.markAsError(testRun.id, e.code, e.extra);
                testRunEndStatusForTelemetry = 'error';
            }
            else {
                await this.testRunRepository.markAsError(testRun.id, 'UNKNOWN_ERROR');
                testRunEndStatusForTelemetry = 'error';
                throw e;
            }
        }
        finally {
            this.abortControllers.delete(testRun.id);
            this.telemetry.track('Test run finished', {
                test_id: test.id,
                run_id: testRun.id,
                status: testRunEndStatusForTelemetry,
            });
        }
    }
    canBeCancelled(testRun) {
        return testRun.status !== 'running' && testRun.status !== 'new';
    }
    async cancelTestRun(testRunId) {
        const abortController = this.abortControllers.get(testRunId);
        if (abortController) {
            abortController.abort();
            this.abortControllers.delete(testRunId);
        }
        else {
            const { manager: dbManager } = this.executionRepository;
            await dbManager.transaction(async (trx) => {
                await this.testRunRepository.markAsCancelled(testRunId, trx);
                await this.testCaseExecutionRepository.markAllPendingAsCancelled(testRunId, trx);
            });
        }
    }
    async getExampleEvaluationInputData(test, annotationTagId) {
        const lastPastExecution = await this.executionRepository
            .createQueryBuilder('execution')
            .select('execution.id')
            .leftJoin('execution.annotation', 'annotation')
            .leftJoin('annotation.tags', 'annotationTag')
            .where('annotationTag.id = :tagId', { tagId: annotationTagId })
            .andWhere('execution.workflowId = :workflowId', { workflowId: test.workflowId })
            .orderBy('execution.createdAt', 'DESC')
            .getOne();
        if (lastPastExecution === null) {
            return null;
        }
        const pastExecution = await this.executionRepository.findOne({
            where: {
                id: lastPastExecution.id,
            },
            relations: ['executionData', 'metadata', 'annotation', 'annotation.tags'],
        });
        (0, node_assert_1.default)(pastExecution, 'Execution not found');
        const executionData = (0, flatted_1.parse)(pastExecution.executionData.data);
        const sampleTestCaseMetadata = {
            testRunId: 'sample-test-run-id',
            userId: 'sample-user-id',
            pastExecutionId: lastPastExecution.id,
            highlightedData: pastExecution.metadata,
            annotation: pastExecution.annotation,
        };
        const originalRunData = executionData.resultData.runData;
        const evaluationInputData = (0, utils_ee_1.formatTestCaseExecutionInputData)(originalRunData, pastExecution.executionData.workflowData, originalRunData, pastExecution.executionData.workflowData, sampleTestCaseMetadata);
        return evaluationInputData.json;
    }
};
exports.TestRunnerService = TestRunnerService;
exports.TestRunnerService = TestRunnerService = TestRunnerService_1 = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [n8n_core_1.Logger,
        telemetry_1.Telemetry,
        db_1.WorkflowRepository,
        workflow_runner_1.WorkflowRunner,
        db_1.ExecutionRepository,
        active_executions_1.ActiveExecutions,
        db_1.TestRunRepository,
        db_1.TestCaseExecutionRepository,
        db_1.TestMetricRepository,
        node_types_1.NodeTypes,
        n8n_core_1.ErrorReporter])
], TestRunnerService);
//# sourceMappingURL=test-runner.service.ee.js.map