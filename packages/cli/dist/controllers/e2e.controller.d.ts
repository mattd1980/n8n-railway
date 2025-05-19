import type { PushMessage } from '@n8n/api-types';
import type { BooleanLicenseFeature, NumericLicenseFeature } from '@n8n/constants';
import { AuthUserRepository, SettingsRepository, UserRepository } from '@n8n/db';
import { Request } from 'express';
import { ActiveWorkflowManager } from '../active-workflow-manager';
import { MessageEventBus } from '../eventbus/message-event-bus/message-event-bus';
import { License } from '../license';
import { MfaService } from '../mfa/mfa.service';
import { Push } from '../push';
import { CacheService } from '../services/cache/cache.service';
import { PasswordUtility } from '../services/password.utility';
type UserSetupPayload = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    mfaEnabled?: boolean;
    mfaSecret?: string;
    mfaRecoveryCodes?: string[];
};
type ResetRequest = Request<{}, {}, {
    owner: UserSetupPayload;
    members: UserSetupPayload[];
    admin: UserSetupPayload;
}>;
type PushRequest = Request<{}, {}, {
    pushRef: string;
} & PushMessage>;
export declare class E2EController {
    private readonly settingsRepo;
    private readonly workflowRunner;
    private readonly mfaService;
    private readonly cacheService;
    private readonly push;
    private readonly passwordUtility;
    private readonly eventBus;
    private readonly userRepository;
    private readonly authUserRepository;
    private enabledFeatures;
    private static readonly numericFeaturesDefaults;
    private numericFeatures;
    constructor(license: License, settingsRepo: SettingsRepository, workflowRunner: ActiveWorkflowManager, mfaService: MfaService, cacheService: CacheService, push: Push, passwordUtility: PasswordUtility, eventBus: MessageEventBus, userRepository: UserRepository, authUserRepository: AuthUserRepository);
    reset(req: ResetRequest): Promise<void>;
    pushSend(req: PushRequest): Promise<void>;
    setFeature(req: Request<{}, {}, {
        feature: BooleanLicenseFeature;
        enabled: boolean;
    }>): void;
    setQuota(req: Request<{}, {}, {
        feature: NumericLicenseFeature;
        value: number;
    }>): void;
    setQueueMode(req: Request<{}, {}, {
        enabled: boolean;
    }>): Promise<{
        success: boolean;
        message: string;
    }>;
    private resetFeatures;
    private removeActiveWorkflows;
    private resetLogStreaming;
    private truncateAll;
    private setupUserManagement;
    private resetCache;
}
export {};
