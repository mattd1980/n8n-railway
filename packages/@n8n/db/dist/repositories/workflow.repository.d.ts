import { GlobalConfig } from '@n8n/config';
import { DataSource, Repository } from '@n8n/typeorm';
import type { SelectQueryBuilder, UpdateResult, FindOptionsWhere, FindOptionsRelations, EntityManager } from '@n8n/typeorm';
import { FolderRepository } from './folder.repository';
import { WorkflowEntity } from '../entities';
import type { ListQueryDb, FolderWithWorkflowAndSubFolderCount, ListQuery } from '../entities/types-db';
type ResourceType = 'folder' | 'workflow';
export type WorkflowFolderUnionFull = (ListQueryDb.Workflow.Plain | ListQueryDb.Workflow.WithSharing | FolderWithWorkflowAndSubFolderCount) & {
    resource: ResourceType;
};
export declare class WorkflowRepository extends Repository<WorkflowEntity> {
    private readonly globalConfig;
    private readonly folderRepository;
    constructor(dataSource: DataSource, globalConfig: GlobalConfig, folderRepository: FolderRepository);
    get(where: FindOptionsWhere<WorkflowEntity>, options?: {
        relations: string[] | FindOptionsRelations<WorkflowEntity>;
    }): Promise<WorkflowEntity | null>;
    getAllActiveIds(): Promise<string[]>;
    getActiveIds({ maxResults }?: {
        maxResults?: number;
    }): Promise<string[]>;
    getActiveCount(): Promise<number>;
    findById(workflowId: string): Promise<WorkflowEntity | null>;
    findByIds(workflowIds: string[], { fields }?: {
        fields?: string[];
    }): Promise<WorkflowEntity[]>;
    getActiveTriggerCount(): Promise<number>;
    updateWorkflowTriggerCount(id: string, triggerCount: number): Promise<UpdateResult>;
    private buildBaseUnionQuery;
    getWorkflowsAndFoldersUnion(workflowIds: string[], options?: ListQuery.Options): Promise<{
        id: string;
        name: string;
        resource: ResourceType;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    private buildUnionQuery;
    private applySortingToUnionQuery;
    private applyPaginationToUnionQuery;
    private removeNameLowerFromResults;
    getWorkflowsAndFoldersCount(workflowIds: string[], options?: ListQuery.Options): Promise<number>;
    getWorkflowsAndFoldersWithCount(workflowIds: string[], options?: ListQuery.Options): Promise<readonly [WorkflowFolderUnionFull[], number]>;
    getAllWorkflowIdsInHierarchy(folderId: string, projectId: string): Promise<string[]>;
    private getFolderIds;
    private getWorkflowsIds;
    private fetchExtraData;
    private enrichDataWithExtras;
    getMany(workflowIds: string[], options?: ListQuery.Options): Promise<(Pick<WorkflowEntity, "id"> & Partial<Pick<WorkflowEntity, "name" | "createdAt" | "updatedAt" | "tags" | "active" | "versionId">>)[]>;
    getManyAndCount(sharedWorkflowIds: string[], options?: ListQuery.Options): Promise<{
        workflows: (Pick<WorkflowEntity, "id"> & Partial<Pick<WorkflowEntity, "name" | "createdAt" | "updatedAt" | "tags" | "active" | "versionId">>)[] | ListQueryDb.Workflow.WithSharing[];
        count: number;
    }>;
    getManyQuery(workflowIds: string[], options?: ListQuery.Options): SelectQueryBuilder<WorkflowEntity>;
    private createBaseQuery;
    private applyFilters;
    private applyNameFilter;
    private applyParentFolderFilter;
    private applyActiveFilter;
    private applyIsArchivedFilter;
    private applyTagsFilter;
    private applyProjectFilter;
    private applyOwnedByRelation;
    private applySelect;
    private applyRelations;
    private applyTagsRelation;
    private applySorting;
    private parseSortingParams;
    private applySortingByColumn;
    private applyPagination;
    findStartingWith(workflowName: string): Promise<Array<{
        name: string;
    }>>;
    findIn(workflowIds: string[]): Promise<WorkflowEntity[]>;
    findWebhookBasedActiveWorkflows(): Promise<{
        id: string;
        name: string;
    }[]>;
    updateActiveState(workflowId: string, newState: boolean): Promise<UpdateResult>;
    deactivateAll(): Promise<UpdateResult>;
    activateAll(): Promise<UpdateResult>;
    findByActiveState(activeState: boolean): Promise<WorkflowEntity[]>;
    moveAllToFolder(fromFolderId: string, toFolderId: string, tx: EntityManager): Promise<void>;
    moveToFolder(workflowIds: string[], toFolderId: string): Promise<void>;
}
export {};
