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
exports.TestCaseExecutionRepository = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const entities_1 = require("../entities");
let TestCaseExecutionRepository = class TestCaseExecutionRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.TestCaseExecution, dataSource.manager);
    }
    async createBatch(testRunId, pastExecutionIds) {
        const mappings = this.create(pastExecutionIds.map((id) => ({
            testRun: {
                id: testRunId,
            },
            pastExecution: {
                id,
            },
            status: 'new',
        })));
        return await this.save(mappings);
    }
    async markAsRunning({ testRunId, pastExecutionId, executionId, trx }) {
        trx = trx ?? this.manager;
        return await trx.update(entities_1.TestCaseExecution, { testRun: { id: testRunId }, pastExecutionId }, {
            status: 'running',
            executionId,
            runAt: new Date(),
        });
    }
    async markAsEvaluationRunning({ testRunId, pastExecutionId, evaluationExecutionId, trx, }) {
        trx = trx ?? this.manager;
        return await trx.update(entities_1.TestCaseExecution, { testRun: { id: testRunId }, pastExecutionId }, {
            status: 'evaluation_running',
            evaluationExecutionId,
        });
    }
    async markAsCompleted({ testRunId, pastExecutionId, metrics, trx }) {
        trx = trx ?? this.manager;
        return await trx.update(entities_1.TestCaseExecution, { testRun: { id: testRunId }, pastExecutionId }, {
            status: 'success',
            completedAt: new Date(),
            metrics,
        });
    }
    async markAllPendingAsCancelled(testRunId, trx) {
        trx = trx ?? this.manager;
        return await trx.update(entities_1.TestCaseExecution, { testRun: { id: testRunId }, status: (0, typeorm_1.Not)((0, typeorm_1.In)(['success', 'error', 'cancelled'])) }, {
            status: 'cancelled',
            completedAt: new Date(),
        });
    }
    async markAsFailed({ testRunId, pastExecutionId, errorCode, errorDetails, trx, }) {
        trx = trx ?? this.manager;
        return await trx.update(entities_1.TestCaseExecution, { testRun: { id: testRunId }, pastExecutionId }, {
            status: 'error',
            completedAt: new Date(),
            errorCode,
            errorDetails,
        });
    }
    async markAsWarning({ testRunId, pastExecutionId, errorCode, errorDetails, }) {
        return await this.update({ testRun: { id: testRunId }, pastExecutionId }, {
            status: 'warning',
            completedAt: new Date(),
            errorCode,
            errorDetails,
        });
    }
};
exports.TestCaseExecutionRepository = TestCaseExecutionRepository;
exports.TestCaseExecutionRepository = TestCaseExecutionRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TestCaseExecutionRepository);
//# sourceMappingURL=test-case-execution.repository.ee.js.map