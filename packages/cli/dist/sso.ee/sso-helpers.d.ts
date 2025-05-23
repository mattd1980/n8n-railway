import { type AuthProviderType } from '@n8n/db';
export declare function setCurrentAuthenticationMethod(authenticationMethod: AuthProviderType): Promise<void>;
export declare function getCurrentAuthenticationMethod(): AuthProviderType;
export declare function isSamlCurrentAuthenticationMethod(): boolean;
export declare function isLdapCurrentAuthenticationMethod(): boolean;
export declare function isEmailCurrentAuthenticationMethod(): boolean;
export declare function isSsoJustInTimeProvisioningEnabled(): boolean;
export declare function doRedirectUsersFromLoginToSsoFlow(): boolean;
