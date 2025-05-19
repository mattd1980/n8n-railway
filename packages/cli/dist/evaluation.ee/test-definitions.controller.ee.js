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
exports.TestDefinitionsController = void 0;
const decorators_1 = require("@n8n/decorators");
const express_1 = __importDefault(require("express"));
const n8n_workflow_1 = require("n8n-workflow");
const node_assert_1 = __importDefault(require("node:assert"));
const forbidden_error_1 = require("../errors/response-errors/forbidden.error");
const not_found_error_1 = require("../errors/response-errors/not-found.error");
const test_definition_schema_1 = require("../evaluation.ee/test-definition.schema");
const test_runner_service_ee_1 = require("../evaluation.ee/test-runner/test-runner.service.ee");
const middlewares_1 = require("../middlewares");
const workflows_service_1 = require("../public-api/v1/handlers/workflows/workflows.service");
const test_definition_service_ee_1 = require("./test-definition.service.ee");
let TestDefinitionsController = class TestDefinitionsController {
    constructor(testDefinitionService, testRunnerService) {
        this.testDefinitionService = testDefinitionService;
        this.testRunnerService = testRunnerService;
    }
    async getMany(req) {
        const userAccessibleWorkflowIds = await (0, workflows_service_1.getSharedWorkflowIds)(req.user, ['workflow:read']);
        try {
            return await this.testDefinitionService.getMany(req.listQueryOptions, userAccessibleWorkflowIds);
        }
        catch (error) {
            if (error instanceof n8n_workflow_1.UserError)
                throw new forbidden_error_1.ForbiddenError(error.message);
            throw error;
        }
    }
    async getOne(req) {
        const { id: testDefinitionId } = req.params;
        const userAccessibleWorkflowIds = await (0, workflows_service_1.getSharedWorkflowIds)(req.user, ['workflow:read']);
        const testDefinition = await this.testDefinitionService.findOne(testDefinitionId, userAccessibleWorkflowIds);
        if (!testDefinition)
            throw new not_found_error_1.NotFoundError('Test definition not found');
        return testDefinition;
    }
    async create(req, res) {
        const bodyParseResult = test_definition_schema_1.testDefinitionCreateRequestBodySchema.safeParse(req.body);
        if (!bodyParseResult.success) {
            res.status(400).json({ errors: bodyParseResult.error.errors });
            return;
        }
        const userAccessibleWorkflowIds = await (0, workflows_service_1.getSharedWorkflowIds)(req.user, ['workflow:read']);
        if (!userAccessibleWorkflowIds.includes(req.body.workflowId)) {
            throw new forbidden_error_1.ForbiddenError('User does not have access to the workflow');
        }
        if (req.body.evaluationWorkflowId &&
            !userAccessibleWorkflowIds.includes(req.body.evaluationWorkflowId)) {
            throw new forbidden_error_1.ForbiddenError('User does not have access to the evaluation workflow');
        }
        return await this.testDefinitionService.save(this.testDefinitionService.toEntity(bodyParseResult.data));
    }
    async delete(req) {
        const { id: testDefinitionId } = req.params;
        const userAccessibleWorkflowIds = await (0, workflows_service_1.getSharedWorkflowIds)(req.user, ['workflow:read']);
        if (userAccessibleWorkflowIds.length === 0)
            throw new forbidden_error_1.ForbiddenError('User does not have access to any workflows');
        await this.testDefinitionService.delete(testDefinitionId, userAccessibleWorkflowIds);
        return { success: true };
    }
    async patch(req, res) {
        const { id: testDefinitionId } = req.params;
        const bodyParseResult = test_definition_schema_1.testDefinitionPatchRequestBodySchema.safeParse(req.body);
        if (!bodyParseResult.success) {
            res.status(400).json({ errors: bodyParseResult.error.errors });
            return;
        }
        const userAccessibleWorkflowIds = await (0, workflows_service_1.getSharedWorkflowIds)(req.user, ['workflow:read']);
        if (userAccessibleWorkflowIds.length === 0)
            throw new forbidden_error_1.ForbiddenError('User does not have access to any workflows');
        const existingTest = await this.testDefinitionService.findOne(testDefinitionId, userAccessibleWorkflowIds);
        if (!existingTest)
            throw new not_found_error_1.NotFoundError('Test definition not found');
        if (req.body.evaluationWorkflowId &&
            !userAccessibleWorkflowIds.includes(req.body.evaluationWorkflowId)) {
            throw new forbidden_error_1.ForbiddenError('User does not have access to the evaluation workflow');
        }
        await this.testDefinitionService.update(testDefinitionId, req.body);
        const testDefinition = await this.testDefinitionService.findOne(testDefinitionId, userAccessibleWorkflowIds);
        (0, node_assert_1.default)(testDefinition, 'Test definition not found');
        return testDefinition;
    }
    async runTest(req, res) {
        const { id: testDefinitionId } = req.params;
        const workflowIds = await (0, workflows_service_1.getSharedWorkflowIds)(req.user, ['workflow:read']);
        const testDefinition = await this.testDefinitionService.findOne(testDefinitionId, workflowIds);
        if (!testDefinition)
            throw new not_found_error_1.NotFoundError('Test definition not found');
        void this.testRunnerService.runTest(req.user, testDefinition);
        res.status(202).json({ success: true });
    }
    async exampleEvaluationInput(req) {
        const { id: testDefinitionId } = req.params;
        const { annotationTagId } = req.query;
        const workflowIds = await (0, workflows_service_1.getSharedWorkflowIds)(req.user, ['workflow:read']);
        const testDefinition = await this.testDefinitionService.findOne(testDefinitionId, workflowIds);
        if (!testDefinition)
            throw new not_found_error_1.NotFoundError('Test definition not found');
        return await this.testRunnerService.getExampleEvaluationInputData(testDefinition, annotationTagId);
    }
};
exports.TestDefinitionsController = TestDefinitionsController;
__decorate([
    (0, decorators_1.Get)('/', { middlewares: middlewares_1.listQueryMiddleware }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestDefinitionsController.prototype, "getMany", null);
__decorate([
    (0, decorators_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestDefinitionsController.prototype, "getOne", null);
__decorate([
    (0, decorators_1.Post)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TestDefinitionsController.prototype, "create", null);
__decorate([
    (0, decorators_1.Delete)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestDefinitionsController.prototype, "delete", null);
__decorate([
    (0, decorators_1.Patch)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TestDefinitionsController.prototype, "patch", null);
__decorate([
    (0, decorators_1.Post)('/:id/run'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TestDefinitionsController.prototype, "runTest", null);
__decorate([
    (0, decorators_1.Get)('/:id/example-evaluation-input'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestDefinitionsController.prototype, "exampleEvaluationInput", null);
exports.TestDefinitionsController = TestDefinitionsController = __decorate([
    (0, decorators_1.RestController)('/evaluation/test-definitions'),
    __metadata("design:paramtypes", [test_definition_service_ee_1.TestDefinitionService,
        test_runner_service_ee_1.TestRunnerService])
], TestDefinitionsController);
//# sourceMappingURL=test-definitions.controller.ee.js.map