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
exports.SentryConfig = void 0;
const config_1 = require("@n8n/config");
let SentryConfig = class SentryConfig {
    constructor() {
        this.dsn = '';
        this.n8nVersion = '';
        this.environment = '';
        this.deploymentName = '';
    }
};
exports.SentryConfig = SentryConfig;
__decorate([
    (0, config_1.Env)('N8N_SENTRY_DSN'),
    __metadata("design:type", String)
], SentryConfig.prototype, "dsn", void 0);
__decorate([
    (0, config_1.Env)('N8N_VERSION'),
    __metadata("design:type", String)
], SentryConfig.prototype, "n8nVersion", void 0);
__decorate([
    (0, config_1.Env)('ENVIRONMENT'),
    __metadata("design:type", String)
], SentryConfig.prototype, "environment", void 0);
__decorate([
    (0, config_1.Env)('DEPLOYMENT_NAME'),
    __metadata("design:type", String)
], SentryConfig.prototype, "deploymentName", void 0);
exports.SentryConfig = SentryConfig = __decorate([
    config_1.Config
], SentryConfig);
//# sourceMappingURL=sentry-config.js.map