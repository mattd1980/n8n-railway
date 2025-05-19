import { CreateProjectDto, DeleteProjectDto, UpdateProjectDto } from '@n8n/api-types';
import type { Project } from '@n8n/db';
import { ProjectRepository } from '@n8n/db';
import type { Scope } from '@n8n/permissions';
import { Response } from 'express';
import { EventService } from '../events/event.service';
import type { ProjectRequest } from '../requests';
import { AuthenticatedRequest } from '../requests';
import { ProjectService } from '../services/project.service.ee';
export declare class ProjectController {
    private readonly projectsService;
    private readonly projectRepository;
    private readonly eventService;
    constructor(projectsService: ProjectService, projectRepository: ProjectRepository, eventService: EventService);
    getAllProjects(req: AuthenticatedRequest): Promise<Project[]>;
    getProjectCounts(): Promise<Record<"personal" | "team", number>>;
    createProject(req: AuthenticatedRequest, _res: Response, payload: CreateProjectDto): Promise<{
        role: string;
        scopes: Scope[];
        name: string;
        type: "personal" | "team";
        icon: {
            type: "emoji" | "icon";
            value: string;
        } | null;
        projectRelations: import("@n8n/db").ProjectRelation[];
        sharedCredentials: import("@n8n/db").SharedCredentials[];
        sharedWorkflows: import("@n8n/db").SharedWorkflow[];
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
    getMyProjects(req: AuthenticatedRequest, _res: Response): Promise<ProjectRequest.GetMyProjectsResponse>;
    getPersonalProject(req: AuthenticatedRequest): Promise<{
        scopes: Scope[];
        name: string;
        type: "personal" | "team";
        icon: {
            type: "emoji" | "icon";
            value: string;
        } | null;
        projectRelations: import("@n8n/db").ProjectRelation[];
        sharedCredentials: import("@n8n/db").SharedCredentials[];
        sharedWorkflows: import("@n8n/db").SharedWorkflow[];
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
    getProject(req: AuthenticatedRequest, _res: Response, projectId: string): Promise<ProjectRequest.ProjectWithRelations>;
    updateProject(req: AuthenticatedRequest, _res: Response, payload: UpdateProjectDto, projectId: string): Promise<void>;
    deleteProject(req: AuthenticatedRequest, _res: Response, query: DeleteProjectDto, projectId: string): Promise<void>;
}
