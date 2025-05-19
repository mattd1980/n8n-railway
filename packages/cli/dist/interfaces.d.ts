import type { ICredentialsBase, IExecutionBase, IExecutionDb, ITagBase } from '@n8n/db';
import type { AssignableGlobalRole } from '@n8n/permissions';
import type { Application } from 'express';
import type { ExecutionError, ICredentialDataDecryptedObject, ICredentialsDecrypted, IDeferredPromise, IExecuteResponsePromiseData, IRun, ITelemetryTrackProperties, IWorkflowBase, CredentialLoadingDetails, WorkflowExecuteMode, ExecutionStatus, ExecutionSummary, IWorkflowExecutionDataProcess } from 'n8n-workflow';
import type PCancelable from 'p-cancelable';
import type { ActiveWorkflowManager } from './active-workflow-manager';
import type { ExternalHooks } from './external-hooks';
export interface ICredentialsTypeData {
    [key: string]: CredentialLoadingDetails;
}
export interface ICredentialsOverwrite {
    [key: string]: ICredentialDataDecryptedObject;
}
export interface ITagToImport extends ITagBase {
    createdAt?: string;
    updatedAt?: string;
}
export interface IWorkflowResponse extends IWorkflowBase {
    id: string;
}
export interface IWorkflowToImport extends Omit<IWorkflowBase, 'staticData' | 'pinData' | 'createdAt' | 'updatedAt'> {
    owner: {
        type: 'personal';
        personalEmail: string;
    };
    parentFolderId: string | null;
}
export type ICredentialsDecryptedDb = ICredentialsBase & ICredentialsDecrypted;
export type ICredentialsDecryptedResponse = ICredentialsDecryptedDb;
export type SaveExecutionDataType = 'all' | 'none';
export type UpdateExecutionPayload = Omit<IExecutionDb, 'id' | 'createdAt'>;
export interface IExecutionFlatted extends IExecutionBase {
    data: string;
    workflowData: IWorkflowBase;
}
export interface IExecutionFlattedResponse extends IExecutionFlatted {
    id: string;
    retryOf?: string;
}
export interface IExecutionsListResponse {
    count: number;
    results: ExecutionSummary[];
    estimated: boolean;
}
export interface ExecutionStopResult {
    finished?: boolean;
    mode: WorkflowExecuteMode;
    startedAt: Date;
    stoppedAt?: Date;
    status: ExecutionStatus;
}
export interface IExecutionsCurrentSummary {
    id: string;
    retryOf?: string;
    startedAt: Date;
    mode: WorkflowExecuteMode;
    workflowId: string;
    status: ExecutionStatus;
}
export interface IExecutingWorkflowData {
    executionData: IWorkflowExecutionDataProcess;
    startedAt: Date;
    postExecutePromise: IDeferredPromise<IRun | undefined>;
    responsePromise?: IDeferredPromise<IExecuteResponsePromiseData>;
    workflowExecution?: PCancelable<IRun>;
    status: ExecutionStatus;
}
export interface IActiveDirectorySettings {
    enabled: boolean;
}
export interface IPackageVersions {
    cli: string;
}
export interface IWorkflowErrorData {
    [key: string]: any;
    execution?: {
        id?: string;
        url?: string;
        retryOf?: string;
        error: ExecutionError;
        lastNodeExecuted: string;
        mode: WorkflowExecuteMode;
    };
    trigger?: {
        error: ExecutionError;
        mode: WorkflowExecuteMode;
    };
    workflow: {
        id?: string;
        name: string;
    };
}
export interface IWorkflowStatisticsDataLoaded {
    dataLoaded: boolean;
}
export declare namespace CommunityPackages {
    type ParsedPackageName = {
        packageName: string;
        rawString: string;
        scope?: string;
        version?: string;
    };
    type AvailableUpdates = {
        [packageName: string]: {
            current: string;
            wanted: string;
            latest: string;
            location: string;
        };
    };
    type PackageStatusCheck = {
        status: 'OK' | 'Banned';
        reason?: string;
    };
}
export interface IExecutionTrackProperties extends ITelemetryTrackProperties {
    workflow_id: string;
    success: boolean;
    error_node_type?: string;
    is_manual: boolean;
}
export interface ILicenseReadResponse {
    usage: {
        activeWorkflowTriggers: {
            limit: number;
            value: number;
            warningThreshold: number;
        };
    };
    license: {
        planId: string;
        planName: string;
    };
}
export interface ILicensePostResponse extends ILicenseReadResponse {
    managementToken: string;
}
export interface Invitation {
    email: string;
    role: AssignableGlobalRole;
}
export interface N8nApp {
    app: Application;
    restEndpoint: string;
    externalHooks: ExternalHooks;
    activeWorkflowManager: ActiveWorkflowManager;
}
