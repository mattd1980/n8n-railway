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
exports.JsRunnerConfig = void 0;
const config_1 = require("@n8n/config");
let JsRunnerConfig = class JsRunnerConfig {
    constructor() {
        this.allowedBuiltInModules = '';
        this.allowedExternalModules = '';
        this.allowPrototypeMutation = false;
    }
};
exports.JsRunnerConfig = JsRunnerConfig;
__decorate([
    (0, config_1.Env)('NODE_FUNCTION_ALLOW_BUILTIN'),
    __metadata("design:type", String)
], JsRunnerConfig.prototype, "allowedBuiltInModules", void 0);
__decorate([
    (0, config_1.Env)('NODE_FUNCTION_ALLOW_EXTERNAL'),
    __metadata("design:type", String)
], JsRunnerConfig.prototype, "allowedExternalModules", void 0);
__decorate([
    (0, config_1.Env)('N8N_RUNNERS_ALLOW_PROTOTYPE_MUTATION'),
    __metadata("design:type", Boolean)
], JsRunnerConfig.prototype, "allowPrototypeMutation", void 0);
exports.JsRunnerConfig = JsRunnerConfig = __decorate([
    config_1.Config
], JsRunnerConfig);
//# sourceMappingURL=js-runner-config.js.map