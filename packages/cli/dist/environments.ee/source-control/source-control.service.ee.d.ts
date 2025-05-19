import type { PullWorkFolderRequestDto, PushWorkFolderRequestDto, SourceControlledFile } from '@n8n/api-types';
import type { Variables, TagEntity, User } from '@n8n/db';
import { FolderRepository, TagRepository } from '@n8n/db';
import { Logger } from 'n8n-core';
import type { PushResult } from 'simple-git';
import { EventService } from '../../events/event.service';
import { SourceControlExportService } from './source-control-export.service.ee';
import { SourceControlGitService } from './source-control-git.service.ee';
import { SourceControlImportService } from './source-control-import.service.ee';
import { SourceControlPreferencesService } from './source-control-preferences.service.ee';
import type { ExportableCredential } from './types/exportable-credential';
import type { ExportableFolder } from './types/exportable-folders';
import type { ImportResult } from './types/import-result';
import type { SourceControlGetStatus } from './types/source-control-get-status';
import type { SourceControlPreferences } from './types/source-control-preferences';
import type { SourceControlWorkflowVersionId } from './types/source-control-workflow-version-id';
export declare class SourceControlService {
    private readonly logger;
    private gitService;
    private sourceControlPreferencesService;
    private sourceControlExportService;
    private sourceControlImportService;
    private tagRepository;
    private folderRepository;
    private readonly eventService;
    private sshKeyName;
    private sshFolder;
    private gitFolder;
    constructor(logger: Logger, gitService: SourceControlGitService, sourceControlPreferencesService: SourceControlPreferencesService, sourceControlExportService: SourceControlExportService, sourceControlImportService: SourceControlImportService, tagRepository: TagRepository, folderRepository: FolderRepository, eventService: EventService);
    init(): Promise<void>;
    private initGitService;
    sanityCheck(): Promise<void>;
    disconnect(options?: {
        keepKeyPair?: boolean;
    }): Promise<SourceControlPreferences>;
    initializeRepository(preferences: SourceControlPreferences, user: User): Promise<{
        branches: string[];
        currentBranch: string;
    }>;
    getBranches(): Promise<{
        branches: string[];
        currentBranch: string;
    }>;
    setBranch(branch: string): Promise<{
        branches: string[];
        currentBranch: string;
    }>;
    resetWorkfolder(): Promise<ImportResult | undefined>;
    pushWorkfolder(user: User, options: PushWorkFolderRequestDto): Promise<{
        statusCode: number;
        pushResult: PushResult | undefined;
        statusResult: SourceControlledFile[];
    }>;
    private getConflicts;
    private getWorkflowsToImport;
    private getWorkflowsToDelete;
    private getCredentialsToImport;
    private getCredentialsToDelete;
    private getTagsToImport;
    private getTagsToDelete;
    private getVariablesToImport;
    private getFoldersToImport;
    private getFoldersToDelete;
    private getVariablesToDelete;
    pullWorkfolder(user: User, options: PullWorkFolderRequestDto): Promise<{
        statusCode: number;
        statusResult: SourceControlledFile[];
    }>;
    getStatus(user: User, options: SourceControlGetStatus): Promise<{
        type: "workflow" | "credential" | "file" | "tags" | "variables" | "folders";
        status: "unknown" | "new" | "modified" | "deleted" | "created" | "renamed" | "conflicted" | "ignored" | "staged";
        id: string;
        file: string;
        name: string;
        location: "local" | "remote";
        conflict: boolean;
        updatedAt: string;
        pushed?: boolean | undefined;
    }[] | {
        wfRemoteVersionIds: SourceControlWorkflowVersionId[];
        wfLocalVersionIds: SourceControlWorkflowVersionId[];
        wfMissingInLocal: SourceControlWorkflowVersionId[];
        wfMissingInRemote: SourceControlWorkflowVersionId[];
        wfModifiedInEither: SourceControlWorkflowVersionId[];
        credMissingInLocal: (ExportableCredential & {
            filename: string;
        })[];
        credMissingInRemote: (ExportableCredential & {
            filename: string;
        })[];
        credModifiedInEither: (ExportableCredential & {
            filename: string;
        })[];
        varMissingInLocal: Variables[];
        varMissingInRemote: Variables[];
        varModifiedInEither: Variables[];
        tagsMissingInLocal: TagEntity[];
        tagsMissingInRemote: TagEntity[];
        tagsModifiedInEither: TagEntity[];
        mappingsMissingInLocal: import("@n8n/db").WorkflowTagMapping[];
        mappingsMissingInRemote: import("@n8n/db").WorkflowTagMapping[];
        foldersMissingInLocal: ExportableFolder[];
        foldersMissingInRemote: ExportableFolder[];
        foldersModifiedInEither: ExportableFolder[];
        sourceControlledFiles: {
            type: "workflow" | "credential" | "file" | "tags" | "variables" | "folders";
            status: "unknown" | "new" | "modified" | "deleted" | "created" | "renamed" | "conflicted" | "ignored" | "staged";
            id: string;
            file: string;
            name: string;
            location: "local" | "remote";
            conflict: boolean;
            updatedAt: string;
            pushed?: boolean | undefined;
        }[];
    }>;
    private getStatusWorkflows;
    private getStatusCredentials;
    private getStatusVariables;
    private getStatusTagsMappings;
    private getStatusFoldersMapping;
    setGitUserDetails(name?: string, email?: string): Promise<void>;
}
