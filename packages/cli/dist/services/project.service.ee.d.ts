import type { CreateProjectDto, ProjectType, UpdateProjectDto } from '@n8n/api-types';
import type { User } from '@n8n/db';
import { Project, ProjectRelation, ProjectRelationRepository, ProjectRepository, SharedCredentialsRepository, SharedWorkflowRepository } from '@n8n/db';
import { type Scope, type ProjectRole } from '@n8n/permissions';
import type { EntityManager } from '@n8n/typeorm';
import { UserError } from 'n8n-workflow';
import { License } from '../license';
import { CacheService } from './cache/cache.service';
export declare class TeamProjectOverQuotaError extends UserError {
    constructor(limit: number);
}
export declare class UnlicensedProjectRoleError extends UserError {
    constructor(role: ProjectRole);
}
export declare class ProjectService {
    private readonly sharedWorkflowRepository;
    private readonly projectRepository;
    private readonly projectRelationRepository;
    private readonly sharedCredentialsRepository;
    private readonly cacheService;
    private readonly license;
    constructor(sharedWorkflowRepository: SharedWorkflowRepository, projectRepository: ProjectRepository, projectRelationRepository: ProjectRelationRepository, sharedCredentialsRepository: SharedCredentialsRepository, cacheService: CacheService, license: License);
    private get workflowService();
    private get credentialsService();
    private get folderService();
    deleteProject(user: User, projectId: string, { migrateToProject }?: {
        migrateToProject?: string;
    }): Promise<void>;
    findProjectsWorkflowIsIn(workflowId: string): Promise<string[]>;
    getAccessibleProjects(user: User): Promise<Project[]>;
    getPersonalProjectOwners(projectIds: string[]): Promise<ProjectRelation[]>;
    createTeamProject(adminUser: User, data: CreateProjectDto): Promise<Project>;
    updateProject(projectId: string, data: Pick<UpdateProjectDto, 'name' | 'icon'>): Promise<Project>;
    getPersonalProject(user: User): Promise<Project | null>;
    getProjectRelationsForUser(user: User): Promise<ProjectRelation[]>;
    syncProjectRelations(projectId: string, relations: Array<{
        userId: string;
        role: ProjectRole;
    }>): Promise<void>;
    private isProjectRoleLicensed;
    clearCredentialCanUseExternalSecretsCache(projectId: string): Promise<void>;
    pruneRelations(em: EntityManager, project: Project): Promise<void>;
    addManyRelations(em: EntityManager, project: Project, relations: Array<{
        userId: string;
        role: ProjectRole;
    }>): Promise<void>;
    getProjectWithScope(user: User, projectId: string, scopes: Scope[], entityManager?: EntityManager): Promise<Project | null>;
    addUser(projectId: string, userId: string, role: ProjectRole): Promise<{
        projectId: string;
        userId: string;
        role: "project:personalOwner" | "project:admin" | "project:editor" | "project:viewer";
    } & ProjectRelation>;
    getProject(projectId: string): Promise<Project>;
    getProjectRelations(projectId: string): Promise<ProjectRelation[]>;
    getUserOwnedOrAdminProjects(userId: string): Promise<Project[]>;
    getProjectCounts(): Promise<Record<ProjectType, number>>;
}
