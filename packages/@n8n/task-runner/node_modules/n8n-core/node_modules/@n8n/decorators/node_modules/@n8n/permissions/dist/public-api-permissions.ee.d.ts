import type { ApiKeyScope, GlobalRole } from './types.ee';
export declare const OWNER_API_KEY_SCOPES: ApiKeyScope[];
export declare const ADMIN_API_KEY_SCOPES: ApiKeyScope[];
export declare const MEMBER_API_KEY_SCOPES: ApiKeyScope[];
export declare const getApiKeyScopesForRole: (role: GlobalRole) => ApiKeyScope[];
export declare const getOwnerOnlyApiKeyScopes: () => ApiKeyScope[];
