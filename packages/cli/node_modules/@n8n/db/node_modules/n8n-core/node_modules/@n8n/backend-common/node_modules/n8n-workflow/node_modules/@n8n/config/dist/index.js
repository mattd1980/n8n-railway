"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalConfig = exports.WorkflowsConfig = exports.LOG_SCOPES = exports.ExecutionsConfig = exports.SecurityConfig = exports.TaskRunnersConfig = exports.InstanceSettingsConfig = exports.DatabaseConfig = exports.Nested = exports.Env = exports.Config = void 0;
const zod_1 = require("zod");
const aiAssistant_config_1 = require("./configs/aiAssistant.config");
const auth_config_1 = require("./configs/auth.config");
const cache_config_1 = require("./configs/cache.config");
const credentials_config_1 = require("./configs/credentials.config");
const database_config_1 = require("./configs/database.config");
const diagnostics_config_1 = require("./configs/diagnostics.config");
const endpoints_config_1 = require("./configs/endpoints.config");
const event_bus_config_1 = require("./configs/event-bus.config");
const executions_config_1 = require("./configs/executions.config");
const external_hooks_config_1 = require("./configs/external-hooks.config");
const generic_config_1 = require("./configs/generic.config");
const license_config_1 = require("./configs/license.config");
const logging_config_1 = require("./configs/logging.config");
const multi_main_setup_config_1 = require("./configs/multi-main-setup.config");
const nodes_config_1 = require("./configs/nodes.config");
const partial_executions_config_1 = require("./configs/partial-executions.config");
const public_api_config_1 = require("./configs/public-api.config");
const runners_config_1 = require("./configs/runners.config");
const scaling_mode_config_1 = require("./configs/scaling-mode.config");
const security_config_1 = require("./configs/security.config");
const sentry_config_1 = require("./configs/sentry.config");
const tags_config_1 = require("./configs/tags.config");
const templates_config_1 = require("./configs/templates.config");
const user_management_config_1 = require("./configs/user-management.config");
const version_notifications_config_1 = require("./configs/version-notifications.config");
const workflow_history_config_1 = require("./configs/workflow-history.config");
const workflows_config_1 = require("./configs/workflows.config");
const decorators_1 = require("./decorators");
var decorators_2 = require("./decorators");
Object.defineProperty(exports, "Config", { enumerable: true, get: function () { return decorators_2.Config; } });
Object.defineProperty(exports, "Env", { enumerable: true, get: function () { return decorators_2.Env; } });
Object.defineProperty(exports, "Nested", { enumerable: true, get: function () { return decorators_2.Nested; } });
var database_config_2 = require("./configs/database.config");
Object.defineProperty(exports, "DatabaseConfig", { enumerable: true, get: function () { return database_config_2.DatabaseConfig; } });
var instance_settings_config_1 = require("./configs/instance-settings-config");
Object.defineProperty(exports, "InstanceSettingsConfig", { enumerable: true, get: function () { return instance_settings_config_1.InstanceSettingsConfig; } });
var runners_config_2 = require("./configs/runners.config");
Object.defineProperty(exports, "TaskRunnersConfig", { enumerable: true, get: function () { return runners_config_2.TaskRunnersConfig; } });
var security_config_2 = require("./configs/security.config");
Object.defineProperty(exports, "SecurityConfig", { enumerable: true, get: function () { return security_config_2.SecurityConfig; } });
var executions_config_2 = require("./configs/executions.config");
Object.defineProperty(exports, "ExecutionsConfig", { enumerable: true, get: function () { return executions_config_2.ExecutionsConfig; } });
var logging_config_2 = require("./configs/logging.config");
Object.defineProperty(exports, "LOG_SCOPES", { enumerable: true, get: function () { return logging_config_2.LOG_SCOPES; } });
var workflows_config_2 = require("./configs/workflows.config");
Object.defineProperty(exports, "WorkflowsConfig", { enumerable: true, get: function () { return workflows_config_2.WorkflowsConfig; } });
__exportStar(require("./custom-types"), exports);
const protocolSchema = zod_1.z.enum(['http', 'https']);
let GlobalConfig = class GlobalConfig {
    constructor() {
        this.path = '/';
        this.host = 'localhost';
        this.port = 5678;
        this.listen_address = '0.0.0.0';
        this.protocol = 'http';
    }
};
exports.GlobalConfig = GlobalConfig;
__decorate([
    decorators_1.Nested,
    __metadata("design:type", auth_config_1.AuthConfig)
], GlobalConfig.prototype, "auth", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", database_config_1.DatabaseConfig)
], GlobalConfig.prototype, "database", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", credentials_config_1.CredentialsConfig)
], GlobalConfig.prototype, "credentials", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", user_management_config_1.UserManagementConfig)
], GlobalConfig.prototype, "userManagement", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", version_notifications_config_1.VersionNotificationsConfig)
], GlobalConfig.prototype, "versionNotifications", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", public_api_config_1.PublicApiConfig)
], GlobalConfig.prototype, "publicApi", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", external_hooks_config_1.ExternalHooksConfig)
], GlobalConfig.prototype, "externalHooks", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", templates_config_1.TemplatesConfig)
], GlobalConfig.prototype, "templates", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", event_bus_config_1.EventBusConfig)
], GlobalConfig.prototype, "eventBus", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", nodes_config_1.NodesConfig)
], GlobalConfig.prototype, "nodes", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", workflows_config_1.WorkflowsConfig)
], GlobalConfig.prototype, "workflows", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", sentry_config_1.SentryConfig)
], GlobalConfig.prototype, "sentry", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_PATH'),
    __metadata("design:type", String)
], GlobalConfig.prototype, "path", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_HOST'),
    __metadata("design:type", String)
], GlobalConfig.prototype, "host", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_PORT'),
    __metadata("design:type", Number)
], GlobalConfig.prototype, "port", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_LISTEN_ADDRESS'),
    __metadata("design:type", String)
], GlobalConfig.prototype, "listen_address", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_PROTOCOL', protocolSchema),
    __metadata("design:type", String)
], GlobalConfig.prototype, "protocol", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", endpoints_config_1.EndpointsConfig)
], GlobalConfig.prototype, "endpoints", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", cache_config_1.CacheConfig)
], GlobalConfig.prototype, "cache", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", scaling_mode_config_1.ScalingModeConfig)
], GlobalConfig.prototype, "queue", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", logging_config_1.LoggingConfig)
], GlobalConfig.prototype, "logging", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", runners_config_1.TaskRunnersConfig)
], GlobalConfig.prototype, "taskRunners", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", multi_main_setup_config_1.MultiMainSetupConfig)
], GlobalConfig.prototype, "multiMainSetup", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", generic_config_1.GenericConfig)
], GlobalConfig.prototype, "generic", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", license_config_1.LicenseConfig)
], GlobalConfig.prototype, "license", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", security_config_1.SecurityConfig)
], GlobalConfig.prototype, "security", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", executions_config_1.ExecutionsConfig)
], GlobalConfig.prototype, "executions", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", diagnostics_config_1.DiagnosticsConfig)
], GlobalConfig.prototype, "diagnostics", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", aiAssistant_config_1.AiAssistantConfig)
], GlobalConfig.prototype, "aiAssistant", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", tags_config_1.TagsConfig)
], GlobalConfig.prototype, "tags", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", partial_executions_config_1.PartialExecutionsConfig)
], GlobalConfig.prototype, "partialExecutions", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", workflow_history_config_1.WorkflowHistoryConfig)
], GlobalConfig.prototype, "workflowHistory", void 0);
exports.GlobalConfig = GlobalConfig = __decorate([
    decorators_1.Config
], GlobalConfig);
//# sourceMappingURL=index.js.map