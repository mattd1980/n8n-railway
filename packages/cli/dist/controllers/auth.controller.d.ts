import { LoginRequestDto, ResolveSignupTokenQueryDto } from '@n8n/api-types';
import type { PublicUser } from '@n8n/db';
import { UserRepository } from '@n8n/db';
import { Response } from 'express';
import { Logger } from 'n8n-core';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../events/event.service';
import { License } from '../license';
import { MfaService } from '../mfa/mfa.service';
import { PostHogClient } from '../posthog';
import { AuthenticatedRequest, AuthlessRequest } from '../requests';
import { UserService } from '../services/user.service';
export declare class AuthController {
    private readonly logger;
    private readonly authService;
    private readonly mfaService;
    private readonly userService;
    private readonly license;
    private readonly userRepository;
    private readonly eventService;
    private readonly postHog?;
    constructor(logger: Logger, authService: AuthService, mfaService: MfaService, userService: UserService, license: License, userRepository: UserRepository, eventService: EventService, postHog?: PostHogClient | undefined);
    login(req: AuthlessRequest, res: Response, payload: LoginRequestDto): Promise<PublicUser | undefined>;
    currentUser(req: AuthenticatedRequest): Promise<PublicUser>;
    resolveSignupToken(_req: AuthlessRequest, _res: Response, payload: ResolveSignupTokenQueryDto): Promise<{
        inviter: {
            firstName: string;
            lastName: string;
        };
    }>;
    logout(req: AuthenticatedRequest, res: Response): Promise<{
        loggedOut: boolean;
    }>;
}
