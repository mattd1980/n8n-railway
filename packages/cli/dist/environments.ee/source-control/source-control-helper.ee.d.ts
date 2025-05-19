import type { SourceControlledFile } from '@n8n/api-types';
import type { KeyPairType } from './types/key-pair-type';
import type { SourceControlWorkflowVersionId } from './types/source-control-workflow-version-id';
export declare function stringContainsExpression(testString: string): boolean;
export declare function getWorkflowExportPath(workflowId: string, workflowExportFolder: string): string;
export declare function getCredentialExportPath(credentialId: string, credentialExportFolder: string): string;
export declare function getVariablesPath(gitFolder: string): string;
export declare function getTagsPath(gitFolder: string): string;
export declare function getFoldersPath(gitFolder: string): string;
export declare function sourceControlFoldersExistCheck(folders: string[], createIfNotExists?: boolean): boolean;
export declare function isSourceControlLicensed(): boolean;
export declare function generateSshKeyPair(keyType: KeyPairType): Promise<{
    privateKey: string;
    publicKey: string;
}>;
export declare function getRepoType(repoUrl: string): 'github' | 'gitlab' | 'other';
export declare function getTrackingInformationFromPullResult(userId: string, result: SourceControlledFile[]): {
    userId: string;
    credConflicts: number;
    workflowConflicts: number;
    workflowUpdates: number;
};
export declare function getTrackingInformationFromPrePushResult(userId: string, result: SourceControlledFile[]): {
    userId: string;
    workflowsEligible: number;
    workflowsEligibleWithConflicts: number;
    credsEligible: number;
    credsEligibleWithConflicts: number;
    variablesEligible: number;
};
export declare function getTrackingInformationFromPostPushResult(userId: string, result: SourceControlledFile[]): {
    userId: string;
    workflowsPushed: number;
    workflowsEligible: number;
    credsPushed: number;
    variablesPushed: number;
};
export declare function normalizeAndValidateSourceControlledFilePath(gitFolderPath: string, filePath: string): string;
export declare function isWorkflowModified(local: SourceControlWorkflowVersionId, remote: SourceControlWorkflowVersionId): boolean;
