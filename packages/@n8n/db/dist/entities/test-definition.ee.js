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
exports.TestDefinition = void 0;
const typeorm_1 = require("@n8n/typeorm");
const class_validator_1 = require("class-validator");
const abstract_entity_1 = require("./abstract-entity");
const annotation_tag_entity_ee_1 = require("./annotation-tag-entity.ee");
const workflow_entity_1 = require("./workflow-entity");
let TestDefinition = class TestDefinition extends abstract_entity_1.WithTimestampsAndStringId {
};
exports.TestDefinition = TestDefinition;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, class_validator_1.Length)(1, 255, {
        message: 'Test definition name must be $constraint1 to $constraint2 characters long.',
    }),
    __metadata("design:type", String)
], TestDefinition.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], TestDefinition.prototype, "description", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)({ default: '[]' }),
    __metadata("design:type", Array)
], TestDefinition.prototype, "mockedNodes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('WorkflowEntity', 'tests'),
    __metadata("design:type", workflow_entity_1.WorkflowEntity)
], TestDefinition.prototype, "workflow", void 0);
__decorate([
    (0, typeorm_1.RelationId)((test) => test.workflow),
    __metadata("design:type", String)
], TestDefinition.prototype, "workflowId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('WorkflowEntity', 'evaluationTests'),
    __metadata("design:type", workflow_entity_1.WorkflowEntity)
], TestDefinition.prototype, "evaluationWorkflow", void 0);
__decorate([
    (0, typeorm_1.RelationId)((test) => test.evaluationWorkflow),
    __metadata("design:type", String)
], TestDefinition.prototype, "evaluationWorkflowId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('AnnotationTagEntity', 'test'),
    __metadata("design:type", annotation_tag_entity_ee_1.AnnotationTagEntity)
], TestDefinition.prototype, "annotationTag", void 0);
__decorate([
    (0, typeorm_1.RelationId)((test) => test.annotationTag),
    __metadata("design:type", String)
], TestDefinition.prototype, "annotationTagId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('TestMetric', 'testDefinition'),
    __metadata("design:type", Array)
], TestDefinition.prototype, "metrics", void 0);
exports.TestDefinition = TestDefinition = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['workflow']),
    (0, typeorm_1.Index)(['evaluationWorkflow'])
], TestDefinition);
//# sourceMappingURL=test-definition.ee.js.map