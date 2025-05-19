import type { z } from 'zod';
import type { RESOURCES, API_KEY_RESOURCES } from './constants.ee';
import type { assignableGlobalRoleSchema, credentialSharingRoleSchema, globalRoleSchema, projectRoleSchema, roleNamespaceSchema, workflowSharingRoleSchema } from './schemas.ee';
export type Resource = keyof typeof RESOURCES;
type ResourceScope<R extends Resource, Operation extends (typeof RESOURCES)[R][number] = (typeof RESOURCES)[R][number]> = `${R}:${Operation}`;
type WildcardScope = `${Resource}:*` | '*';
type AllScopesObject = {
    [R in Resource]: ResourceScope<R>;
};
export type Scope = AllScopesObject[Resource] | WildcardScope;
export type ScopeLevels = {
    global: Scope[];
    project?: Scope[];
    resource?: Scope[];
};
export type MaskLevels = {
    sharing: Scope[];
};
export type ScopeOptions = {
    mode: 'oneOf' | 'allOf';
};
export type RoleNamespace = z.infer<typeof roleNamespaceSchema>;
export type GlobalRole = z.infer<typeof globalRoleSchema>;
export type AssignableGlobalRole = z.infer<typeof assignableGlobalRoleSchema>;
export type CredentialSharingRole = z.infer<typeof credentialSharingRoleSchema>;
export type WorkflowSharingRole = z.infer<typeof workflowSharingRoleSchema>;
export type ProjectRole = z.infer<typeof projectRoleSchema>;
export type AllRoleTypes = GlobalRole | ProjectRole | WorkflowSharingRole | CredentialSharingRole;
type RoleObject<T extends AllRoleTypes> = {
    role: T;
    name: string;
    scopes: Scope[];
    licensed: boolean;
};
export type AllRolesMap = {
    global: Array<RoleObject<GlobalRole>>;
    project: Array<RoleObject<ProjectRole>>;
    credential: Array<RoleObject<CredentialSharingRole>>;
    workflow: Array<RoleObject<WorkflowSharingRole>>;
};
export type AuthPrincipal = {
    role: GlobalRole;
};
type PublicApiKeyResources = keyof typeof API_KEY_RESOURCES;
type ApiKeyResourceScope<R extends PublicApiKeyResources, Operation extends (typeof API_KEY_RESOURCES)[R][number] = (typeof API_KEY_RESOURCES)[R][number]> = `${R}:${Operation}`;
type AllApiKeyScopesObject = {
    [R in PublicApiKeyResources]: ApiKeyResourceScope<R>;
};
export type ApiKeyScope = AllApiKeyScopesObject[PublicApiKeyResources];
export {};
