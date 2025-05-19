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
exports.WorkflowEntity = void 0;
const typeorm_1 = require("@n8n/typeorm");
const class_validator_1 = require("class-validator");
const abstract_entity_1 = require("./abstract-entity");
const transformers_1 = require("../utils/transformers");
let WorkflowEntity = class WorkflowEntity extends abstract_entity_1.WithTimestampsAndStringId {
};
exports.WorkflowEntity = WorkflowEntity;
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, class_validator_1.Length)(1, 128, {
        message: 'Workflow name must be $constraint1 to $constraint2 characters long.',
    }),
    (0, typeorm_1.Column)({ length: 128 }),
    __metadata("design:type", String)
], WorkflowEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], WorkflowEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WorkflowEntity.prototype, "isArchived", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)(),
    __metadata("design:type", Array)
], WorkflowEntity.prototype, "nodes", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)(),
    __metadata("design:type", Object)
], WorkflowEntity.prototype, "connections", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)({ nullable: true }),
    __metadata("design:type", Object)
], WorkflowEntity.prototype, "settings", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)({
        nullable: true,
        transformer: transformers_1.objectRetriever,
    }),
    __metadata("design:type", Object)
], WorkflowEntity.prototype, "staticData", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)({
        nullable: true,
        transformer: transformers_1.objectRetriever,
    }),
    __metadata("design:type", Object)
], WorkflowEntity.prototype, "meta", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)('TagEntity', 'workflows'),
    (0, typeorm_1.JoinTable)({
        name: 'workflows_tags',
        joinColumn: {
            name: 'workflowId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tagId',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], WorkflowEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('WorkflowTagMapping', 'workflows'),
    __metadata("design:type", Array)
], WorkflowEntity.prototype, "tagMappings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('SharedWorkflow', 'workflow'),
    __metadata("design:type", Array)
], WorkflowEntity.prototype, "shared", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('WorkflowStatistics', 'workflow'),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: 'workflow' }),
    __metadata("design:type", Array)
], WorkflowEntity.prototype, "statistics", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: abstract_entity_1.dbType === 'sqlite' ? 'text' : 'json',
        nullable: true,
        transformer: transformers_1.sqlite.jsonColumn,
    }),
    __metadata("design:type", Object)
], WorkflowEntity.prototype, "pinData", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 36 }),
    __metadata("design:type", String)
], WorkflowEntity.prototype, "versionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], WorkflowEntity.prototype, "triggerCount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Folder', 'workflows', {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parentFolderId' }),
    __metadata("design:type", Object)
], WorkflowEntity.prototype, "parentFolder", void 0);
exports.WorkflowEntity = WorkflowEntity = __decorate([
    (0, typeorm_1.Entity)()
], WorkflowEntity);
//# sourceMappingURL=workflow-entity.js.map