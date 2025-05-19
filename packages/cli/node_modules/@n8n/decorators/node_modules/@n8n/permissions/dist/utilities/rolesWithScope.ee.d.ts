import type { CredentialSharingRole, GlobalRole, ProjectRole, Scope, WorkflowSharingRole } from '../types.ee';
export declare function rolesWithScope(namespace: 'global', scopes: Scope | Scope[]): GlobalRole[];
export declare function rolesWithScope(namespace: 'project', scopes: Scope | Scope[]): ProjectRole[];
export declare function rolesWithScope(namespace: 'credential', scopes: Scope | Scope[]): CredentialSharingRole[];
export declare function rolesWithScope(namespace: 'workflow', scopes: Scope | Scope[]): WorkflowSharingRole[];
