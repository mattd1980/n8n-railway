import { AcceptInvitationRequestDto, InviteUsersRequestDto } from '@n8n/api-types';
import { UserRepository } from '@n8n/db';
import { Response } from 'express';
import { Logger } from 'n8n-core';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../events/event.service';
import { ExternalHooks } from '../external-hooks';
import { License } from '../license';
import { PostHogClient } from '../posthog';
import { AuthenticatedRequest, AuthlessRequest } from '../requests';
import { PasswordUtility } from '../services/password.utility';
import { UserService } from '../services/user.service';
export declare class InvitationController {
    private readonly logger;
    private readonly externalHooks;
    private readonly authService;
    private readonly userService;
    private readonly license;
    private readonly passwordUtility;
    private readonly userRepository;
    private readonly postHog;
    private readonly eventService;
    constructor(logger: Logger, externalHooks: ExternalHooks, authService: AuthService, userService: UserService, license: License, passwordUtility: PasswordUtility, userRepository: UserRepository, postHog: PostHogClient, eventService: EventService);
    inviteUser(req: AuthenticatedRequest, _res: Response, invitations: InviteUsersRequestDto): Promise<import("../requests").UserRequest.InviteResponse[]>;
    acceptInvitation(req: AuthlessRequest, res: Response, payload: AcceptInvitationRequestDto, inviteeId: string): Promise<import("@n8n/db").PublicUser>;
}
