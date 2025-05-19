import type { SamlPreferences } from '@n8n/api-types';
import type { User } from '@n8n/db';
import { SettingsRepository, UserRepository } from '@n8n/db';
import type express from 'express';
import { Logger } from 'n8n-core';
import { type IdentityProviderInstance, type ServiceProviderInstance } from 'samlify';
import type { BindingContext, PostBindingContext } from 'samlify/types/src/entity';
import { UrlService } from '../../services/url.service';
import { SamlValidator } from './saml-validator';
import type { SamlLoginBinding, SamlUserAttributes } from './types';
export declare class SamlService {
    private readonly logger;
    private readonly urlService;
    private readonly validator;
    private readonly userRepository;
    private readonly settingsRepository;
    private identityProviderInstance;
    private samlify;
    private _samlPreferences;
    get samlPreferences(): SamlPreferences;
    constructor(logger: Logger, urlService: UrlService, validator: SamlValidator, userRepository: UserRepository, settingsRepository: SettingsRepository);
    init(): Promise<void>;
    loadSamlify(): Promise<void>;
    getIdentityProviderInstance(forceRecreate?: boolean): IdentityProviderInstance;
    getServiceProviderInstance(): ServiceProviderInstance;
    getLoginRequestUrl(relayState?: string, binding?: SamlLoginBinding): Promise<{
        binding: SamlLoginBinding;
        context: BindingContext | PostBindingContext;
    }>;
    private getRedirectLoginRequestUrl;
    private getPostLoginRequestUrl;
    handleSamlLogin(req: express.Request, binding: SamlLoginBinding): Promise<{
        authenticatedUser: User | undefined;
        attributes: SamlUserAttributes;
        onboardingRequired: boolean;
    }>;
    setSamlPreferences(prefs: Partial<SamlPreferences>, tryFallback?: boolean): Promise<SamlPreferences | undefined>;
    loadPreferencesWithoutValidation(prefs: Partial<SamlPreferences>): Promise<void>;
    loadFromDbAndApplySamlPreferences(apply?: boolean): Promise<SamlPreferences | undefined>;
    saveSamlPreferencesToDb(): Promise<SamlPreferences | undefined>;
    fetchMetadataFromUrl(): Promise<string | undefined>;
    getAttributesFromLoginResponse(req: express.Request, binding: SamlLoginBinding): Promise<SamlUserAttributes>;
    reset(): Promise<void>;
}
