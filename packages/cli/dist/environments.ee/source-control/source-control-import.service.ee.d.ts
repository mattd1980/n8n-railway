import type { SourceControlledFile } from '@n8n/api-types';
import type { Variables, TagEntity, User, WorkflowTagMapping } from '@n8n/db';
import { CredentialsRepository, FolderRepository, ProjectRepository, TagRepository, VariablesRepository, WorkflowTagMappingRepository, SharedCredentialsRepository, SharedWorkflowRepository, WorkflowRepository, UserRepository } from '@n8n/db';
import { ErrorReporter, InstanceSettings, Logger } from 'n8n-core';
import { ActiveWorkflowManager } from '../../active-workflow-manager';
import { CredentialsService } from '../../credentials/credentials.service';
import { TagService } from '../../services/tag.service';
import { WorkflowService } from '../../workflows/workflow.service';
import type { ExportableCredential } from './types/exportable-credential';
import type { ExportableFolder } from './types/exportable-folders';
import type { SourceControlWorkflowVersionId } from './types/source-control-workflow-version-id';
import { VariablesService } from '../variables/variables.service.ee';
export declare class SourceControlImportService {
    private readonly logger;
    private readonly errorReporter;
    private readonly variablesService;
    private readonly activeWorkflowManager;
    private readonly credentialsRepository;
    private readonly projectRepository;
    private readonly tagRepository;
    private readonly sharedWorkflowRepository;
    private readonly sharedCredentialsRepository;
    private readonly userRepository;
    private readonly variablesRepository;
    private readonly workflowRepository;
    private readonly workflowTagMappingRepository;
    private readonly workflowService;
    private readonly credentialsService;
    private readonly tagService;
    private readonly folderRepository;
    private gitFolder;
    private workflowExportFolder;
    private credentialExportFolder;
    constructor(logger: Logger, errorReporter: ErrorReporter, variablesService: VariablesService, activeWorkflowManager: ActiveWorkflowManager, credentialsRepository: CredentialsRepository, projectRepository: ProjectRepository, tagRepository: TagRepository, sharedWorkflowRepository: SharedWorkflowRepository, sharedCredentialsRepository: SharedCredentialsRepository, userRepository: UserRepository, variablesRepository: VariablesRepository, workflowRepository: WorkflowRepository, workflowTagMappingRepository: WorkflowTagMappingRepository, workflowService: WorkflowService, credentialsService: CredentialsService, tagService: TagService, folderRepository: FolderRepository, instanceSettings: InstanceSettings);
    getRemoteVersionIdsFromFiles(): Promise<SourceControlWorkflowVersionId[]>;
    getLocalVersionIdsFromDb(): Promise<SourceControlWorkflowVersionId[]>;
    getRemoteCredentialsFromFiles(): Promise<Array<ExportableCredential & {
        filename: string;
    }>>;
    getLocalCredentialsFromDb(): Promise<Array<ExportableCredential & {
        filename: string;
    }>>;
    getRemoteVariablesFromFile(): Promise<Variables[]>;
    getLocalVariablesFromDb(): Promise<Variables[]>;
    getRemoteFoldersAndMappingsFromFile(): Promise<{
        folders: ExportableFolder[];
    }>;
    getLocalFoldersAndMappingsFromDb(): Promise<{
        folders: ExportableFolder[];
    }>;
    getRemoteTagsAndMappingsFromFile(): Promise<{
        tags: TagEntity[];
        mappings: WorkflowTagMapping[];
    }>;
    getLocalTagsAndMappingsFromDb(): Promise<{
        tags: TagEntity[];
        mappings: WorkflowTagMapping[];
    }>;
    importWorkflowFromWorkFolder(candidates: SourceControlledFile[], userId: string): Promise<{
        id: string;
        name: string;
    }[]>;
    importCredentialsFromWorkFolder(candidates: SourceControlledFile[], userId: string): Promise<{
        id: string;
        name: string;
        type: string;
    }[]>;
    importTagsFromWorkFolder(candidate: SourceControlledFile): Promise<{
        tags: TagEntity[];
        mappings: WorkflowTagMapping[];
    } | undefined>;
    importFoldersFromWorkFolder(user: User, candidate: SourceControlledFile): Promise<{
        folders: ExportableFolder[];
    } | undefined>;
    importVariablesFromWorkFolder(candidate: SourceControlledFile, valueOverrides?: {
        [key: string]: string;
    }): Promise<{
        imported: string[];
    } | undefined>;
    deleteWorkflowsNotInWorkfolder(user: User, candidates: SourceControlledFile[]): Promise<void>;
    deleteCredentialsNotInWorkfolder(user: User, candidates: SourceControlledFile[]): Promise<void>;
    deleteVariablesNotInWorkfolder(candidates: SourceControlledFile[]): Promise<void>;
    deleteTagsNotInWorkfolder(candidates: SourceControlledFile[]): Promise<void>;
    deleteFoldersNotInWorkfolder(candidates: SourceControlledFile[]): Promise<void>;
    private findOrCreateOwnerProject;
}
