"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRunnerConfig = void 0;
const config_1 = require("@n8n/config");
let HealthcheckServerConfig = class HealthcheckServerConfig {
    constructor() {
        this.enabled = false;
        this.host = '127.0.0.1';
        this.port = 5681;
    }
};
__decorate([
    (0, config_1.Env)('N8N_RUNNERS_HEALTH_CHECK_SERVER_ENABLED'),
    __metadata("design:type", Boolean)
], HealthcheckServerConfig.prototype, "enabled", void 0);
__decorate([
    (0, config_1.Env)('N8N_RUNNERS_HEALTH_CHECK_SERVER_HOST'),
    __metadata("design:type", String)
], HealthcheckServerConfig.prototype, "host", void 0);
__decorate([
    (0, config_1.Env)('N8N_RUNNERS_HEALTH_CHECK_SERVER_PORT'),
    __metadata("design:type", Number)
], HealthcheckServerConfig.prototype, "port", void 0);
HealthcheckServerConfig = __decorate([
    config_1.Config
], HealthcheckServerConfig);
let BaseRunnerConfig = class BaseRunnerConfig {
    constructor() {
        this.taskBrokerUri = 'http://127.0.0.1:5679';
        this.grantToken = '';
        this.maxPayloadSize = 1024 * 1024 * 1024;
        this.maxConcurrency = 10;
        this.idleTimeout = 0;
        this.timezone = 'America/New_York';
        this.taskTimeout = 300;
    }
};
exports.BaseRunnerConfig = BaseRunnerConfig;
__decorate([
    (0, config_1.Env)('N8N_RUNNERS_TASK_BROKER_URI'),
    __metadata("design:type", String)
], BaseRunnerConfig.prototype, "taskBrokerUri", void 0);
__decorate([
    (0, config_1.Env)('N8N_RUNNERS_GRANT_TOKEN'),
    __metadata("design:type", String)
], BaseRunnerConfig.prototype, "grantToken", void 0);
__decorate([
    (0, config_1.Env)('N8N_RUNNERS_MAX_PAYLOAD'),
    __metadata("design:type", Number)
], BaseRunnerConfig.prototype, "maxPayloadSize", void 0);
__decorate([
    (0, config_1.Env)('N8N_RUNNERS_MAX_CONCURRENCY'),
    __metadata("design:type", Number)
], BaseRunnerConfig.prototype, "maxConcurrency", void 0);
__decorate([
    (0, config_1.Env)('N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT'),
    __metadata("design:type", Number)
], BaseRunnerConfig.prototype, "idleTimeout", void 0);
__decorate([
    (0, config_1.Env)('GENERIC_TIMEZONE'),
    __metadata("design:type", String)
], BaseRunnerConfig.prototype, "timezone", void 0);
__decorate([
    (0, config_1.Env)('N8N_RUNNERS_TASK_TIMEOUT'),
    __metadata("design:type", Number)
], BaseRunnerConfig.prototype, "taskTimeout", void 0);
__decorate([
    config_1.Nested,
    __metadata("design:type", HealthcheckServerConfig)
], BaseRunnerConfig.prototype, "healthcheckServer", void 0);
exports.BaseRunnerConfig = BaseRunnerConfig = __decorate([
    config_1.Config
], BaseRunnerConfig);
//# sourceMappingURL=base-runner-config.js.map