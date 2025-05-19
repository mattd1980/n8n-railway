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
exports.ModulesConfig = void 0;
const config_1 = require("@n8n/config");
const n8n_workflow_1 = require("n8n-workflow");
const moduleNames = ['insights'];
class Modules extends config_1.CommaSeparatedStringArray {
    constructor(str) {
        super(str);
        for (const moduleName of this) {
            if (!moduleNames.includes(moduleName)) {
                throw new n8n_workflow_1.UnexpectedError(`Unknown module name ${moduleName}`, { level: 'fatal' });
            }
        }
    }
}
let ModulesConfig = class ModulesConfig {
    constructor() {
        this.enabledModules = [];
        this.disabledModules = [];
        this.defaultModules = ['insights'];
        this.loadedModules = new Set();
    }
    get modules() {
        if (this.enabledModules.some((module) => this.disabledModules.includes(module))) {
            throw new n8n_workflow_1.UnexpectedError('Module cannot be both enabled and disabled', { level: 'fatal' });
        }
        const enabledModules = Array.from(new Set(this.defaultModules.concat(this.enabledModules)));
        return enabledModules.filter((module) => !this.disabledModules.includes(module));
    }
    addLoadedModule(module) {
        this.loadedModules.add(module);
    }
};
exports.ModulesConfig = ModulesConfig;
__decorate([
    (0, config_1.Env)('N8N_ENABLED_MODULES'),
    __metadata("design:type", Modules)
], ModulesConfig.prototype, "enabledModules", void 0);
__decorate([
    (0, config_1.Env)('N8N_DISABLED_MODULES'),
    __metadata("design:type", Modules)
], ModulesConfig.prototype, "disabledModules", void 0);
exports.ModulesConfig = ModulesConfig = __decorate([
    config_1.Config
], ModulesConfig);
//# sourceMappingURL=modules.config.js.map