import type { Project } from '@n8n/db';
import { WorkflowOperationError } from 'n8n-workflow';
import type { INode } from 'n8n-workflow';
type Options = {
    subworkflowId: string;
    subworkflowProject: Project;
    hasReadAccess: boolean;
    instanceUrl: string;
    ownerName?: string;
    node?: INode;
};
export declare const SUBWORKFLOW_DENIAL_BASE_DESCRIPTION = "The sub-workflow you\u2019re trying to execute limits which workflows it can be called by.";
export declare class SubworkflowPolicyDenialError extends WorkflowOperationError {
    constructor({ subworkflowId, subworkflowProject, instanceUrl, hasReadAccess, ownerName, node, }: Options);
}
export {};
