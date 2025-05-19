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
exports.ProjectRelationRepository = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const entities_1 = require("../entities");
let ProjectRelationRepository = class ProjectRelationRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.ProjectRelation, dataSource.manager);
    }
    async getPersonalProjectOwners(projectIds) {
        return await this.find({
            where: {
                projectId: (0, typeorm_1.In)(projectIds),
                role: 'project:personalOwner',
            },
            relations: { user: true },
        });
    }
    async getPersonalProjectsForUsers(userIds) {
        const projectRelations = await this.find({
            where: {
                userId: (0, typeorm_1.In)(userIds),
                role: 'project:personalOwner',
            },
        });
        return projectRelations.map((pr) => pr.projectId);
    }
    async findProjectRole({ userId, projectId }) {
        const relation = await this.findOneBy({ projectId, userId });
        return relation?.role ?? null;
    }
    async countUsersByRole() {
        const rows = (await this.createQueryBuilder()
            .select(['role', 'COUNT(role) as count'])
            .groupBy('role')
            .execute());
        return rows.reduce((acc, row) => {
            acc[row.role] = parseInt(row.count, 10);
            return acc;
        }, {});
    }
    async findUserIdsByProjectId(projectId) {
        const rows = await this.find({
            select: ['userId'],
            where: { projectId },
        });
        return [...new Set(rows.map((r) => r.userId))];
    }
    async findAllByUser(userId) {
        return await this.find({
            where: {
                userId,
            },
        });
    }
};
exports.ProjectRelationRepository = ProjectRelationRepository;
exports.ProjectRelationRepository = ProjectRelationRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ProjectRelationRepository);
//# sourceMappingURL=project-relation.repository.js.map