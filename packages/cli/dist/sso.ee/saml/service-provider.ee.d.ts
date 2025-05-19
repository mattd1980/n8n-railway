import type { SamlPreferences } from '@n8n/api-types';
import type { ServiceProviderInstance } from 'samlify';
export declare function getServiceProviderEntityId(): string;
export declare function getServiceProviderReturnUrl(): string;
export declare function getServiceProviderConfigTestReturnUrl(): string;
export declare function getServiceProviderInstance(prefs: SamlPreferences, samlify: typeof import('samlify')): ServiceProviderInstance;
