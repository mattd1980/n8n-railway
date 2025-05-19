export declare const schema: {
    executions: {
        mode: {
            doc: string;
            format: readonly ["regular", "queue"];
            default: string;
            env: string;
        };
        concurrency: {
            productionLimit: {
                doc: string;
                format: NumberConstructor;
                default: number;
                env: string;
            };
            evaluationLimit: {
                doc: string;
                format: NumberConstructor;
                default: number;
                env: string;
            };
        };
        timeout: {
            doc: string;
            format: NumberConstructor;
            default: number;
            env: string;
        };
        maxTimeout: {
            doc: string;
            format: NumberConstructor;
            default: number;
            env: string;
        };
        saveDataOnError: {
            doc: string;
            format: readonly ["all", "none"];
            default: string;
            env: string;
        };
        saveDataOnSuccess: {
            doc: string;
            format: readonly ["all", "none"];
            default: string;
            env: string;
        };
        saveExecutionProgress: {
            doc: string;
            format: BooleanConstructor;
            default: boolean;
            env: string;
        };
        saveDataManualExecutions: {
            doc: string;
            format: BooleanConstructor;
            default: boolean;
            env: string;
        };
        queueRecovery: {
            interval: {
                doc: string;
                format: NumberConstructor;
                default: number;
                env: string;
            };
            batchSize: {
                doc: string;
                format: NumberConstructor;
                default: number;
                env: string;
            };
        };
    };
    ssl_key: {
        format: StringConstructor;
        default: string;
        env: string;
        doc: string;
    };
    ssl_cert: {
        format: StringConstructor;
        default: string;
        env: string;
        doc: string;
    };
    editorBaseUrl: {
        format: StringConstructor;
        default: string;
        env: string;
        doc: string;
    };
    userManagement: {
        jwtSecret: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
        };
        jwtSessionDurationHours: {
            doc: string;
            format: NumberConstructor;
            default: number;
            env: string;
        };
        jwtRefreshTimeoutHours: {
            doc: string;
            format: NumberConstructor;
            default: number;
            env: string;
        };
        isInstanceOwnerSetUp: {
            doc: string;
            format: BooleanConstructor;
            default: boolean;
        };
        authenticationMethod: {
            doc: string;
            format: readonly ["email", "ldap", "saml"];
            default: string;
        };
    };
    externalFrontendHooksUrls: {
        doc: string;
        format: StringConstructor;
        default: string;
        env: string;
    };
    deployment: {
        type: {
            format: StringConstructor;
            default: string;
            env: string;
        };
    };
    mfa: {
        enabled: {
            format: BooleanConstructor;
            default: boolean;
            doc: string;
            env: string;
        };
    };
    sso: {
        justInTimeProvisioning: {
            format: BooleanConstructor;
            default: boolean;
            doc: string;
        };
        redirectLoginToSso: {
            format: BooleanConstructor;
            default: boolean;
            doc: string;
        };
        saml: {
            loginEnabled: {
                format: BooleanConstructor;
                default: boolean;
                doc: string;
            };
            loginLabel: {
                format: StringConstructor;
                default: string;
            };
        };
        ldap: {
            loginEnabled: {
                format: BooleanConstructor;
                default: boolean;
            };
            loginLabel: {
                format: StringConstructor;
                default: string;
            };
        };
    };
    hiringBanner: {
        enabled: {
            doc: string;
            format: BooleanConstructor;
            default: boolean;
            env: string;
        };
    };
    personalization: {
        enabled: {
            doc: string;
            format: BooleanConstructor;
            default: boolean;
            env: string;
        };
    };
    defaultLocale: {
        doc: string;
        format: StringConstructor;
        default: string;
        env: string;
    };
    hideUsagePage: {
        format: BooleanConstructor;
        default: boolean;
        env: string;
        doc: string;
    };
    redis: {
        prefix: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
        };
    };
    endpoints: {
        rest: {
            format: StringConstructor;
            default: string;
        };
    };
    ai: {
        enabled: {
            doc: string;
            format: BooleanConstructor;
            default: boolean;
            env: string;
        };
    };
    proxy_hops: {
        format: NumberConstructor;
        default: number;
        env: string;
        doc: string;
    };
    logs_view: {
        enabled: {
            format: BooleanConstructor;
            default: boolean;
            env: string;
            doc: string;
        };
    };
};
