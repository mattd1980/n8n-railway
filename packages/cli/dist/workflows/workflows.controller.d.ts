import { ImportWorkflowFromUrlDto, ManualRunQueryDto, TransferWorkflowBodyDto } from '@n8n/api-types';
import { GlobalConfig } from '@n8n/config';
import { SharedWorkflow, WorkflowEntity, ProjectRelationRepository, ProjectRepository, TagRepository, SharedWorkflowRepository, WorkflowRepository } from '@n8n/db';
import express from 'express';
import { Logger } from 'n8n-core';
import { EventService } from '../events/event.service';
import { ExternalHooks } from '../external-hooks';
import type { IWorkflowResponse } from '../interfaces';
import { License } from '../license';
import { AuthenticatedRequest } from '../requests';
import { FolderService } from '../services/folder.service';
import { NamingService } from '../services/naming.service';
import { ProjectService } from '../services/project.service.ee';
import { TagService } from '../services/tag.service';
import { UserManagementMailer } from '../user-management/email';
import { WorkflowExecutionService } from './workflow-execution.service';
import { WorkflowFinderService } from './workflow-finder.service';
import { WorkflowHistoryService } from './workflow-history.ee/workflow-history.service.ee';
import { WorkflowRequest } from './workflow.request';
import { WorkflowService } from './workflow.service';
import { EnterpriseWorkflowService } from './workflow.service.ee';
import { CredentialsService } from '../credentials/credentials.service';
export declare class WorkflowsController {
    private readonly logger;
    private readonly externalHooks;
    private readonly tagRepository;
    private readonly enterpriseWorkflowService;
    private readonly workflowHistoryService;
    private readonly tagService;
    private readonly namingService;
    private readonly workflowRepository;
    private readonly workflowService;
    private readonly workflowExecutionService;
    private readonly sharedWorkflowRepository;
    private readonly license;
    private readonly mailer;
    private readonly credentialsService;
    private readonly projectRepository;
    private readonly projectService;
    private readonly projectRelationRepository;
    private readonly eventService;
    private readonly globalConfig;
    private readonly folderService;
    private readonly workflowFinderService;
    constructor(logger: Logger, externalHooks: ExternalHooks, tagRepository: TagRepository, enterpriseWorkflowService: EnterpriseWorkflowService, workflowHistoryService: WorkflowHistoryService, tagService: TagService, namingService: NamingService, workflowRepository: WorkflowRepository, workflowService: WorkflowService, workflowExecutionService: WorkflowExecutionService, sharedWorkflowRepository: SharedWorkflowRepository, license: License, mailer: UserManagementMailer, credentialsService: CredentialsService, projectRepository: ProjectRepository, projectService: ProjectService, projectRelationRepository: ProjectRelationRepository, eventService: EventService, globalConfig: GlobalConfig, folderService: FolderService, workflowFinderService: WorkflowFinderService);
    create(req: WorkflowRequest.Create): Promise<{
        scopes: import("@n8n/permissions").Scope[];
        homeProject?: import("@n8n/db").SlimProject | null;
        sharedWithProjects: import("@n8n/db").SlimProject[];
        usedCredentials?: import("@n8n/db").CredentialUsedByWorkflow[];
        tags?: import("@n8n/db").TagEntity[] | undefined;
        id: string;
        name: string;
        setUpdateDate: () => void;
        settings?: import("n8n-workflow").IWorkflowSettings | undefined;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        versionId: string;
        generateId: () => void;
        nodes: import("n8n-workflow").INode[];
        connections: import("n8n-workflow").IConnections;
        isArchived: boolean;
        parentFolder: import("@n8n/db").Folder | null;
        pinData?: import("@n8n/db/dist/entities/workflow-entity").ISimplifiedPinData | undefined;
        staticData?: import("n8n-workflow").IDataObject | undefined;
        meta?: import("n8n-workflow").WorkflowFEMeta | undefined;
        tagMappings: import("@n8n/db").WorkflowTagMapping[];
        statistics: import("@n8n/db").WorkflowStatistics[];
        triggerCount: number;
    }>;
    getAll(req: WorkflowRequest.GetMany, res: express.Response): Promise<void>;
    getNewName(req: WorkflowRequest.NewName): Promise<{
        name: string;
    }>;
    getFromUrl(_req: AuthenticatedRequest, _res: express.Response, query: ImportWorkflowFromUrlDto): Promise<IWorkflowResponse>;
    getWorkflow(req: WorkflowRequest.Get): Promise<{
        scopes: import("@n8n/permissions").Scope[];
        homeProject?: import("@n8n/db").SlimProject | null;
        sharedWithProjects: import("@n8n/db").SlimProject[];
        usedCredentials?: import("@n8n/db").CredentialUsedByWorkflow[];
        tags?: import("@n8n/db").TagEntity[] | undefined;
        id: string;
        name: string;
        setUpdateDate: () => void;
        settings?: import("n8n-workflow").IWorkflowSettings | undefined;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        versionId: string;
        generateId: () => void;
        nodes: import("n8n-workflow").INode[];
        connections: import("n8n-workflow").IConnections;
        isArchived: boolean;
        parentFolder: import("@n8n/db").Folder | null;
        pinData?: import("@n8n/db/dist/entities/workflow-entity").ISimplifiedPinData | undefined;
        staticData?: import("n8n-workflow").IDataObject | undefined;
        meta?: import("n8n-workflow").WorkflowFEMeta | undefined;
        tagMappings: import("@n8n/db").WorkflowTagMapping[];
        statistics: import("@n8n/db").WorkflowStatistics[];
        triggerCount: number;
    } | {
        scopes: import("@n8n/permissions").Scope[];
        name: string;
        active: boolean;
        isArchived: boolean;
        nodes: import("n8n-workflow").INode[];
        connections: import("n8n-workflow").IConnections;
        settings?: import("n8n-workflow").IWorkflowSettings;
        staticData?: import("n8n-workflow").IDataObject;
        meta?: import("n8n-workflow").WorkflowFEMeta;
        tags?: import("@n8n/db").TagEntity[];
        tagMappings: import("@n8n/db").WorkflowTagMapping[];
        shared: SharedWorkflow[];
        statistics: import("@n8n/db").WorkflowStatistics[];
        pinData?: import("@n8n/db/dist/entities/workflow-entity").ISimplifiedPinData;
        versionId: string;
        triggerCount: number;
        parentFolder: import("@n8n/db").Folder | null;
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
    update(req: WorkflowRequest.Update): Promise<{
        scopes: import("@n8n/permissions").Scope[];
        name: string;
        active: boolean;
        isArchived: boolean;
        nodes: import("n8n-workflow").INode[];
        connections: import("n8n-workflow").IConnections;
        settings?: import("n8n-workflow").IWorkflowSettings;
        staticData?: import("n8n-workflow").IDataObject;
        meta?: import("n8n-workflow").WorkflowFEMeta;
        tags?: import("@n8n/db").TagEntity[];
        tagMappings: import("@n8n/db").WorkflowTagMapping[];
        shared: SharedWorkflow[];
        statistics: import("@n8n/db").WorkflowStatistics[];
        pinData?: import("@n8n/db/dist/entities/workflow-entity").ISimplifiedPinData;
        versionId: string;
        triggerCount: number;
        parentFolder: import("@n8n/db").Folder | null;
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
    delete(req: AuthenticatedRequest, _res: Response, workflowId: string): Promise<boolean>;
    archive(req: AuthenticatedRequest, _res: Response, workflowId: string): Promise<WorkflowEntity>;
    unarchive(req: AuthenticatedRequest, _res: Response, workflowId: string): Promise<WorkflowEntity>;
    runManually(req: WorkflowRequest.ManualRun, _res: unknown, query: ManualRunQueryDto): Promise<{
        waitingForWebhook: boolean;
        executionId?: undefined;
    } | {
        executionId: string;
        waitingForWebhook?: undefined;
    }>;
    share(req: WorkflowRequest.Share): Promise<void>;
    transfer(req: AuthenticatedRequest, _res: unknown, workflowId: string, body: TransferWorkflowBodyDto): Promise<{
        error: {
            message: string;
            lineNumber: number | undefined;
            timestamp: number;
            name: string;
            description: string | null | undefined;
            context: import("n8n-workflow").IDataObject;
            cause: Error | undefined;
        } | {
            name: string;
            message: string;
        };
    } | undefined>;
}
