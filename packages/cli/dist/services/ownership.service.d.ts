import type { Project, User, ListQueryDb } from '@n8n/db';
import { ProjectRelationRepository, ProjectRepository, SharedWorkflowRepository, UserRepository } from '@n8n/db';
import { CacheService } from '../services/cache/cache.service';
export declare class OwnershipService {
    private cacheService;
    private userRepository;
    private projectRepository;
    private projectRelationRepository;
    private sharedWorkflowRepository;
    constructor(cacheService: CacheService, userRepository: UserRepository, projectRepository: ProjectRepository, projectRelationRepository: ProjectRelationRepository, sharedWorkflowRepository: SharedWorkflowRepository);
    getWorkflowProjectCached(workflowId: string): Promise<Project>;
    getPersonalProjectOwnerCached(projectId: string): Promise<User | null>;
    addOwnedByAndSharedWith(rawWorkflow: ListQueryDb.Workflow.WithSharing): ListQueryDb.Workflow.WithOwnedByAndSharedWith;
    addOwnedByAndSharedWith(rawCredential: ListQueryDb.Credentials.WithSharing): ListQueryDb.Credentials.WithOwnedByAndSharedWith;
    getInstanceOwner(): Promise<User>;
}
