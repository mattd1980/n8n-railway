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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionService = exports.allowedExecutionsQueryFilterFields = exports.schemaGetExecutionsQueryFilter = void 0;
const config_1 = require("@n8n/config");
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const jsonschema_1 = require("jsonschema");
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const active_executions_1 = require("../active-executions");
const concurrency_control_service_1 = require("../concurrency/concurrency-control.service");
const config_2 = __importDefault(require("../config"));
const aborted_execution_retry_error_1 = require("../errors/aborted-execution-retry.error");
const missing_execution_stop_error_1 = require("../errors/missing-execution-stop.error");
const queued_execution_retry_error_1 = require("../errors/queued-execution-retry.error");
const internal_server_error_1 = require("../errors/response-errors/internal-server.error");
const not_found_error_1 = require("../errors/response-errors/not-found.error");
const license_1 = require("../license");
const node_types_1 = require("../node-types");
const wait_tracker_1 = require("../wait-tracker");
const workflow_runner_1 = require("../workflow-runner");
const workflow_sharing_service_1 = require("../workflows/workflow-sharing.service");
exports.schemaGetExecutionsQueryFilter = {
    $id: '/IGetExecutionsQueryFilter',
    type: 'object',
    properties: {
        id: { type: 'string' },
        finished: { type: 'boolean' },
        mode: { type: 'string' },
        retryOf: { type: 'string' },
        retrySuccessId: { type: 'string' },
        status: {
            type: 'array',
            items: { type: 'string' },
        },
        waitTill: { type: 'boolean' },
        workflowId: { anyOf: [{ type: 'integer' }, { type: 'string' }] },
        metadata: { type: 'array', items: { $ref: '#/$defs/metadata' } },
        startedAfter: { type: 'date-time' },
        startedBefore: { type: 'date-time' },
        annotationTags: { type: 'array', items: { type: 'string' } },
        vote: { type: 'string' },
        projectId: { type: 'string' },
    },
    $defs: {
        metadata: {
            type: 'object',
            required: ['key', 'value'],
            properties: {
                key: {
                    type: 'string',
                },
                value: { type: 'string' },
            },
        },
    },
};
exports.allowedExecutionsQueryFilterFields = Object.keys(exports.schemaGetExecutionsQueryFilter.properties);
let ExecutionService = class ExecutionService {
    constructor(globalConfig, logger, activeExecutions, executionAnnotationRepository, annotationTagMappingRepository, executionRepository, workflowRepository, nodeTypes, waitTracker, workflowRunner, concurrencyControl, license, workflowSharingService) {
        this.globalConfig = globalConfig;
        this.logger = logger;
        this.activeExecutions = activeExecutions;
        this.executionAnnotationRepository = executionAnnotationRepository;
        this.annotationTagMappingRepository = annotationTagMappingRepository;
        this.executionRepository = executionRepository;
        this.workflowRepository = workflowRepository;
        this.nodeTypes = nodeTypes;
        this.waitTracker = waitTracker;
        this.workflowRunner = workflowRunner;
        this.concurrencyControl = concurrencyControl;
        this.license = license;
        this.workflowSharingService = workflowSharingService;
    }
    async findOne(req, sharedWorkflowIds) {
        if (!sharedWorkflowIds.length)
            return undefined;
        const { id: executionId } = req.params;
        const execution = await this.executionRepository.findIfShared(executionId, sharedWorkflowIds);
        if (!execution) {
            this.logger.info('Attempt to read execution was blocked due to insufficient permissions', {
                userId: req.user.id,
                executionId,
            });
            return undefined;
        }
        return execution;
    }
    async retry(req, sharedWorkflowIds) {
        const { id: executionId } = req.params;
        const execution = await this.executionRepository.findWithUnflattenedData(executionId, sharedWorkflowIds);
        if (!execution) {
            this.logger.info('Attempt to retry an execution was blocked due to insufficient permissions', {
                userId: req.user.id,
                executionId,
            });
            throw new not_found_error_1.NotFoundError(`The execution with the ID "${executionId}" does not exist.`);
        }
        if (execution.status === 'new')
            throw new queued_execution_retry_error_1.QueuedExecutionRetryError();
        if (!execution.data.executionData)
            throw new aborted_execution_retry_error_1.AbortedExecutionRetryError();
        if (execution.finished) {
            throw new n8n_workflow_1.UnexpectedError('The execution succeeded, so it cannot be retried.');
        }
        const executionMode = 'retry';
        execution.workflowData.active = false;
        const data = {
            executionMode,
            executionData: execution.data,
            retryOf: req.params.id,
            workflowData: execution.workflowData,
            userId: req.user.id,
        };
        const { lastNodeExecuted } = data.executionData.resultData;
        if (lastNodeExecuted) {
            delete data.executionData.resultData.error;
            const { length } = data.executionData.resultData.runData[lastNodeExecuted];
            if (length > 0 &&
                data.executionData.resultData.runData[lastNodeExecuted][length - 1].error !== undefined) {
                data.executionData.resultData.runData[lastNodeExecuted].pop();
            }
        }
        if (req.body.loadWorkflow) {
            const workflowId = execution.workflowData.id;
            const workflowData = (await this.workflowRepository.findOneBy({
                id: workflowId,
            }));
            if (workflowData === undefined) {
                throw new n8n_workflow_1.UserError('Workflow could not be found and so the data not be loaded for the retry.', { extra: { workflowId } });
            }
            data.workflowData = workflowData;
            const workflowInstance = new n8n_workflow_1.Workflow({
                id: workflowData.id,
                name: workflowData.name,
                nodes: workflowData.nodes,
                connections: workflowData.connections,
                active: false,
                nodeTypes: this.nodeTypes,
                staticData: undefined,
                settings: workflowData.settings,
            });
            for (const stack of data.executionData.executionData.nodeExecutionStack) {
                const node = workflowInstance.getNode(stack.node.name);
                if (node === null) {
                    this.logger.error('Failed to retry an execution because a node could not be found', {
                        userId: req.user.id,
                        executionId,
                        nodeName: stack.node.name,
                    });
                    throw new n8n_workflow_1.WorkflowOperationError(`Could not find the node "${stack.node.name}" in workflow. It probably got deleted or renamed. Without it the workflow can sadly not be retried.`);
                }
                stack.node = node;
            }
        }
        const retriedExecutionId = await this.workflowRunner.run(data);
        const executionData = await this.activeExecutions.getPostExecutePromise(retriedExecutionId);
        if (!executionData) {
            throw new n8n_workflow_1.UnexpectedError('The retry did not start for an unknown reason.');
        }
        return executionData.status;
    }
    async delete(req, sharedWorkflowIds) {
        const { deleteBefore, ids, filters: requestFiltersRaw } = req.body;
        let requestFilters;
        if (requestFiltersRaw) {
            try {
                Object.keys(requestFiltersRaw).map((key) => {
                    if (!exports.allowedExecutionsQueryFilterFields.includes(key))
                        delete requestFiltersRaw[key];
                });
                if ((0, jsonschema_1.validate)(requestFiltersRaw, exports.schemaGetExecutionsQueryFilter).valid) {
                    requestFilters = requestFiltersRaw;
                }
            }
            catch (error) {
                throw new internal_server_error_1.InternalServerError('Parameter "filter" contained invalid JSON string.', error);
            }
        }
        if (requestFilters?.metadata && !this.license.isAdvancedExecutionFiltersEnabled()) {
            delete requestFilters.metadata;
        }
        await this.executionRepository.deleteExecutionsByFilter(requestFilters, sharedWorkflowIds, {
            deleteBefore,
            ids,
        });
    }
    async createErrorExecution(error, node, workflowData, workflow, mode) {
        const saveDataErrorExecutionDisabled = workflowData?.settings?.saveDataErrorExecution === 'none';
        if (saveDataErrorExecutionDisabled)
            return;
        const executionData = {
            startData: {
                destinationNode: node.name,
                runNodeFilter: [node.name],
            },
            executionData: {
                contextData: {},
                metadata: {},
                nodeExecutionStack: [
                    {
                        node,
                        data: {
                            main: [
                                [
                                    {
                                        json: {},
                                        pairedItem: {
                                            item: 0,
                                        },
                                    },
                                ],
                            ],
                        },
                        source: null,
                    },
                ],
                waitingExecution: {},
                waitingExecutionSource: {},
            },
            resultData: {
                runData: {
                    [node.name]: [
                        {
                            startTime: 0,
                            executionIndex: 0,
                            executionTime: 0,
                            error,
                            source: [],
                        },
                    ],
                },
                error,
                lastNodeExecuted: node.name,
            },
        };
        const fullExecutionData = {
            data: executionData,
            mode,
            finished: false,
            workflowData,
            workflowId: workflow.id,
            stoppedAt: new Date(),
            status: 'error',
        };
        await this.executionRepository.createNewExecution(fullExecutionData);
    }
    async findRangeWithCount(query) {
        const results = await this.executionRepository.findManyByRangeQuery(query);
        if (this.globalConfig.database.type === 'postgresdb') {
            const liveRows = await this.executionRepository.getLiveExecutionRowsOnPostgres();
            if (liveRows === -1)
                return { count: -1, estimated: false, results };
            if (liveRows > 100_000) {
                return { count: liveRows, estimated: true, results };
            }
        }
        const { range: _, ...countQuery } = query;
        const count = await this.executionRepository.fetchCount({ ...countQuery, kind: 'count' });
        return { results, count, estimated: false };
    }
    async findLatestCurrentAndCompleted(query) {
        const currentStatuses = ['new', 'running'];
        const completedStatuses = n8n_workflow_1.ExecutionStatusList.filter((s) => !currentStatuses.includes(s));
        const [current, completed] = await Promise.all([
            this.findRangeWithCount({
                ...query,
                status: currentStatuses,
                order: { top: 'running' },
            }),
            this.findRangeWithCount({
                ...query,
                status: completedStatuses,
                order: { startedAt: 'DESC' },
            }),
        ]);
        return {
            results: current.results.concat(completed.results),
            count: completed.count,
            estimated: completed.estimated,
        };
    }
    async findAllEnqueuedExecutions() {
        return await this.executionRepository.findMultipleExecutions({
            select: ['id', 'mode'],
            where: { status: 'new' },
            order: { id: 'ASC' },
        }, { includeData: true, unflattenData: true });
    }
    async stop(executionId) {
        const execution = await this.executionRepository.findSingleExecution(executionId, {
            includeData: true,
            unflattenData: true,
        });
        if (!execution)
            throw new missing_execution_stop_error_1.MissingExecutionStopError(executionId);
        this.assertStoppable(execution);
        const { mode, startedAt, stoppedAt, finished, status } = config_2.default.getEnv('executions.mode') === 'regular'
            ? await this.stopInRegularMode(execution)
            : await this.stopInScalingMode(execution);
        return {
            mode,
            startedAt: new Date(startedAt),
            stoppedAt: stoppedAt ? new Date(stoppedAt) : undefined,
            finished,
            status,
        };
    }
    assertStoppable(execution) {
        const STOPPABLE_STATUSES = ['new', 'unknown', 'waiting', 'running'];
        if (!STOPPABLE_STATUSES.includes(execution.status)) {
            throw new n8n_workflow_1.WorkflowOperationError(`Only running or waiting executions can be stopped and ${execution.id} is currently ${execution.status}`);
        }
    }
    async stopInRegularMode(execution) {
        if (this.concurrencyControl.has(execution.id)) {
            this.concurrencyControl.remove({ mode: execution.mode, executionId: execution.id });
            return await this.executionRepository.stopBeforeRun(execution);
        }
        if (this.activeExecutions.has(execution.id)) {
            this.activeExecutions.stopExecution(execution.id);
        }
        if (this.waitTracker.has(execution.id)) {
            this.waitTracker.stopExecution(execution.id);
        }
        return await this.executionRepository.stopDuringRun(execution);
    }
    async stopInScalingMode(execution) {
        if (this.activeExecutions.has(execution.id)) {
            this.activeExecutions.stopExecution(execution.id);
        }
        if (this.waitTracker.has(execution.id)) {
            this.waitTracker.stopExecution(execution.id);
        }
        return await this.executionRepository.stopDuringRun(execution);
    }
    async addScopes(user, summaries) {
        const workflowIds = [...new Set(summaries.map((s) => s.workflowId))];
        const scopes = Object.fromEntries(await this.workflowSharingService.getSharedWorkflowScopes(workflowIds, user));
        for (const s of summaries) {
            s.scopes = scopes[s.workflowId] ?? [];
        }
    }
    async annotate(executionId, updateData, sharedWorkflowIds) {
        const execution = await this.executionRepository.findIfAccessible(executionId, sharedWorkflowIds);
        if (!execution) {
            this.logger.info('Attempt to read execution was blocked due to insufficient permissions', {
                executionId,
            });
            throw new not_found_error_1.NotFoundError('Execution not found');
        }
        await this.executionAnnotationRepository.upsert({ execution: { id: executionId }, vote: updateData.vote }, ['execution']);
        const annotation = await this.executionAnnotationRepository.findOneOrFail({
            where: {
                execution: { id: executionId },
            },
        });
        if (updateData.tags) {
            await this.annotationTagMappingRepository.overwriteTags(annotation.id, updateData.tags);
        }
    }
};
exports.ExecutionService = ExecutionService;
exports.ExecutionService = ExecutionService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [config_1.GlobalConfig,
        n8n_core_1.Logger,
        active_executions_1.ActiveExecutions,
        db_1.ExecutionAnnotationRepository,
        db_1.AnnotationTagMappingRepository,
        db_1.ExecutionRepository,
        db_1.WorkflowRepository,
        node_types_1.NodeTypes,
        wait_tracker_1.WaitTracker,
        workflow_runner_1.WorkflowRunner,
        concurrency_control_service_1.ConcurrencyControlService,
        license_1.License,
        workflow_sharing_service_1.WorkflowSharingService])
], ExecutionService);
//# sourceMappingURL=execution.service.js.map