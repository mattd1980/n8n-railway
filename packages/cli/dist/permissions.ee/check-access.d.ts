import type { User } from '@n8n/db';
import { type Scope } from '@n8n/permissions';
export declare function userHasScopes(user: User, scopes: Scope[], globalOnly: boolean, { credentialId, workflowId, projectId, }: {
    credentialId?: string;
    workflowId?: string;
    projectId?: string;
}): Promise<boolean>;
