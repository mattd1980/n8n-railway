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
exports.ExecutionsController = void 0;
const decorators_1 = require("@n8n/decorators");
const bad_request_error_1 = require("../errors/response-errors/bad-request.error");
const not_found_error_1 = require("../errors/response-errors/not-found.error");
const license_1 = require("../license");
const utils_1 = require("../utils");
const workflow_sharing_service_1 = require("../workflows/workflow-sharing.service");
const execution_service_1 = require("./execution.service");
const execution_service_ee_1 = require("./execution.service.ee");
const parse_range_query_middleware_1 = require("./parse-range-query.middleware");
const validation_1 = require("./validation");
let ExecutionsController = class ExecutionsController {
    constructor(executionService, enterpriseExecutionService, workflowSharingService, license) {
        this.executionService = executionService;
        this.enterpriseExecutionService = enterpriseExecutionService;
        this.workflowSharingService = workflowSharingService;
        this.license = license;
    }
    async getAccessibleWorkflowIds(user, scope) {
        if (this.license.isSharingEnabled()) {
            return await this.workflowSharingService.getSharedWorkflowIds(user, { scopes: [scope] });
        }
        else {
            return await this.workflowSharingService.getSharedWorkflowIds(user, {
                workflowRoles: ['workflow:owner'],
                projectRoles: ['project:personalOwner'],
            });
        }
    }
    async getMany(req) {
        const accessibleWorkflowIds = await this.getAccessibleWorkflowIds(req.user, 'workflow:read');
        if (accessibleWorkflowIds.length === 0) {
            return { count: 0, estimated: false, results: [] };
        }
        const { rangeQuery: query } = req;
        if (query.workflowId && !accessibleWorkflowIds.includes(query.workflowId)) {
            return { count: 0, estimated: false, results: [] };
        }
        query.accessibleWorkflowIds = accessibleWorkflowIds;
        if (!this.license.isAdvancedExecutionFiltersEnabled()) {
            delete query.metadata;
            delete query.annotationTags;
        }
        const noStatus = !query.status || query.status.length === 0;
        const noRange = !query.range.lastId || !query.range.firstId;
        if (noStatus && noRange) {
            const executions = await this.executionService.findLatestCurrentAndCompleted(query);
            await this.executionService.addScopes(req.user, executions.results);
            return executions;
        }
        const executions = await this.executionService.findRangeWithCount(query);
        await this.executionService.addScopes(req.user, executions.results);
        return executions;
    }
    async getOne(req) {
        if (!(0, utils_1.isPositiveInteger)(req.params.id)) {
            throw new bad_request_error_1.BadRequestError('Execution ID is not a number');
        }
        const workflowIds = await this.getAccessibleWorkflowIds(req.user, 'workflow:read');
        if (workflowIds.length === 0)
            throw new not_found_error_1.NotFoundError('Execution not found');
        return this.license.isSharingEnabled()
            ? await this.enterpriseExecutionService.findOne(req, workflowIds)
            : await this.executionService.findOne(req, workflowIds);
    }
    async stop(req) {
        const workflowIds = await this.getAccessibleWorkflowIds(req.user, 'workflow:execute');
        if (workflowIds.length === 0)
            throw new not_found_error_1.NotFoundError('Execution not found');
        return await this.executionService.stop(req.params.id);
    }
    async retry(req) {
        const workflowIds = await this.getAccessibleWorkflowIds(req.user, 'workflow:execute');
        if (workflowIds.length === 0)
            throw new not_found_error_1.NotFoundError('Execution not found');
        return await this.executionService.retry(req, workflowIds);
    }
    async delete(req) {
        const workflowIds = await this.getAccessibleWorkflowIds(req.user, 'workflow:execute');
        if (workflowIds.length === 0)
            throw new not_found_error_1.NotFoundError('Execution not found');
        return await this.executionService.delete(req, workflowIds);
    }
    async update(req) {
        if (!(0, utils_1.isPositiveInteger)(req.params.id)) {
            throw new bad_request_error_1.BadRequestError('Execution ID is not a number');
        }
        const workflowIds = await this.getAccessibleWorkflowIds(req.user, 'workflow:read');
        if (workflowIds.length === 0)
            throw new not_found_error_1.NotFoundError('Execution not found');
        const { body: payload } = req;
        const validatedPayload = (0, validation_1.validateExecutionUpdatePayload)(payload);
        await this.executionService.annotate(req.params.id, validatedPayload, workflowIds);
        return await this.executionService.findOne(req, workflowIds);
    }
};
exports.ExecutionsController = ExecutionsController;
__decorate([
    (0, decorators_1.Get)('/', { middlewares: [parse_range_query_middleware_1.parseRangeQuery] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExecutionsController.prototype, "getMany", null);
__decorate([
    (0, decorators_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExecutionsController.prototype, "getOne", null);
__decorate([
    (0, decorators_1.Post)('/:id/stop'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExecutionsController.prototype, "stop", null);
__decorate([
    (0, decorators_1.Post)('/:id/retry'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExecutionsController.prototype, "retry", null);
__decorate([
    (0, decorators_1.Post)('/delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExecutionsController.prototype, "delete", null);
__decorate([
    (0, decorators_1.Patch)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExecutionsController.prototype, "update", null);
exports.ExecutionsController = ExecutionsController = __decorate([
    (0, decorators_1.RestController)('/executions'),
    __metadata("design:paramtypes", [execution_service_1.ExecutionService,
        execution_service_ee_1.EnterpriseExecutionsService,
        workflow_sharing_service_1.WorkflowSharingService,
        license_1.License])
], ExecutionsController);
//# sourceMappingURL=executions.controller.js.map