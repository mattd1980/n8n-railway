import { DataSource, Repository } from '@n8n/typeorm';
import type { EntityManager } from '@n8n/typeorm';
import type { QueryDeepPartialEntity } from '@n8n/typeorm/query-builder/QueryPartialEntity';
import { ExecutionData } from '../entities';
export declare class ExecutionDataRepository extends Repository<ExecutionData> {
    constructor(dataSource: DataSource);
    createExecutionDataForExecution(data: QueryDeepPartialEntity<ExecutionData>, transactionManager: EntityManager): Promise<import("@n8n/typeorm").InsertResult>;
    findByExecutionIds(executionIds: string[]): Promise<import("n8n-workflow").IWorkflowBase[]>;
}
