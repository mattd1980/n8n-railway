import { GlobalConfig } from '@n8n/config';
import type { FindManyOptions, FindOperator, FindOptionsWhere } from '@n8n/typeorm';
import { DataSource, Repository } from '@n8n/typeorm';
import { BinaryDataService, ErrorReporter, Logger } from 'n8n-core';
import type { ExecutionStatus, ExecutionSummary } from 'n8n-workflow';
import { ExecutionDataRepository } from './execution-data.repository';
import { ExecutionEntity } from '../entities';
import type { CreateExecutionPayload, IExecutionFlattedDb, IExecutionBase, IExecutionResponse, ExecutionSummaries } from '../entities/types-db';
export interface IGetExecutionsQueryFilter {
    id?: FindOperator<string> | string;
    finished?: boolean;
    mode?: string;
    retryOf?: string;
    retrySuccessId?: string;
    status?: ExecutionStatus[];
    workflowId?: string;
    waitTill?: FindOperator<any> | boolean;
    metadata?: Array<{
        key: string;
        value: string;
    }>;
    startedAfter?: string;
    startedBefore?: string;
}
export declare class ExecutionRepository extends Repository<ExecutionEntity> {
    private readonly globalConfig;
    private readonly logger;
    private readonly errorReporter;
    private readonly executionDataRepository;
    private readonly binaryDataService;
    private hardDeletionBatchSize;
    constructor(dataSource: DataSource, globalConfig: GlobalConfig, logger: Logger, errorReporter: ErrorReporter, executionDataRepository: ExecutionDataRepository, binaryDataService: BinaryDataService);
    findMultipleExecutions(queryParams: FindManyOptions<ExecutionEntity>, options?: {
        unflattenData: true;
        includeData?: true;
    }): Promise<IExecutionResponse[]>;
    findMultipleExecutions(queryParams: FindManyOptions<ExecutionEntity>, options?: {
        unflattenData?: false | undefined;
        includeData?: true;
    }): Promise<IExecutionFlattedDb[]>;
    findMultipleExecutions(queryParams: FindManyOptions<ExecutionEntity>, options?: {
        unflattenData?: boolean;
        includeData?: boolean;
    }): Promise<IExecutionBase[]>;
    reportInvalidExecutions(executions: ExecutionEntity[]): void;
    private serializeAnnotation;
    findSingleExecution(id: string, options?: {
        includeData: true;
        includeAnnotation?: boolean;
        unflattenData: true;
        where?: FindOptionsWhere<ExecutionEntity>;
    }): Promise<IExecutionResponse | undefined>;
    findSingleExecution(id: string, options?: {
        includeData: true;
        includeAnnotation?: boolean;
        unflattenData?: false | undefined;
        where?: FindOptionsWhere<ExecutionEntity>;
    }): Promise<IExecutionFlattedDb | undefined>;
    findSingleExecution(id: string, options?: {
        includeData?: boolean;
        includeAnnotation?: boolean;
        unflattenData?: boolean;
        where?: FindOptionsWhere<ExecutionEntity>;
    }): Promise<IExecutionBase | undefined>;
    createNewExecution(execution: CreateExecutionPayload): Promise<string>;
    markAsCrashed(executionIds: string | string[]): Promise<void>;
    hardDelete(ids: {
        workflowId: string;
        executionId: string;
    }): Promise<[import("@n8n/typeorm").DeleteResult, void]>;
    setRunning(executionId: string): Promise<Date>;
    updateExistingExecution(executionId: string, execution: Partial<IExecutionResponse>): Promise<void>;
    deleteExecutionsByFilter(filters: IGetExecutionsQueryFilter | undefined, accessibleWorkflowIds: string[], deleteConditions: {
        deleteBefore?: Date;
        ids?: string[];
    }): Promise<void>;
    getIdsSince(date: Date): Promise<string[]>;
    softDeletePrunableExecutions(): Promise<import("@n8n/typeorm").UpdateResult>;
    findSoftDeletedExecutions(): Promise<{
        workflowId: string;
        executionId: string;
    }[]>;
    deleteByIds(executionIds: string[]): Promise<import("@n8n/typeorm").DeleteResult>;
    getWaitingExecutions(): Promise<IExecutionResponse[]>;
    getExecutionsCountForPublicApi(data: {
        limit: number;
        lastId?: string;
        workflowIds?: string[];
        status?: ExecutionStatus;
        excludedWorkflowIds?: string[];
    }): Promise<number>;
    private getStatusCondition;
    getExecutionsForPublicApi(params: {
        limit: number;
        includeData?: boolean;
        lastId?: string;
        workflowIds?: string[];
        status?: ExecutionStatus;
        excludedExecutionsIds?: string[];
    }): Promise<IExecutionBase[]>;
    getExecutionInWorkflowsForPublicApi(id: string, workflowIds: string[], includeData?: boolean): Promise<IExecutionBase | undefined>;
    findWithUnflattenedData(executionId: string, accessibleWorkflowIds: string[]): Promise<IExecutionResponse | undefined>;
    findIfShared(executionId: string, sharedWorkflowIds: string[]): Promise<IExecutionFlattedDb | undefined>;
    findIfAccessible(executionId: string, accessibleWorkflowIds: string[]): Promise<IExecutionBase | undefined>;
    stopBeforeRun(execution: IExecutionResponse): Promise<IExecutionResponse>;
    stopDuringRun(execution: IExecutionResponse): Promise<IExecutionResponse>;
    cancelMany(executionIds: string[]): Promise<void>;
    private summaryFields;
    private annotationFields;
    private reduceExecutionsWithAnnotations;
    findManyByRangeQuery(query: ExecutionSummaries.RangeQuery): Promise<ExecutionSummary[]>;
    private toSummary;
    fetchCount(query: ExecutionSummaries.CountQuery): Promise<number>;
    getLiveExecutionRowsOnPostgres(): Promise<number>;
    private toQueryBuilder;
    private toQueryBuilderWithAnnotations;
    getAllIds(): Promise<string[]>;
    getInProgressExecutionIds(batchSize: number): Promise<string[]>;
}
