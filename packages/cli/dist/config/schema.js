"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
exports.schema = {
    executions: {
        mode: {
            doc: 'If it should run executions directly or via queue',
            format: ['regular', 'queue'],
            default: 'regular',
            env: 'EXECUTIONS_MODE',
        },
        concurrency: {
            productionLimit: {
                doc: "Max production executions allowed to run concurrently, in main process for regular mode and in worker for queue mode. Default for main mode is `-1` (disabled). Default for queue mode is taken from the worker's `--concurrency` flag.",
                format: Number,
                default: -1,
                env: 'N8N_CONCURRENCY_PRODUCTION_LIMIT',
            },
            evaluationLimit: {
                doc: 'Max evaluation executions allowed to run concurrently.',
                format: Number,
                default: -1,
                env: 'N8N_CONCURRENCY_EVALUATION_LIMIT',
            },
        },
        timeout: {
            doc: 'Max run time (seconds) before stopping the workflow execution',
            format: Number,
            default: -1,
            env: 'EXECUTIONS_TIMEOUT',
        },
        maxTimeout: {
            doc: 'Max execution time (seconds) that can be set for a workflow individually',
            format: Number,
            default: 3600,
            env: 'EXECUTIONS_TIMEOUT_MAX',
        },
        saveDataOnError: {
            doc: 'What workflow execution data to save on error',
            format: ['all', 'none'],
            default: 'all',
            env: 'EXECUTIONS_DATA_SAVE_ON_ERROR',
        },
        saveDataOnSuccess: {
            doc: 'What workflow execution data to save on success',
            format: ['all', 'none'],
            default: 'all',
            env: 'EXECUTIONS_DATA_SAVE_ON_SUCCESS',
        },
        saveExecutionProgress: {
            doc: 'Whether or not to save progress for each node executed',
            format: Boolean,
            default: false,
            env: 'EXECUTIONS_DATA_SAVE_ON_PROGRESS',
        },
        saveDataManualExecutions: {
            doc: 'Save data of executions when started manually via editor',
            format: Boolean,
            default: true,
            env: 'EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS',
        },
        queueRecovery: {
            interval: {
                doc: 'How often (minutes) to check for queue recovery',
                format: Number,
                default: 180,
                env: 'N8N_EXECUTIONS_QUEUE_RECOVERY_INTERVAL',
            },
            batchSize: {
                doc: 'Size of batch of executions to check for queue recovery',
                format: Number,
                default: 100,
                env: 'N8N_EXECUTIONS_QUEUE_RECOVERY_BATCH',
            },
        },
    },
    ssl_key: {
        format: String,
        default: '',
        env: 'N8N_SSL_KEY',
        doc: 'SSL Key for HTTPS Protocol',
    },
    ssl_cert: {
        format: String,
        default: '',
        env: 'N8N_SSL_CERT',
        doc: 'SSL Cert for HTTPS Protocol',
    },
    editorBaseUrl: {
        format: String,
        default: '',
        env: 'N8N_EDITOR_BASE_URL',
        doc: 'Public URL where the editor is accessible. Also used for emails sent from n8n.',
    },
    userManagement: {
        jwtSecret: {
            doc: 'Set a specific JWT secret (optional - n8n can generate one)',
            format: String,
            default: '',
            env: 'N8N_USER_MANAGEMENT_JWT_SECRET',
        },
        jwtSessionDurationHours: {
            doc: 'Set a specific expiration date for the JWTs in hours.',
            format: Number,
            default: 168,
            env: 'N8N_USER_MANAGEMENT_JWT_DURATION_HOURS',
        },
        jwtRefreshTimeoutHours: {
            doc: 'How long before the JWT expires to automatically refresh it. 0 means 25% of N8N_USER_MANAGEMENT_JWT_DURATION_HOURS. -1 means it will never refresh, which forces users to login again after the defined period in N8N_USER_MANAGEMENT_JWT_DURATION_HOURS.',
            format: Number,
            default: 0,
            env: 'N8N_USER_MANAGEMENT_JWT_REFRESH_TIMEOUT_HOURS',
        },
        isInstanceOwnerSetUp: {
            doc: "Whether the instance owner's account has been set up",
            format: Boolean,
            default: false,
        },
        authenticationMethod: {
            doc: 'How to authenticate users (e.g. "email", "ldap", "saml")',
            format: ['email', 'ldap', 'saml'],
            default: 'email',
        },
    },
    externalFrontendHooksUrls: {
        doc: 'URLs to external frontend hooks files, ; separated',
        format: String,
        default: '',
        env: 'EXTERNAL_FRONTEND_HOOKS_URLS',
    },
    deployment: {
        type: {
            format: String,
            default: 'default',
            env: 'N8N_DEPLOYMENT_TYPE',
        },
    },
    mfa: {
        enabled: {
            format: Boolean,
            default: true,
            doc: 'Whether to enable MFA feature in instance.',
            env: 'N8N_MFA_ENABLED',
        },
    },
    sso: {
        justInTimeProvisioning: {
            format: Boolean,
            default: true,
            doc: 'Whether to automatically create users when they login via SSO.',
        },
        redirectLoginToSso: {
            format: Boolean,
            default: true,
            doc: 'Whether to automatically redirect users from login dialog to initialize SSO flow.',
        },
        saml: {
            loginEnabled: {
                format: Boolean,
                default: false,
                doc: 'Whether to enable SAML SSO.',
            },
            loginLabel: {
                format: String,
                default: '',
            },
        },
        ldap: {
            loginEnabled: {
                format: Boolean,
                default: false,
            },
            loginLabel: {
                format: String,
                default: '',
            },
        },
    },
    hiringBanner: {
        enabled: {
            doc: 'Whether hiring banner in browser console is enabled.',
            format: Boolean,
            default: true,
            env: 'N8N_HIRING_BANNER_ENABLED',
        },
    },
    personalization: {
        enabled: {
            doc: 'Whether personalization is enabled.',
            format: Boolean,
            default: true,
            env: 'N8N_PERSONALIZATION_ENABLED',
        },
    },
    defaultLocale: {
        doc: 'Default locale for the UI',
        format: String,
        default: 'en',
        env: 'N8N_DEFAULT_LOCALE',
    },
    hideUsagePage: {
        format: Boolean,
        default: false,
        env: 'N8N_HIDE_USAGE_PAGE',
        doc: 'Hide or show the usage page',
    },
    redis: {
        prefix: {
            doc: 'Prefix for all n8n related keys',
            format: String,
            default: 'n8n',
            env: 'N8N_REDIS_KEY_PREFIX',
        },
    },
    endpoints: {
        rest: {
            format: String,
            default: di_1.Container.get(config_1.GlobalConfig).endpoints.rest,
        },
    },
    ai: {
        enabled: {
            doc: 'Whether AI features are enabled',
            format: Boolean,
            default: false,
            env: 'N8N_AI_ENABLED',
        },
    },
    proxy_hops: {
        format: Number,
        default: 0,
        env: 'N8N_PROXY_HOPS',
        doc: 'Number of reverse-proxies n8n is running behind',
    },
    logs_view: {
        enabled: {
            format: Boolean,
            default: true,
            env: 'N8N_ENABLE_LOGS_VIEW',
            doc: 'Temporary env variable to enable logs view',
        },
    },
};
//# sourceMappingURL=schema.js.map