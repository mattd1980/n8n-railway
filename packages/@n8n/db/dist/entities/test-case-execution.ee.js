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
exports.TestCaseExecution = void 0;
const typeorm_1 = require("@n8n/typeorm");
const abstract_entity_1 = require("./abstract-entity");
const test_run_ee_1 = require("./test-run.ee");
let TestCaseExecution = class TestCaseExecution extends abstract_entity_1.WithStringId {
};
exports.TestCaseExecution = TestCaseExecution;
__decorate([
    (0, typeorm_1.ManyToOne)('TestRun'),
    __metadata("design:type", test_run_ee_1.TestRun)
], TestCaseExecution.prototype, "testRun", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('ExecutionEntity', {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Object)
], TestCaseExecution.prototype, "pastExecution", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], TestCaseExecution.prototype, "pastExecutionId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)('ExecutionEntity', {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Object)
], TestCaseExecution.prototype, "execution", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], TestCaseExecution.prototype, "executionId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)('ExecutionEntity', {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Object)
], TestCaseExecution.prototype, "evaluationExecution", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], TestCaseExecution.prototype, "evaluationExecutionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TestCaseExecution.prototype, "status", void 0);
__decorate([
    (0, abstract_entity_1.DateTimeColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TestCaseExecution.prototype, "runAt", void 0);
__decorate([
    (0, abstract_entity_1.DateTimeColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TestCaseExecution.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", Object)
], TestCaseExecution.prototype, "errorCode", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TestCaseExecution.prototype, "errorDetails", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TestCaseExecution.prototype, "metrics", void 0);
exports.TestCaseExecution = TestCaseExecution = __decorate([
    (0, typeorm_1.Entity)({ name: 'test_case_execution' })
], TestCaseExecution);
//# sourceMappingURL=test-case-execution.ee.js.map