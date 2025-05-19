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
exports.MainConfig = void 0;
const config_1 = require("@n8n/config");
const base_runner_config_1 = require("./base-runner-config");
const js_runner_config_1 = require("./js-runner-config");
const sentry_config_1 = require("./sentry-config");
let MainConfig = class MainConfig {
};
exports.MainConfig = MainConfig;
__decorate([
    config_1.Nested,
    __metadata("design:type", base_runner_config_1.BaseRunnerConfig)
], MainConfig.prototype, "baseRunnerConfig", void 0);
__decorate([
    config_1.Nested,
    __metadata("design:type", js_runner_config_1.JsRunnerConfig)
], MainConfig.prototype, "jsRunnerConfig", void 0);
__decorate([
    config_1.Nested,
    __metadata("design:type", sentry_config_1.SentryConfig)
], MainConfig.prototype, "sentryConfig", void 0);
exports.MainConfig = MainConfig = __decorate([
    config_1.Config
], MainConfig);
//# sourceMappingURL=main-config.js.map