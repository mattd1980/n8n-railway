import type { RoleChangeRequestDto } from '@n8n/api-types';
import type { PublicUser } from '@n8n/db';
import { User, UserRepository } from '@n8n/db';
import { Logger } from 'n8n-core';
import type { IUserSettings } from 'n8n-workflow';
import { EventService } from '../events/event.service';
import type { Invitation } from '../interfaces';
import type { PostHogClient } from '../posthog';
import type { UserRequest } from '../requests';
import { UrlService } from '../services/url.service';
import { UserManagementMailer } from '../user-management/email';
import { PublicApiKeyService } from './public-api-key.service';
export declare class UserService {
    private readonly logger;
    private readonly userRepository;
    private readonly mailer;
    private readonly urlService;
    private readonly eventService;
    private readonly publicApiKeyService;
    constructor(logger: Logger, userRepository: UserRepository, mailer: UserManagementMailer, urlService: UrlService, eventService: EventService, publicApiKeyService: PublicApiKeyService);
    update(userId: string, data: Partial<User>): Promise<void>;
    getManager(): import("@n8n/typeorm").EntityManager;
    updateSettings(userId: string, newSettings: Partial<IUserSettings>): Promise<void>;
    toPublic(user: User, options?: {
        withInviteUrl?: boolean;
        inviterId?: string;
        posthog?: PostHogClient;
        withScopes?: boolean;
    }): Promise<PublicUser>;
    private addInviteUrl;
    private addFeatureFlags;
    private sendEmails;
    inviteUsers(owner: User, invitations: Invitation[]): Promise<{
        usersInvited: UserRequest.InviteResponse[];
        usersCreated: string[];
    }>;
    changeUserRole(user: User, targetUser: User, newRole: RoleChangeRequestDto): Promise<void>;
}
