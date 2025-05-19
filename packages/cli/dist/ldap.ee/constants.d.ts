import type { LdapConfig } from '@n8n/constants';
export declare const LDAP_LOGIN_LABEL = "sso.ldap.loginLabel";
export declare const LDAP_LOGIN_ENABLED = "sso.ldap.loginEnabled";
export declare const BINARY_AD_ATTRIBUTES: string[];
export declare const LDAP_CONFIG_SCHEMA: {
    $schema: string;
    type: string;
    properties: {
        emailAttribute: {
            type: string;
        };
        firstNameAttribute: {
            type: string;
        };
        lastNameAttribute: {
            type: string;
        };
        ldapIdAttribute: {
            type: string;
        };
        loginIdAttribute: {
            type: string;
        };
        bindingAdminDn: {
            type: string;
        };
        bindingAdminPassword: {
            type: string;
        };
        baseDn: {
            type: string;
        };
        connectionUrl: {
            type: string;
        };
        connectionSecurity: {
            type: string;
        };
        connectionPort: {
            type: string;
        };
        allowUnauthorizedCerts: {
            type: string;
        };
        userFilter: {
            type: string;
        };
        loginEnabled: {
            type: string;
        };
        loginLabel: {
            type: string;
        };
        synchronizationEnabled: {
            type: string;
        };
        synchronizationInterval: {
            type: string;
        };
        searchPageSize: {
            type: string;
        };
        searchTimeout: {
            type: string;
        };
    };
    required: string[];
    additionalProperties: boolean;
};
export declare const NON_SENSIBLE_LDAP_CONFIG_PROPERTIES: Array<keyof LdapConfig>;
