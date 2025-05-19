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
exports.TestDefinitionService = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const bad_request_error_1 = require("../errors/response-errors/bad-request.error");
const not_found_error_1 = require("../errors/response-errors/not-found.error");
const generic_helpers_1 = require("../generic-helpers");
const telemetry_1 = require("../telemetry");
let TestDefinitionService = class TestDefinitionService {
    constructor(testDefinitionRepository, annotationTagRepository, telemetry) {
        this.testDefinitionRepository = testDefinitionRepository;
        this.annotationTagRepository = annotationTagRepository;
        this.telemetry = telemetry;
    }
    toEntityLike(attrs) {
        const entity = {};
        if (attrs.id) {
            entity.id = attrs.id;
        }
        if (attrs.name) {
            entity.name = attrs.name?.trim();
        }
        if (attrs.description) {
            entity.description = attrs.description.trim();
        }
        if (attrs.workflowId) {
            entity.workflow = {
                id: attrs.workflowId,
            };
        }
        if (attrs.evaluationWorkflowId) {
            entity.evaluationWorkflow = {
                id: attrs.evaluationWorkflowId,
            };
        }
        if (attrs.annotationTagId) {
            entity.annotationTag = {
                id: attrs.annotationTagId,
            };
        }
        if (attrs.mockedNodes) {
            entity.mockedNodes = attrs.mockedNodes;
        }
        return entity;
    }
    toEntity(attrs) {
        const entity = this.toEntityLike(attrs);
        return this.testDefinitionRepository.create(entity);
    }
    async findOne(id, accessibleWorkflowIds) {
        return await this.testDefinitionRepository.getOne(id, accessibleWorkflowIds);
    }
    async save(test) {
        await (0, generic_helpers_1.validateEntity)(test);
        return await this.testDefinitionRepository.save(test);
    }
    async update(id, attrs) {
        const existingTestDefinition = await this.testDefinitionRepository.findOneOrFail({
            where: {
                id,
            },
            relations: ['workflow'],
        });
        if (attrs.name) {
            const updatedTest = this.toEntity(attrs);
            await (0, generic_helpers_1.validateEntity)(updatedTest);
        }
        if (attrs.annotationTagId) {
            const annotationTagExists = await this.annotationTagRepository.exists({
                where: {
                    id: attrs.annotationTagId,
                },
            });
            if (!annotationTagExists) {
                throw new bad_request_error_1.BadRequestError('Annotation tag not found');
            }
        }
        if (attrs.mockedNodes && attrs.mockedNodes.length > 0) {
            const existingNodeNames = new Map(existingTestDefinition.workflow.nodes.map((n) => [n.name, n]));
            const existingNodeIds = new Map(existingTestDefinition.workflow.nodes.map((n) => [n.id, n]));
            attrs.mockedNodes = attrs.mockedNodes.filter((node) => existingNodeIds.has(node.id) || (node.name && existingNodeNames.has(node.name)));
            attrs.mockedNodes = attrs.mockedNodes.map((node) => {
                return {
                    id: node.id ?? (node.name && existingNodeNames.get(node.name)?.id),
                    name: node.name ?? (node.id && existingNodeIds.get(node.id)?.name),
                };
            });
        }
        const queryResult = await this.testDefinitionRepository.update(id, this.toEntityLike(attrs));
        if (queryResult.affected === 0) {
            throw new not_found_error_1.NotFoundError('Test definition not found');
        }
        if (attrs.annotationTagId && attrs.annotationTagId !== existingTestDefinition.annotationTagId) {
            this.telemetry.track('User added tag to test', {
                test_id: id,
                tag_id: attrs.annotationTagId,
            });
        }
        if (attrs.evaluationWorkflowId &&
            existingTestDefinition.evaluationWorkflowId !== attrs.evaluationWorkflowId) {
            this.telemetry.track('User added evaluation workflow to test', {
                test_id: id,
                subworkflow_id: attrs.evaluationWorkflowId,
            });
        }
    }
    async delete(id, accessibleWorkflowIds) {
        const deleteResult = await this.testDefinitionRepository.deleteById(id, accessibleWorkflowIds);
        if (deleteResult.affected === 0) {
            throw new not_found_error_1.NotFoundError('Test definition not found');
        }
        this.telemetry.track('User deleted a test', { test_id: id });
    }
    async getMany(options, accessibleWorkflowIds = []) {
        return await this.testDefinitionRepository.getMany(accessibleWorkflowIds, options);
    }
};
exports.TestDefinitionService = TestDefinitionService;
exports.TestDefinitionService = TestDefinitionService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [db_1.TestDefinitionRepository,
        db_1.AnnotationTagRepository,
        telemetry_1.Telemetry])
], TestDefinitionService);
//# sourceMappingURL=test-definition.service.ee.js.map