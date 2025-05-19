import { RoleChangeRequestDto, SettingsUpdateRequestDto } from '@n8n/api-types';
import type { PublicUser } from '@n8n/db';
import { ProjectRepository, SharedCredentialsRepository, SharedWorkflowRepository, UserRepository } from '@n8n/db';
import { Response } from 'express';
import { Logger } from 'n8n-core';
import { AuthService } from '../auth/auth.service';
import { CredentialsService } from '../credentials/credentials.service';
import { EventService } from '../events/event.service';
import { ExternalHooks } from '../external-hooks';
import { ListQuery, AuthenticatedRequest, UserRequest } from '../requests';
import { FolderService } from '../services/folder.service';
import { ProjectService } from '../services/project.service.ee';
import { UserService } from '../services/user.service';
import { WorkflowService } from '../workflows/workflow.service';
export declare class UsersController {
    private readonly logger;
    private readonly externalHooks;
    private readonly sharedCredentialsRepository;
    private readonly sharedWorkflowRepository;
    private readonly userRepository;
    private readonly authService;
    private readonly userService;
    private readonly projectRepository;
    private readonly workflowService;
    private readonly credentialsService;
    private readonly projectService;
    private readonly eventService;
    private readonly folderService;
    constructor(logger: Logger, externalHooks: ExternalHooks, sharedCredentialsRepository: SharedCredentialsRepository, sharedWorkflowRepository: SharedWorkflowRepository, userRepository: UserRepository, authService: AuthService, userService: UserService, projectRepository: ProjectRepository, workflowService: WorkflowService, credentialsService: CredentialsService, projectService: ProjectService, eventService: EventService, folderService: FolderService);
    static ERROR_MESSAGES: {
        readonly CHANGE_ROLE: {
            readonly NO_USER: "Target user not found";
            readonly NO_ADMIN_ON_OWNER: "Admin cannot change role on global owner";
            readonly NO_OWNER_ON_OWNER: "Owner cannot change role on global owner";
        };
    };
    private removeSupplementaryFields;
    listUsers(req: ListQuery.Request): Promise<Partial<PublicUser>[]>;
    getUserPasswordResetLink(req: UserRequest.PasswordResetLink): Promise<{
        link: string;
    }>;
    updateUserSettings(_req: AuthenticatedRequest, _res: Response, payload: SettingsUpdateRequestDto, id: string): Promise<import("n8n-workflow").IUserSettings | null>;
    deleteUser(req: UserRequest.Delete): Promise<{
        success: boolean;
    }>;
    changeGlobalRole(req: AuthenticatedRequest, _: Response, payload: RoleChangeRequestDto, id: string): Promise<{
        success: boolean;
    }>;
}
