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
exports.ExecutionEntity = void 0;
const typeorm_1 = require("@n8n/typeorm");
const abstract_entity_1 = require("./abstract-entity");
const workflow_entity_1 = require("./workflow-entity");
const transformers_1 = require("../utils/transformers");
let ExecutionEntity = class ExecutionEntity {
};
exports.ExecutionEntity = ExecutionEntity;
__decorate([
    (0, typeorm_1.Generated)(),
    (0, typeorm_1.PrimaryColumn)({ transformer: transformers_1.idStringifier }),
    __metadata("design:type", String)
], ExecutionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ExecutionEntity.prototype, "finished", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], ExecutionEntity.prototype, "mode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExecutionEntity.prototype, "retryOf", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExecutionEntity.prototype, "retrySuccessId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], ExecutionEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(abstract_entity_1.datetimeColumnType),
    __metadata("design:type", Date)
], ExecutionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: abstract_entity_1.datetimeColumnType,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ExecutionEntity.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, abstract_entity_1.DateTimeColumn)({ nullable: true }),
    __metadata("design:type", Date)
], ExecutionEntity.prototype, "stoppedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: abstract_entity_1.datetimeColumnType, nullable: true }),
    __metadata("design:type", Date)
], ExecutionEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExecutionEntity.prototype, "workflowId", void 0);
__decorate([
    (0, abstract_entity_1.DateTimeColumn)({ nullable: true }),
    __metadata("design:type", Object)
], ExecutionEntity.prototype, "waitTill", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('ExecutionMetadata', 'execution'),
    __metadata("design:type", Array)
], ExecutionEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.OneToOne)('ExecutionData', 'execution'),
    __metadata("design:type", Object)
], ExecutionEntity.prototype, "executionData", void 0);
__decorate([
    (0, typeorm_1.OneToOne)('ExecutionAnnotation', 'execution'),
    __metadata("design:type", Object)
], ExecutionEntity.prototype, "annotation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('WorkflowEntity'),
    __metadata("design:type", workflow_entity_1.WorkflowEntity)
], ExecutionEntity.prototype, "workflow", void 0);
exports.ExecutionEntity = ExecutionEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['workflowId', 'id']),
    (0, typeorm_1.Index)(['waitTill', 'id']),
    (0, typeorm_1.Index)(['finished', 'id']),
    (0, typeorm_1.Index)(['workflowId', 'finished', 'id']),
    (0, typeorm_1.Index)(['workflowId', 'waitTill', 'id'])
], ExecutionEntity);
//# sourceMappingURL=execution-entity.js.map