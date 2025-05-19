import type { User } from '@n8n/db';
import { ProjectRelationRepository, SharedWorkflowRepository } from '@n8n/db';
import { type ProjectRole, type WorkflowSharingRole, type Scope } from '@n8n/permissions';
import { RoleService } from '../services/role.service';
export type ShareWorkflowOptions = {
    scopes: Scope[];
    projectId?: string;
} | {
    projectRoles: ProjectRole[];
    workflowRoles: WorkflowSharingRole[];
    projectId?: string;
};
export declare class WorkflowSharingService {
    private readonly sharedWorkflowRepository;
    private readonly roleService;
    private readonly projectRelationRepository;
    constructor(sharedWorkflowRepository: SharedWorkflowRepository, roleService: RoleService, projectRelationRepository: ProjectRelationRepository);
    getSharedWorkflowIds(user: User, options: ShareWorkflowOptions): Promise<string[]>;
    getSharedWithMeIds(user: User): Promise<string[]>;
    getSharedWorkflowScopes(workflowIds: string[], user: User): Promise<Array<[string, Scope[]]>>;
    getOwnedWorkflowsInPersonalProject(user: User): Promise<string[]>;
}
