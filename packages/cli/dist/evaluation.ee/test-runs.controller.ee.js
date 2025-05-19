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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRunsController = void 0;
const db_1 = require("@n8n/db");
const decorators_1 = require("@n8n/decorators");
const express_1 = __importDefault(require("express"));
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const conflict_error_1 = require("../errors/response-errors/conflict.error");
const not_found_error_1 = require("../errors/response-errors/not-found.error");
const not_implemented_error_1 = require("../errors/response-errors/not-implemented.error");
const test_runner_service_ee_1 = require("../evaluation.ee/test-runner/test-runner.service.ee");
const middlewares_1 = require("../middlewares");
const workflows_service_1 = require("../public-api/v1/handlers/workflows/workflows.service");
const telemetry_1 = require("../telemetry");
const test_definition_service_ee_1 = require("./test-definition.service.ee");
let TestRunsController = class TestRunsController {
    constructor(testDefinitionService, testRunRepository, testCaseExecutionRepository, testRunnerService, instanceSettings, telemetry) {
        this.testDefinitionService = testDefinitionService;
        this.testRunRepository = testRunRepository;
        this.testCaseExecutionRepository = testCaseExecutionRepository;
        this.testRunnerService = testRunnerService;
        this.instanceSettings = instanceSettings;
        this.telemetry = telemetry;
    }
    async getTestDefinition(req) {
        const { testDefinitionId } = req.params;
        const userAccessibleWorkflowIds = await (0, workflows_service_1.getSharedWorkflowIds)(req.user, ['workflow:read']);
        const testDefinition = await this.testDefinitionService.findOne(testDefinitionId, userAccessibleWorkflowIds);
        if (!testDefinition)
            throw new not_found_error_1.NotFoundError('Test definition not found');
        return testDefinition;
    }
    async getTestRun(req) {
        const { id: testRunId, testDefinitionId } = req.params;
        const testRun = await this.testRunRepository.findOne({
            where: { id: testRunId, testDefinition: { id: testDefinitionId } },
        });
        if (!testRun)
            throw new not_found_error_1.NotFoundError('Test run not found');
        return testRun;
    }
    async getMany(req) {
        const { testDefinitionId } = req.params;
        await this.getTestDefinition(req);
        return await this.testRunRepository.getMany(testDefinitionId, req.listQueryOptions);
    }
    async getOne(req) {
        const { testDefinitionId, id } = req.params;
        await this.getTestDefinition(req);
        try {
            return await this.testRunRepository.getTestRunSummaryById(testDefinitionId, id);
        }
        catch (error) {
            if (error instanceof n8n_workflow_1.UnexpectedError)
                throw new not_found_error_1.NotFoundError(error.message);
            throw error;
        }
    }
    async getTestCases(req) {
        await this.getTestDefinition(req);
        await this.getTestRun(req);
        return await this.testCaseExecutionRepository.find({
            where: { testRun: { id: req.params.id } },
        });
    }
    async delete(req) {
        const { id: testRunId, testDefinitionId } = req.params;
        await this.getTestDefinition(req);
        await this.getTestRun(req);
        await this.testRunRepository.delete({ id: testRunId });
        this.telemetry.track('User deleted a run', { run_id: testRunId, test_id: testDefinitionId });
        return { success: true };
    }
    async cancel(req, res) {
        if (this.instanceSettings.isMultiMain) {
            throw new not_implemented_error_1.NotImplementedError('Cancelling test runs is not yet supported in multi-main mode');
        }
        const { id: testRunId } = req.params;
        await this.getTestDefinition(req);
        const testRun = await this.getTestRun(req);
        if (this.testRunnerService.canBeCancelled(testRun)) {
            const message = `The test run "${testRunId}" cannot be cancelled`;
            throw new conflict_error_1.ConflictError(message);
        }
        await this.testRunnerService.cancelTestRun(testRunId);
        res.status(202).json({ success: true });
    }
};
exports.TestRunsController = TestRunsController;
__decorate([
    (0, decorators_1.Get)('/:testDefinitionId/runs', { middlewares: middlewares_1.listQueryMiddleware }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestRunsController.prototype, "getMany", null);
__decorate([
    (0, decorators_1.Get)('/:testDefinitionId/runs/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestRunsController.prototype, "getOne", null);
__decorate([
    (0, decorators_1.Get)('/:testDefinitionId/runs/:id/cases'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestRunsController.prototype, "getTestCases", null);
__decorate([
    (0, decorators_1.Delete)('/:testDefinitionId/runs/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestRunsController.prototype, "delete", null);
__decorate([
    (0, decorators_1.Post)('/:testDefinitionId/runs/:id/cancel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TestRunsController.prototype, "cancel", null);
exports.TestRunsController = TestRunsController = __decorate([
    (0, decorators_1.RestController)('/evaluation/test-definitions'),
    __metadata("design:paramtypes", [test_definition_service_ee_1.TestDefinitionService,
        db_1.TestRunRepository,
        db_1.TestCaseExecutionRepository,
        test_runner_service_ee_1.TestRunnerService,
        n8n_core_1.InstanceSettings,
        telemetry_1.Telemetry])
], TestRunsController);
//# sourceMappingURL=test-runs.controller.ee.js.map