import type { CredentialsEntity, User, WorkflowWithSharingsAndCredentials, WorkflowWithSharingsMetaDataAndCredentials } from '@n8n/db';
import { SharedWorkflow, CredentialsRepository, FolderRepository, SharedWorkflowRepository, WorkflowRepository } from '@n8n/db';
import { type EntityManager } from '@n8n/typeorm';
import { Logger } from 'n8n-core';
import type { IWorkflowBase, WorkflowId } from 'n8n-workflow';
import { ActiveWorkflowManager } from '../active-workflow-manager';
import { CredentialsFinderService } from '../credentials/credentials-finder.service';
import { CredentialsService } from '../credentials/credentials.service';
import { EnterpriseCredentialsService } from '../credentials/credentials.service.ee';
import { FolderService } from '../services/folder.service';
import { OwnershipService } from '../services/ownership.service';
import { ProjectService } from '../services/project.service.ee';
import { WorkflowFinderService } from './workflow-finder.service';
export declare class EnterpriseWorkflowService {
    private readonly logger;
    private readonly sharedWorkflowRepository;
    private readonly workflowRepository;
    private readonly credentialsRepository;
    private readonly credentialsService;
    private readonly ownershipService;
    private readonly projectService;
    private readonly activeWorkflowManager;
    private readonly credentialsFinderService;
    private readonly enterpriseCredentialsService;
    private readonly workflowFinderService;
    private readonly folderService;
    private readonly folderRepository;
    constructor(logger: Logger, sharedWorkflowRepository: SharedWorkflowRepository, workflowRepository: WorkflowRepository, credentialsRepository: CredentialsRepository, credentialsService: CredentialsService, ownershipService: OwnershipService, projectService: ProjectService, activeWorkflowManager: ActiveWorkflowManager, credentialsFinderService: CredentialsFinderService, enterpriseCredentialsService: EnterpriseCredentialsService, workflowFinderService: WorkflowFinderService, folderService: FolderService, folderRepository: FolderRepository);
    shareWithProjects(workflowId: WorkflowId, shareWithIds: string[], entityManager: EntityManager): Promise<SharedWorkflow[]>;
    addOwnerAndSharings(workflow: WorkflowWithSharingsAndCredentials): WorkflowWithSharingsMetaDataAndCredentials;
    addCredentialsToWorkflow(workflow: WorkflowWithSharingsMetaDataAndCredentials, currentUser: User): Promise<void>;
    validateCredentialPermissionsToUser(workflow: IWorkflowBase, allowedCredentials: CredentialsEntity[]): void;
    preventTampering<T extends IWorkflowBase>(workflow: T, workflowId: string, user: User): Promise<T>;
    validateWorkflowCredentialUsage<T extends IWorkflowBase>(newWorkflowVersion: T, previousWorkflowVersion: IWorkflowBase, credentialsUserHasAccessTo: Array<{
        id: string;
    }>): T;
    getNodesWithInaccessibleCreds(workflow: IWorkflowBase, userCredIds: string[]): import("n8n-workflow").INode[];
    transferWorkflow(user: User, workflowId: string, destinationProjectId: string, shareCredentials?: string[], destinationParentFolderId?: string): Promise<{
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
    transferFolder(user: User, sourceProjectId: string, sourceFolderId: string, destinationProjectId: string, destinationParentFolderId: string, shareCredentials?: string[]): Promise<void>;
    private formatActivationError;
    private attemptWorkflowReactivation;
    private transferWorkflowOwnership;
    private shareCredentialsWithProject;
    private moveFoldersToDestination;
}
