import { PullWorkFolderRequestDto, PushWorkFolderRequestDto } from '@n8n/api-types';
import type { SourceControlledFile } from '@n8n/api-types';
import express from 'express';
import type { PullResult } from 'simple-git';
import { EventService } from '../../events/event.service';
import { AuthenticatedRequest } from '../../requests';
import { SourceControlPreferencesService } from './source-control-preferences.service.ee';
import { SourceControlService } from './source-control.service.ee';
import type { ImportResult } from './types/import-result';
import { SourceControlRequest } from './types/requests';
import type { SourceControlPreferences } from './types/source-control-preferences';
export declare class SourceControlController {
    private readonly sourceControlService;
    private readonly sourceControlPreferencesService;
    private readonly eventService;
    constructor(sourceControlService: SourceControlService, sourceControlPreferencesService: SourceControlPreferencesService, eventService: EventService);
    getPreferences(): Promise<SourceControlPreferences>;
    setPreferences(req: SourceControlRequest.UpdatePreferences): Promise<SourceControlPreferences>;
    updatePreferences(req: SourceControlRequest.UpdatePreferences): Promise<SourceControlPreferences>;
    disconnect(req: SourceControlRequest.Disconnect): Promise<SourceControlPreferences>;
    getBranches(): Promise<{
        branches: string[];
        currentBranch: string;
    }>;
    pushWorkfolder(req: AuthenticatedRequest, res: express.Response, payload: PushWorkFolderRequestDto): Promise<SourceControlledFile[]>;
    pullWorkfolder(req: AuthenticatedRequest, res: express.Response, payload: PullWorkFolderRequestDto): Promise<SourceControlledFile[] | ImportResult | PullResult | undefined>;
    resetWorkfolder(): Promise<ImportResult | undefined>;
    getStatus(req: SourceControlRequest.GetStatus): Promise<{
        type: "workflow" | "credential" | "file" | "tags" | "variables" | "folders";
        status: "unknown" | "new" | "modified" | "deleted" | "created" | "renamed" | "conflicted" | "ignored" | "staged";
        id: string;
        file: string;
        name: string;
        location: "local" | "remote";
        conflict: boolean;
        updatedAt: string;
        pushed?: boolean | undefined;
    }[]>;
    status(req: SourceControlRequest.GetStatus): Promise<{
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
        wfRemoteVersionIds: import("./types/source-control-workflow-version-id").SourceControlWorkflowVersionId[];
        wfLocalVersionIds: import("./types/source-control-workflow-version-id").SourceControlWorkflowVersionId[];
        wfMissingInLocal: import("./types/source-control-workflow-version-id").SourceControlWorkflowVersionId[];
        wfMissingInRemote: import("./types/source-control-workflow-version-id").SourceControlWorkflowVersionId[];
        wfModifiedInEither: import("./types/source-control-workflow-version-id").SourceControlWorkflowVersionId[];
        credMissingInLocal: (import("./types/exportable-credential").ExportableCredential & {
            filename: string;
        })[];
        credMissingInRemote: (import("./types/exportable-credential").ExportableCredential & {
            filename: string;
        })[];
        credModifiedInEither: (import("./types/exportable-credential").ExportableCredential & {
            filename: string;
        })[];
        varMissingInLocal: import("@n8n/db").Variables[];
        varMissingInRemote: import("@n8n/db").Variables[];
        varModifiedInEither: import("@n8n/db").Variables[];
        tagsMissingInLocal: import("@n8n/db").TagEntity[];
        tagsMissingInRemote: import("@n8n/db").TagEntity[];
        tagsModifiedInEither: import("@n8n/db").TagEntity[];
        mappingsMissingInLocal: import("@n8n/db").WorkflowTagMapping[];
        mappingsMissingInRemote: import("@n8n/db").WorkflowTagMapping[];
        foldersMissingInLocal: import("./types/exportable-folders").ExportableFolder[];
        foldersMissingInRemote: import("./types/exportable-folders").ExportableFolder[];
        foldersModifiedInEither: import("./types/exportable-folders").ExportableFolder[];
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
    generateKeyPair(req: SourceControlRequest.GenerateKeyPair): Promise<SourceControlPreferences>;
}
