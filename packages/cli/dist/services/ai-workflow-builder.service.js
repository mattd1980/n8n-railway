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
exports.WorkflowBuilderService = void 0;
const ai_workflow_builder_1 = require("@n8n/ai-workflow-builder");
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const constants_1 = require("../constants");
const license_1 = require("../license");
const node_types_1 = require("../node-types");
let WorkflowBuilderService = class WorkflowBuilderService {
    constructor(nodeTypes, license, config) {
        this.nodeTypes = nodeTypes;
        this.license = license;
        this.config = config;
    }
    getService() {
        if (!this.service) {
            this.service = new ai_workflow_builder_1.AiWorkflowBuilderService(this.license, this.nodeTypes, this.config, constants_1.N8N_VERSION);
        }
        return this.service;
    }
    async *chat(payload, user) {
        const service = this.getService();
        yield* service.chat(payload, user);
    }
};
exports.WorkflowBuilderService = WorkflowBuilderService;
exports.WorkflowBuilderService = WorkflowBuilderService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [node_types_1.NodeTypes,
        license_1.License,
        config_1.GlobalConfig])
], WorkflowBuilderService);
//# sourceMappingURL=ai-workflow-builder.service.js.map