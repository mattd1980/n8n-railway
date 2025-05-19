import { GlobalConfig } from '@n8n/config';
import type { User, WorkflowEntity } from '@n8n/db';
import { ExecutionRepository, FolderRepository, WorkflowTagMappingRepository, SharedWorkflowRepository, WorkflowRepository } from '@n8n/db';
import type { Scope } from '@n8n/permissions';
import type { EntityManager } from '@n8n/typeorm';
import { BinaryDataService, Logger } from 'n8n-core';
import { ActiveWorkflowManager } from '../active-workflow-manager';
import { EventService } from '../events/event.service';
import { ExternalHooks } from '../external-hooks';
import type { ListQuery } from '../requests';
import { OwnershipService } from '../services/ownership.service';
import { ProjectService } from '../services/project.service.ee';
import { RoleService } from '../services/role.service';
import { TagService } from '../services/tag.service';
import { WorkflowFinderService } from './workflow-finder.service';
import { WorkflowHistoryService } from './workflow-history.ee/workflow-history.service.ee';
import { WorkflowSharingService } from './workflow-sharing.service';
export declare class WorkflowService {
    private readonly logger;
    private readonly sharedWorkflowRepository;
    private readonly workflowRepository;
    private readonly workflowTagMappingRepository;
    private readonly binaryDataService;
    private readonly ownershipService;
    private readonly tagService;
    private readonly workflowHistoryService;
    private readonly externalHooks;
    private readonly activeWorkflowManager;
    private readonly roleService;
    private readonly workflowSharingService;
    private readonly projectService;
    private readonly executionRepository;
    private readonly eventService;
    private readonly globalConfig;
    private readonly folderRepository;
    private readonly workflowFinderService;
    constructor(logger: Logger, sharedWorkflowRepository: SharedWorkflowRepository, workflowRepository: WorkflowRepository, workflowTagMappingRepository: WorkflowTagMappingRepository, binaryDataService: BinaryDataService, ownershipService: OwnershipService, tagService: TagService, workflowHistoryService: WorkflowHistoryService, externalHooks: ExternalHooks, activeWorkflowManager: ActiveWorkflowManager, roleService: RoleService, workflowSharingService: WorkflowSharingService, projectService: ProjectService, executionRepository: ExecutionRepository, eventService: EventService, globalConfig: GlobalConfig, folderRepository: FolderRepository, workflowFinderService: WorkflowFinderService);
    getMany(user: User, options?: ListQuery.Options, includeScopes?: boolean, includeFolders?: boolean, onlySharedWithMe?: boolean): Promise<{
        workflows: ((Pick<WorkflowEntity, "id"> & Partial<Pick<WorkflowEntity, "tags" | "name" | "createdAt" | "updatedAt" | "active" | "versionId">>) | (import("@n8n/db").Folder & {
            workflowCount?: boolean;
            subFolderCount?: number;
        } & {
            resource: import("@n8n/db").ResourceType;
        }))[];
        count: number;
    }>;
    private processSharedWorkflows;
    private addSharedRelation;
    private addUserScopes;
    private cleanupSharedField;
    private mergeProcessedWorkflows;
    update(user: User, workflowUpdateData: WorkflowEntity, workflowId: string, tagIds?: string[], parentFolderId?: string, forceSave?: boolean): Promise<WorkflowEntity>;
    delete(user: User, workflowId: string, force?: boolean): Promise<WorkflowEntity | undefined>;
    archive(user: User, workflowId: string, skipArchived?: boolean): Promise<WorkflowEntity | undefined>;
    unarchive(user: User, workflowId: string): Promise<WorkflowEntity | undefined>;
    getWorkflowScopes(user: User, workflowId: string): Promise<Scope[]>;
    transferAll(fromProjectId: string, toProjectId: string, trx?: EntityManager): Promise<void>;
}
