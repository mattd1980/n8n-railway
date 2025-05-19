import type { WorkflowSharingRole } from '@n8n/permissions';
import { DataSource, Repository } from '@n8n/typeorm';
import type { EntityManager, FindManyOptions, FindOptionsWhere } from '@n8n/typeorm';
import type { Project } from '../entities';
import { SharedWorkflow } from '../entities';
export declare class SharedWorkflowRepository extends Repository<SharedWorkflow> {
    constructor(dataSource: DataSource);
    getSharedWorkflowIds(workflowIds: string[]): Promise<string[]>;
    findByWorkflowIds(workflowIds: string[]): Promise<SharedWorkflow[]>;
    findSharingRole(userId: string, workflowId: string): Promise<WorkflowSharingRole | undefined>;
    makeOwnerOfAllWorkflows(project: Project): Promise<import("@n8n/typeorm").UpdateResult>;
    makeOwner(workflowIds: string[], projectId: string, trx?: EntityManager): Promise<import("@n8n/typeorm").InsertResult>;
    findWithFields(workflowIds: string[], { select }: Pick<FindManyOptions<SharedWorkflow>, 'select'>): Promise<SharedWorkflow[]>;
    deleteByIds(sharedWorkflowIds: string[], projectId: string, trx?: EntityManager): Promise<import("@n8n/typeorm").DeleteResult>;
    findProjectIds(workflowId: string): Promise<string[]>;
    getWorkflowOwningProject(workflowId: string): Promise<Project | undefined>;
    getRelationsByWorkflowIdsAndProjectIds(workflowIds: string[], projectIds: string[]): Promise<SharedWorkflow[]>;
    getAllRelationsForWorkflows(workflowIds: string[]): Promise<SharedWorkflow[]>;
    findWorkflowWithOptions(workflowId: string, options?: {
        where?: FindOptionsWhere<SharedWorkflow>;
        includeTags?: boolean;
        includeParentFolder?: boolean;
        em?: EntityManager;
    }): Promise<SharedWorkflow | null>;
}
