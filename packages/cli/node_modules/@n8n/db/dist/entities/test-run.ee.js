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
exports.TestRun = void 0;
const typeorm_1 = require("@n8n/typeorm");
const abstract_entity_1 = require("./abstract-entity");
const test_definition_ee_1 = require("./test-definition.ee");
let TestRun = class TestRun extends abstract_entity_1.WithTimestampsAndStringId {
};
exports.TestRun = TestRun;
__decorate([
    (0, typeorm_1.ManyToOne)('TestDefinition', 'runs'),
    __metadata("design:type", test_definition_ee_1.TestDefinition)
], TestRun.prototype, "testDefinition", void 0);
__decorate([
    (0, typeorm_1.RelationId)((testRun) => testRun.testDefinition),
    __metadata("design:type", String)
], TestRun.prototype, "testDefinitionId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], TestRun.prototype, "status", void 0);
__decorate([
    (0, abstract_entity_1.DateTimeColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TestRun.prototype, "runAt", void 0);
__decorate([
    (0, abstract_entity_1.DateTimeColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TestRun.prototype, "completedAt", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TestRun.prototype, "metrics", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: true }),
    __metadata("design:type", Number)
], TestRun.prototype, "totalCases", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: true }),
    __metadata("design:type", Number)
], TestRun.prototype, "passedCases", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { nullable: true }),
    __metadata("design:type", Number)
], TestRun.prototype, "failedCases", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, length: 255 }),
    __metadata("design:type", Object)
], TestRun.prototype, "errorCode", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TestRun.prototype, "errorDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('TestCaseExecution', 'testRun'),
    __metadata("design:type", Array)
], TestRun.prototype, "testCaseExecutions", void 0);
exports.TestRun = TestRun = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['testDefinition'])
], TestRun);
//# sourceMappingURL=test-run.ee.js.map