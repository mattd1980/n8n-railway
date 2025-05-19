import type { CredentialsEntity, SharedCredentials, SharedWorkflow, User, ListQueryDb, ScopesField, ProjectRelation } from '@n8n/db';
import type { Scope } from '@n8n/permissions';
import { License } from '../license';
export declare class RoleService {
    private readonly license;
    constructor(license: License);
    getAllRoles(): import("@n8n/permissions").AllRolesMap;
    addScopes(rawWorkflow: ListQueryDb.Workflow.WithSharing | ListQueryDb.Workflow.WithOwnedByAndSharedWith, user: User, userProjectRelations: ProjectRelation[]): ListQueryDb.Workflow.WithScopes;
    addScopes(rawCredential: CredentialsEntity, user: User, userProjectRelations: ProjectRelation[]): CredentialsEntity & ScopesField;
    addScopes(rawCredential: ListQueryDb.Credentials.WithSharing | ListQueryDb.Credentials.WithOwnedByAndSharedWith, user: User, userProjectRelations: ProjectRelation[]): ListQueryDb.Credentials.WithScopes;
    combineResourceScopes(type: 'workflow' | 'credential', user: User, shared: SharedCredentials[] | SharedWorkflow[], userProjectRelations: ProjectRelation[]): Scope[];
    private isRoleLicensed;
}
