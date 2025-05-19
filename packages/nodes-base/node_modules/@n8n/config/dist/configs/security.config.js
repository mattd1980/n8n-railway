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
exports.SecurityConfig = void 0;
const decorators_1 = require("../decorators");
let SecurityConfig = class SecurityConfig {
    constructor() {
        this.restrictFileAccessTo = '';
        this.blockFileAccessToN8nFiles = true;
        this.daysAbandonedWorkflow = 90;
        this.contentSecurityPolicy = '{}';
    }
};
exports.SecurityConfig = SecurityConfig;
__decorate([
    (0, decorators_1.Env)('N8N_RESTRICT_FILE_ACCESS_TO'),
    __metadata("design:type", String)
], SecurityConfig.prototype, "restrictFileAccessTo", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES'),
    __metadata("design:type", Boolean)
], SecurityConfig.prototype, "blockFileAccessToN8nFiles", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_SECURITY_AUDIT_DAYS_ABANDONED_WORKFLOW'),
    __metadata("design:type", Number)
], SecurityConfig.prototype, "daysAbandonedWorkflow", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_CONTENT_SECURITY_POLICY'),
    __metadata("design:type", String)
], SecurityConfig.prototype, "contentSecurityPolicy", void 0);
exports.SecurityConfig = SecurityConfig = __decorate([
    decorators_1.Config
], SecurityConfig);
//# sourceMappingURL=security.config.js.map