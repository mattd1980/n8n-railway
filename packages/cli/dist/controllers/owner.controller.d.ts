import { DismissBannerRequestDto, OwnerSetupRequestDto } from '@n8n/api-types';
import { SettingsRepository, UserRepository } from '@n8n/db';
import { Response } from 'express';
import { Logger } from 'n8n-core';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../events/event.service';
import { PostHogClient } from '../posthog';
import { AuthenticatedRequest } from '../requests';
import { BannerService } from '../services/banner.service';
import { PasswordUtility } from '../services/password.utility';
import { UserService } from '../services/user.service';
export declare class OwnerController {
    private readonly logger;
    private readonly eventService;
    private readonly settingsRepository;
    private readonly authService;
    private readonly bannerService;
    private readonly userService;
    private readonly passwordUtility;
    private readonly postHog;
    private readonly userRepository;
    constructor(logger: Logger, eventService: EventService, settingsRepository: SettingsRepository, authService: AuthService, bannerService: BannerService, userService: UserService, passwordUtility: PasswordUtility, postHog: PostHogClient, userRepository: UserRepository);
    setupOwner(req: AuthenticatedRequest, res: Response, payload: OwnerSetupRequestDto): Promise<import("@n8n/db").PublicUser>;
    dismissBanner(_req: AuthenticatedRequest, _res: Response, payload: DismissBannerRequestDto): Promise<void>;
}
