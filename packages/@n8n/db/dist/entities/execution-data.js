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
exports.ExecutionData = void 0;
const typeorm_1 = require("@n8n/typeorm");
const abstract_entity_1 = require("./abstract-entity");
const execution_entity_1 = require("./execution-entity");
const transformers_1 = require("../utils/transformers");
let ExecutionData = class ExecutionData {
};
exports.ExecutionData = ExecutionData;
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ExecutionData.prototype, "data", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)(),
    __metadata("design:type", Object)
], ExecutionData.prototype, "workflowData", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ transformer: transformers_1.idStringifier }),
    __metadata("design:type", String)
], ExecutionData.prototype, "executionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('ExecutionEntity', 'data', {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", execution_entity_1.ExecutionEntity)
], ExecutionData.prototype, "execution", void 0);
exports.ExecutionData = ExecutionData = __decorate([
    (0, typeorm_1.Entity)()
], ExecutionData);
//# sourceMappingURL=execution-data.js.map