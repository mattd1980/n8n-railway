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
exports.TagRepository = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const intersection_1 = __importDefault(require("lodash/intersection"));
const entities_1 = require("../entities");
let TagRepository = class TagRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.TagEntity, dataSource.manager);
    }
    async findMany(tagIds) {
        return await this.find({
            select: ['id', 'name'],
            where: { id: (0, typeorm_1.In)(tagIds) },
        });
    }
    async setTags(tx, dbTags, workflow) {
        if (!workflow?.tags?.length)
            return;
        for (let i = 0; i < workflow.tags.length; i++) {
            const importTag = workflow.tags[i];
            if (!importTag.name)
                continue;
            const identicalMatch = dbTags.find((dbTag) => dbTag.id === importTag.id &&
                dbTag.createdAt &&
                importTag.createdAt &&
                dbTag.createdAt.getTime() === new Date(importTag.createdAt).getTime());
            if (identicalMatch) {
                workflow.tags[i] = identicalMatch;
                continue;
            }
            const nameMatch = dbTags.find((dbTag) => dbTag.name === importTag.name);
            if (nameMatch) {
                workflow.tags[i] = nameMatch;
                continue;
            }
            const tagEntity = this.create(importTag);
            workflow.tags[i] = await tx.save(tagEntity);
        }
    }
    async getWorkflowIdsViaTags(tags) {
        const dbTags = await this.find({
            where: { name: (0, typeorm_1.In)(tags) },
            relations: ['workflows'],
        });
        const workflowIdsPerTag = dbTags.map((tag) => tag.workflows.map((workflow) => workflow.id));
        return (0, intersection_1.default)(...workflowIdsPerTag);
    }
};
exports.TagRepository = TagRepository;
exports.TagRepository = TagRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TagRepository);
//# sourceMappingURL=tag.repository.js.map