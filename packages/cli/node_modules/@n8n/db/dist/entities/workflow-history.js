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
exports.WorkflowHistory = void 0;
const typeorm_1 = require("@n8n/typeorm");
const abstract_entity_1 = require("./abstract-entity");
const workflow_entity_1 = require("./workflow-entity");
let WorkflowHistory = class WorkflowHistory extends abstract_entity_1.WithTimestamps {
};
exports.WorkflowHistory = WorkflowHistory;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], WorkflowHistory.prototype, "versionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkflowHistory.prototype, "workflowId", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)(),
    __metadata("design:type", Array)
], WorkflowHistory.prototype, "nodes", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)(),
    __metadata("design:type", Object)
], WorkflowHistory.prototype, "connections", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkflowHistory.prototype, "authors", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('WorkflowEntity', {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", workflow_entity_1.WorkflowEntity)
], WorkflowHistory.prototype, "workflow", void 0);
exports.WorkflowHistory = WorkflowHistory = __decorate([
    (0, typeorm_1.Entity)()
], WorkflowHistory);
//# sourceMappingURL=workflow-history.js.map