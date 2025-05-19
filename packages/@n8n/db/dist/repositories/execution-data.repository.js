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
exports.ExecutionDataRepository = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const entities_1 = require("../entities");
let ExecutionDataRepository = class ExecutionDataRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.ExecutionData, dataSource.manager);
    }
    async createExecutionDataForExecution(data, transactionManager) {
        return await transactionManager.insert(entities_1.ExecutionData, data);
    }
    async findByExecutionIds(executionIds) {
        return await this.find({
            select: ['workflowData'],
            where: {
                executionId: (0, typeorm_1.In)(executionIds),
            },
        }).then((executionData) => executionData.map(({ workflowData }) => workflowData));
    }
};
exports.ExecutionDataRepository = ExecutionDataRepository;
exports.ExecutionDataRepository = ExecutionDataRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ExecutionDataRepository);
//# sourceMappingURL=execution-data.repository.js.map