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
exports.ExecutionRepository = void 0;
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const DateUtils_1 = require("@n8n/typeorm/util/DateUtils");
const flatted_1 = require("flatted");
const pick_1 = __importDefault(require("lodash/pick"));
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const execution_data_repository_1 = require("./execution-data.repository");
const entities_1 = require("../entities");
const separate_1 = require("../utils/separate");
class PostgresLiveRowsRetrievalError extends n8n_workflow_1.UnexpectedError {
    constructor(rows) {
        super('Failed to retrieve live execution rows in Postgres', { extra: { rows } });
    }
}
function parseFiltersToQueryBuilder(qb, filters) {
    if (filters?.status) {
        qb.andWhere('execution.status IN (:...workflowStatus)', {
            workflowStatus: filters.status,
        });
    }
    if (filters?.finished) {
        qb.andWhere({ finished: filters.finished });
    }
    if (filters?.metadata) {
        qb.leftJoin(entities_1.ExecutionMetadata, 'md', 'md.executionId = execution.id');
        for (const md of filters.metadata) {
            qb.andWhere('md.key = :key AND md.value = :value', md);
        }
    }
    if (filters?.startedAfter) {
        qb.andWhere({
            startedAt: (0, typeorm_1.MoreThanOrEqual)(DateUtils_1.DateUtils.mixedDateToUtcDatetimeString(new Date(filters.startedAfter))),
        });
    }
    if (filters?.startedBefore) {
        qb.andWhere({
            startedAt: (0, typeorm_1.LessThanOrEqual)(DateUtils_1.DateUtils.mixedDateToUtcDatetimeString(new Date(filters.startedBefore))),
        });
    }
    if (filters?.workflowId) {
        qb.andWhere({
            workflowId: filters.workflowId,
        });
    }
}
const lessThanOrEqual = (date) => {
    return (0, typeorm_1.LessThanOrEqual)(DateUtils_1.DateUtils.mixedDateToUtcDatetimeString(new Date(date)));
};
const moreThanOrEqual = (date) => {
    return (0, typeorm_1.MoreThanOrEqual)(DateUtils_1.DateUtils.mixedDateToUtcDatetimeString(new Date(date)));
};
let ExecutionRepository = class ExecutionRepository extends typeorm_1.Repository {
    constructor(dataSource, globalConfig, logger, errorReporter, executionDataRepository, binaryDataService) {
        super(entities_1.ExecutionEntity, dataSource.manager);
        this.globalConfig = globalConfig;
        this.logger = logger;
        this.errorReporter = errorReporter;
        this.executionDataRepository = executionDataRepository;
        this.binaryDataService = binaryDataService;
        this.hardDeletionBatchSize = 100;
        this.summaryFields = {
            id: true,
            workflowId: true,
            mode: true,
            retryOf: true,
            status: true,
            createdAt: true,
            startedAt: true,
            stoppedAt: true,
        };
        this.annotationFields = {
            id: true,
            vote: true,
        };
    }
    async findMultipleExecutions(queryParams, options) {
        if (options?.includeData) {
            if (!queryParams.relations) {
                queryParams.relations = [];
            }
            if (Array.isArray(queryParams.relations)) {
                queryParams.relations.push('executionData', 'metadata');
            }
            else {
                queryParams.relations.executionData = true;
                queryParams.relations.metadata = true;
            }
        }
        const executions = await this.find(queryParams);
        if (options?.includeData && options?.unflattenData) {
            const [valid, invalid] = (0, separate_1.separate)(executions, (e) => e.executionData !== null);
            this.reportInvalidExecutions(invalid);
            return valid.map((execution) => {
                const { executionData, metadata, ...rest } = execution;
                return {
                    ...rest,
                    data: (0, flatted_1.parse)(executionData.data),
                    workflowData: executionData.workflowData,
                    customData: Object.fromEntries(metadata.map((m) => [m.key, m.value])),
                };
            });
        }
        else if (options?.includeData) {
            const [valid, invalid] = (0, separate_1.separate)(executions, (e) => e.executionData !== null);
            this.reportInvalidExecutions(invalid);
            return valid.map((execution) => {
                const { executionData, metadata, ...rest } = execution;
                return {
                    ...rest,
                    data: execution.executionData.data,
                    workflowData: execution.executionData.workflowData,
                    customData: Object.fromEntries(metadata.map((m) => [m.key, m.value])),
                };
            });
        }
        return executions.map((execution) => {
            const { executionData, ...rest } = execution;
            return rest;
        });
    }
    reportInvalidExecutions(executions) {
        if (executions.length === 0)
            return;
        this.errorReporter.error(new n8n_workflow_1.UnexpectedError('Found executions without executionData', {
            extra: { executionIds: executions.map(({ id }) => id) },
        }));
    }
    serializeAnnotation(annotation) {
        if (!annotation)
            return null;
        const { id, vote, tags } = annotation;
        return {
            id,
            vote,
            tags: tags?.map((tag) => (0, pick_1.default)(tag, ['id', 'name'])) ?? [],
        };
    }
    async findSingleExecution(id, options) {
        const findOptions = {
            where: {
                id,
                ...options?.where,
            },
        };
        if (options?.includeData) {
            findOptions.relations = { executionData: true, metadata: true };
        }
        if (options?.includeAnnotation) {
            findOptions.relations = {
                ...findOptions.relations,
                annotation: {
                    tags: true,
                },
            };
        }
        const execution = await this.findOne(findOptions);
        if (!execution) {
            return undefined;
        }
        const { executionData, metadata, annotation, ...rest } = execution;
        const serializedAnnotation = this.serializeAnnotation(annotation);
        if (execution.status === 'success' && executionData?.data === '[]') {
            this.errorReporter.error('Found successful execution where data is empty stringified array', {
                extra: {
                    executionId: execution.id,
                    workflowId: executionData?.workflowData.id,
                },
            });
        }
        return {
            ...rest,
            ...(options?.includeData && {
                data: options?.unflattenData
                    ? (0, flatted_1.parse)(executionData.data)
                    : executionData.data,
                workflowData: executionData?.workflowData,
                customData: Object.fromEntries(metadata.map((m) => [m.key, m.value])),
            }),
            ...(options?.includeAnnotation &&
                serializedAnnotation && { annotation: serializedAnnotation }),
        };
    }
    async createNewExecution(execution) {
        const { data: dataObj, workflowData: currentWorkflow, ...rest } = execution;
        const { connections, nodes, name, settings } = currentWorkflow ?? {};
        const workflowData = { connections, nodes, name, settings, id: currentWorkflow.id };
        const data = (0, flatted_1.stringify)(dataObj);
        const { type: dbType, sqlite: sqliteConfig } = this.globalConfig.database;
        if (dbType === 'sqlite' && sqliteConfig.poolSize === 0) {
            const { identifiers: inserted } = await this.insert({ ...rest, createdAt: new Date() });
            const { id: executionId } = inserted[0];
            await this.executionDataRepository.insert({ executionId, workflowData, data });
            return String(executionId);
        }
        else {
            return await this.manager.transaction(async (transactionManager) => {
                const { identifiers: inserted } = await transactionManager.insert(entities_1.ExecutionEntity, {
                    ...rest,
                    createdAt: new Date(),
                });
                const { id: executionId } = inserted[0];
                await this.executionDataRepository.createExecutionDataForExecution({ executionId, workflowData, data }, transactionManager);
                return String(executionId);
            });
        }
    }
    async markAsCrashed(executionIds) {
        if (!Array.isArray(executionIds))
            executionIds = [executionIds];
        await this.update({ id: (0, typeorm_1.In)(executionIds) }, {
            status: 'crashed',
            stoppedAt: new Date(),
        });
        this.logger.info('Marked executions as `crashed`', { executionIds });
    }
    async hardDelete(ids) {
        return await Promise.all([
            this.delete(ids.executionId),
            this.binaryDataService.deleteMany([ids]),
        ]);
    }
    async setRunning(executionId) {
        const startedAt = new Date();
        await this.update({ id: executionId }, { status: 'running', startedAt });
        return startedAt;
    }
    async updateExistingExecution(executionId, execution) {
        const { id, data, workflowId, workflowData, createdAt, startedAt, customData, ...executionInformation } = execution;
        const executionData = {};
        if (workflowData)
            executionData.workflowData = workflowData;
        if (data)
            executionData.data = (0, flatted_1.stringify)(data);
        const { type: dbType, sqlite: sqliteConfig } = this.globalConfig.database;
        if (dbType === 'sqlite' && sqliteConfig.poolSize === 0) {
            if (Object.keys(executionInformation).length > 0) {
                await this.update({ id: executionId }, executionInformation);
            }
            if (Object.keys(executionData).length > 0) {
                await this.executionDataRepository.update({ executionId }, executionData);
            }
            return;
        }
        await this.manager.transaction(async (tx) => {
            if (Object.keys(executionInformation).length > 0) {
                await tx.update(entities_1.ExecutionEntity, { id: executionId }, executionInformation);
            }
            if (Object.keys(executionData).length > 0) {
                await tx.update(entities_1.ExecutionData, { executionId }, executionData);
            }
        });
    }
    async deleteExecutionsByFilter(filters, accessibleWorkflowIds, deleteConditions) {
        if (!deleteConditions?.deleteBefore && !deleteConditions?.ids) {
            throw new n8n_workflow_1.UnexpectedError('Either "deleteBefore" or "ids" must be present in the request body');
        }
        const query = this.createQueryBuilder('execution')
            .select(['execution.id', 'execution.workflowId'])
            .andWhere('execution.workflowId IN (:...accessibleWorkflowIds)', { accessibleWorkflowIds });
        if (deleteConditions.deleteBefore) {
            query.andWhere('execution.startedAt <= :deleteBefore', {
                deleteBefore: deleteConditions.deleteBefore,
            });
            parseFiltersToQueryBuilder(query, filters);
        }
        else if (deleteConditions.ids) {
            query.andWhere('execution.id IN (:...executionIds)', { executionIds: deleteConditions.ids });
        }
        const executions = await query.getMany();
        if (!executions.length) {
            if (deleteConditions.ids) {
                this.logger.error('Failed to delete an execution due to insufficient permissions', {
                    executionIds: deleteConditions.ids,
                });
            }
            return;
        }
        const ids = executions.map(({ id, workflowId }) => ({
            executionId: id,
            workflowId,
        }));
        do {
            const batch = ids.splice(0, this.hardDeletionBatchSize);
            await Promise.all([
                this.delete(batch.map(({ executionId }) => executionId)),
                this.binaryDataService.deleteMany(batch),
            ]);
        } while (ids.length > 0);
    }
    async getIdsSince(date) {
        return await this.find({
            select: ['id'],
            where: {
                startedAt: (0, typeorm_1.MoreThanOrEqual)(DateUtils_1.DateUtils.mixedDateToUtcDatetimeString(date)),
            },
        }).then((executions) => executions.map(({ id }) => id));
    }
    async softDeletePrunableExecutions() {
        const { pruneDataMaxAge, pruneDataMaxCount } = this.globalConfig.executions;
        const annotatedExecutionsSubQuery = this.manager
            .createQueryBuilder()
            .subQuery()
            .select('annotation.executionId')
            .from(entities_1.ExecutionAnnotation, 'annotation');
        const date = new Date();
        date.setHours(date.getHours() - pruneDataMaxAge);
        const toPrune = [
            { stoppedAt: (0, typeorm_1.LessThanOrEqual)(DateUtils_1.DateUtils.mixedDateToUtcDatetimeString(date)) },
        ];
        if (pruneDataMaxCount > 0) {
            const executions = await this.createQueryBuilder('execution')
                .select('execution.id')
                .where('execution.id NOT IN ' + annotatedExecutionsSubQuery.getQuery())
                .skip(pruneDataMaxCount)
                .take(1)
                .orderBy('execution.id', 'DESC')
                .getMany();
            if (executions[0]) {
                toPrune.push({ id: (0, typeorm_1.LessThanOrEqual)(executions[0].id) });
            }
        }
        const [timeBasedWhere, countBasedWhere] = toPrune;
        return await this.createQueryBuilder()
            .update(entities_1.ExecutionEntity)
            .set({ deletedAt: new Date() })
            .where({
            deletedAt: (0, typeorm_1.IsNull)(),
            status: (0, typeorm_1.Not)((0, typeorm_1.In)(['new', 'running', 'waiting'])),
        })
            .andWhere('id NOT IN ' + annotatedExecutionsSubQuery.getQuery())
            .andWhere(new typeorm_1.Brackets((qb) => countBasedWhere
            ? qb.where(timeBasedWhere).orWhere(countBasedWhere)
            : qb.where(timeBasedWhere)))
            .execute();
    }
    async findSoftDeletedExecutions() {
        const date = new Date();
        date.setHours(date.getHours() - this.globalConfig.executions.pruneDataHardDeleteBuffer);
        const workflowIdsAndExecutionIds = (await this.find({
            select: ['workflowId', 'id'],
            where: {
                deletedAt: (0, typeorm_1.LessThanOrEqual)(DateUtils_1.DateUtils.mixedDateToUtcDatetimeString(date)),
            },
            take: this.hardDeletionBatchSize,
            withDeleted: true,
        })).map(({ id: executionId, workflowId }) => ({ workflowId, executionId }));
        return workflowIdsAndExecutionIds;
    }
    async deleteByIds(executionIds) {
        return await this.delete({ id: (0, typeorm_1.In)(executionIds) });
    }
    async getWaitingExecutions() {
        const waitTill = new Date(Date.now() + 70000);
        const where = {
            waitTill: (0, typeorm_1.LessThanOrEqual)(waitTill),
            status: (0, typeorm_1.Not)('crashed'),
        };
        const dbType = this.globalConfig.database.type;
        if (dbType === 'sqlite') {
            where.waitTill = (0, typeorm_1.LessThanOrEqual)(DateUtils_1.DateUtils.mixedDateToUtcDatetimeString(waitTill));
        }
        return await this.findMultipleExecutions({
            select: ['id', 'waitTill'],
            where,
            order: {
                waitTill: 'ASC',
            },
        });
    }
    async getExecutionsCountForPublicApi(data) {
        const executions = await this.count({
            where: {
                ...(data.lastId && { id: (0, typeorm_1.LessThan)(data.lastId) }),
                ...(data.status && { ...this.getStatusCondition(data.status) }),
                ...(data.workflowIds && { workflowId: (0, typeorm_1.In)(data.workflowIds) }),
                ...(data.excludedWorkflowIds && { workflowId: (0, typeorm_1.Not)((0, typeorm_1.In)(data.excludedWorkflowIds)) }),
            },
            take: data.limit,
        });
        return executions;
    }
    getStatusCondition(status) {
        const condition = {};
        if (status === 'success') {
            condition.status = 'success';
        }
        else if (status === 'waiting') {
            condition.status = 'waiting';
        }
        else if (status === 'error') {
            condition.status = (0, typeorm_1.In)(['error', 'crashed']);
        }
        return condition;
    }
    async getExecutionsForPublicApi(params) {
        let where = {};
        if (params.lastId && params.excludedExecutionsIds?.length) {
            where.id = (0, typeorm_1.Raw)((id) => `${id} < :lastId AND ${id} NOT IN (:...excludedExecutionsIds)`, {
                lastId: params.lastId,
                excludedExecutionsIds: params.excludedExecutionsIds,
            });
        }
        else if (params.lastId) {
            where.id = (0, typeorm_1.LessThan)(params.lastId);
        }
        else if (params.excludedExecutionsIds?.length) {
            where.id = (0, typeorm_1.Not)((0, typeorm_1.In)(params.excludedExecutionsIds));
        }
        if (params.status) {
            where = { ...where, ...this.getStatusCondition(params.status) };
        }
        if (params.workflowIds) {
            where = { ...where, workflowId: (0, typeorm_1.In)(params.workflowIds) };
        }
        return await this.findMultipleExecutions({
            select: [
                'id',
                'mode',
                'retryOf',
                'retrySuccessId',
                'startedAt',
                'stoppedAt',
                'workflowId',
                'waitTill',
                'finished',
            ],
            where,
            order: { id: 'DESC' },
            take: params.limit,
            relations: ['executionData'],
        }, {
            includeData: params.includeData,
            unflattenData: true,
        });
    }
    async getExecutionInWorkflowsForPublicApi(id, workflowIds, includeData) {
        return await this.findSingleExecution(id, {
            where: {
                workflowId: (0, typeorm_1.In)(workflowIds),
            },
            includeData,
            unflattenData: true,
        });
    }
    async findWithUnflattenedData(executionId, accessibleWorkflowIds) {
        return await this.findSingleExecution(executionId, {
            where: {
                workflowId: (0, typeorm_1.In)(accessibleWorkflowIds),
            },
            includeData: true,
            unflattenData: true,
            includeAnnotation: true,
        });
    }
    async findIfShared(executionId, sharedWorkflowIds) {
        return await this.findSingleExecution(executionId, {
            where: {
                workflowId: (0, typeorm_1.In)(sharedWorkflowIds),
            },
            includeData: true,
            unflattenData: false,
            includeAnnotation: true,
        });
    }
    async findIfAccessible(executionId, accessibleWorkflowIds) {
        return await this.findSingleExecution(executionId, {
            where: { workflowId: (0, typeorm_1.In)(accessibleWorkflowIds) },
        });
    }
    async stopBeforeRun(execution) {
        execution.status = 'canceled';
        execution.stoppedAt = new Date();
        await this.update({ id: execution.id }, { status: execution.status, stoppedAt: execution.stoppedAt });
        return execution;
    }
    async stopDuringRun(execution) {
        const error = new n8n_workflow_1.ExecutionCancelledError(execution.id);
        execution.data ??= { resultData: { runData: {} } };
        execution.data.resultData.error = {
            ...error,
            message: error.message,
            stack: error.stack,
        };
        execution.stoppedAt = new Date();
        execution.waitTill = null;
        execution.status = 'canceled';
        await this.updateExistingExecution(execution.id, execution);
        return execution;
    }
    async cancelMany(executionIds) {
        await this.update({ id: (0, typeorm_1.In)(executionIds) }, { status: 'canceled', stoppedAt: new Date() });
    }
    reduceExecutionsWithAnnotations(rawExecutionsWithTags) {
        return rawExecutionsWithTags.reduce((acc, { annotation_id: _, annotation_vote: vote, annotation_tags_id: tagId, annotation_tags_name: tagName, ...row }) => {
            const existingExecution = acc.find((e) => e.id === row.id);
            if (existingExecution) {
                if (tagId) {
                    existingExecution.annotation = existingExecution.annotation ?? {
                        vote,
                        tags: [],
                    };
                    existingExecution.annotation.tags.push({ id: tagId, name: tagName });
                }
            }
            else {
                acc.push({
                    ...row,
                    annotation: {
                        vote,
                        tags: tagId ? [{ id: tagId, name: tagName }] : [],
                    },
                });
            }
            return acc;
        }, []);
    }
    async findManyByRangeQuery(query) {
        if (query?.accessibleWorkflowIds?.length === 0) {
            throw new n8n_workflow_1.UnexpectedError('Expected accessible workflow IDs');
        }
        const qb = this.toQueryBuilderWithAnnotations(query);
        const rawExecutionsWithTags = await qb.getRawMany();
        const executions = this.reduceExecutionsWithAnnotations(rawExecutionsWithTags);
        return executions.map((execution) => this.toSummary(execution));
    }
    toSummary(execution) {
        execution.id = execution.id.toString();
        const normalizeDateString = (date) => {
            if (date.includes(' '))
                return date.replace(' ', 'T') + 'Z';
            return date;
        };
        if (execution.createdAt) {
            execution.createdAt =
                execution.createdAt instanceof Date
                    ? execution.createdAt.toISOString()
                    : normalizeDateString(execution.createdAt);
        }
        if (execution.startedAt) {
            execution.startedAt =
                execution.startedAt instanceof Date
                    ? execution.startedAt.toISOString()
                    : normalizeDateString(execution.startedAt);
        }
        if (execution.waitTill) {
            execution.waitTill =
                execution.waitTill instanceof Date
                    ? execution.waitTill.toISOString()
                    : normalizeDateString(execution.waitTill);
        }
        if (execution.stoppedAt) {
            execution.stoppedAt =
                execution.stoppedAt instanceof Date
                    ? execution.stoppedAt.toISOString()
                    : normalizeDateString(execution.stoppedAt);
        }
        return execution;
    }
    async fetchCount(query) {
        return await this.toQueryBuilder(query).getCount();
    }
    async getLiveExecutionRowsOnPostgres() {
        const tableName = `${this.globalConfig.database.tablePrefix}execution_entity`;
        const pgSql = `SELECT n_live_tup as result FROM pg_stat_all_tables WHERE relname = '${tableName}';`;
        try {
            const rows = (await this.query(pgSql));
            if (rows.length !== 1)
                throw new PostgresLiveRowsRetrievalError(rows);
            const [row] = rows;
            return parseInt(row.result, 10);
        }
        catch (error) {
            if (error instanceof Error)
                this.logger.error(error.message, { error });
            return -1;
        }
    }
    toQueryBuilder(query) {
        const { accessibleWorkflowIds, status, finished, workflowId, startedBefore, startedAfter, metadata, annotationTags, vote, projectId, } = query;
        const fields = Object.keys(this.summaryFields)
            .concat(['waitTill', 'retrySuccessId'])
            .map((key) => `execution.${key} AS "${key}"`)
            .concat('workflow.name AS "workflowName"');
        const qb = this.createQueryBuilder('execution')
            .select(fields)
            .innerJoin('execution.workflow', 'workflow')
            .where('execution.workflowId IN (:...accessibleWorkflowIds)', { accessibleWorkflowIds });
        if (query.kind === 'range') {
            const { limit, firstId, lastId } = query.range;
            qb.limit(limit);
            if (firstId)
                qb.andWhere('execution.id > :firstId', { firstId });
            if (lastId)
                qb.andWhere('execution.id < :lastId', { lastId });
            if (query.order?.startedAt === 'DESC') {
                qb.orderBy({ 'COALESCE(execution.startedAt, execution.createdAt)': 'DESC' });
            }
            else if (query.order?.top) {
                qb.orderBy(`(CASE WHEN execution.status = '${query.order.top}' THEN 0 ELSE 1 END)`);
            }
            else {
                qb.orderBy({ 'execution.id': 'DESC' });
            }
        }
        if (status)
            qb.andWhere('execution.status IN (:...status)', { status });
        if (finished)
            qb.andWhere({ finished });
        if (workflowId)
            qb.andWhere({ workflowId });
        if (startedBefore)
            qb.andWhere({ startedAt: lessThanOrEqual(startedBefore) });
        if (startedAfter)
            qb.andWhere({ startedAt: moreThanOrEqual(startedAfter) });
        if (metadata?.length === 1) {
            const [{ key, value }] = metadata;
            qb.innerJoin(entities_1.ExecutionMetadata, 'md', 'md.executionId = execution.id AND md.key = :key AND md.value = :value');
            qb.setParameter('key', key);
            qb.setParameter('value', value);
        }
        if (annotationTags?.length || vote) {
            qb.innerJoin('execution.annotation', 'annotation');
            if (annotationTags?.length) {
                for (let index = 0; index < annotationTags.length; index++) {
                    qb.innerJoin(entities_1.AnnotationTagMapping, `atm_${index}`, `atm_${index}.annotationId = annotation.id AND atm_${index}.tagId = :tagId_${index}`);
                    qb.setParameter(`tagId_${index}`, annotationTags[index]);
                }
            }
            if (vote) {
                qb.andWhere('annotation.vote = :vote', { vote });
            }
        }
        if (projectId) {
            qb.innerJoin(entities_1.WorkflowEntity, 'w', 'w.id = execution.workflowId')
                .innerJoin(entities_1.SharedWorkflow, 'sw', 'sw.workflowId = w.id')
                .andWhere('sw.projectId = :projectId', { projectId });
        }
        return qb;
    }
    toQueryBuilderWithAnnotations(query) {
        const annotationFields = Object.keys(this.annotationFields).map((key) => `annotation.${key} AS "annotation_${key}"`);
        const subQuery = this.toQueryBuilder(query).addSelect(annotationFields);
        if (!subQuery.expressionMap.joinAttributes.some((join) => join.alias.name === 'annotation')) {
            subQuery.leftJoin('execution.annotation', 'annotation');
        }
        return this.manager
            .createQueryBuilder()
            .select(['e.*', 'ate.id AS "annotation_tags_id"', 'ate.name AS "annotation_tags_name"'])
            .from(`(${subQuery.getQuery()})`, 'e')
            .setParameters(subQuery.getParameters())
            .leftJoin(entities_1.AnnotationTagMapping, 'atm', 'atm.annotationId = e.annotation_id')
            .leftJoin(entities_1.AnnotationTagEntity, 'ate', 'ate.id = atm.tagId');
    }
    async getAllIds() {
        const executions = await this.find({ select: ['id'], order: { id: 'ASC' } });
        return executions.map(({ id }) => id);
    }
    async getInProgressExecutionIds(batchSize) {
        const executions = await this.find({
            select: ['id'],
            where: { status: (0, typeorm_1.In)(['new', 'running']) },
            order: { startedAt: 'DESC' },
            take: batchSize,
        });
        return executions.map(({ id }) => id);
    }
};
exports.ExecutionRepository = ExecutionRepository;
exports.ExecutionRepository = ExecutionRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        config_1.GlobalConfig,
        n8n_core_1.Logger,
        n8n_core_1.ErrorReporter,
        execution_data_repository_1.ExecutionDataRepository,
        n8n_core_1.BinaryDataService])
], ExecutionRepository);
//# sourceMappingURL=execution.repository.js.map