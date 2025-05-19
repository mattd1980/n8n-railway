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
exports.ProjectRepository = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const entities_1 = require("../entities");
let ProjectRepository = class ProjectRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.Project, dataSource.manager);
    }
    async getPersonalProjectForUser(userId, entityManager) {
        const em = entityManager ?? this.manager;
        return await em.findOne(entities_1.Project, {
            where: { type: 'personal', projectRelations: { userId, role: 'project:personalOwner' } },
        });
    }
    async getPersonalProjectForUserOrFail(userId, entityManager) {
        const em = entityManager ?? this.manager;
        return await em.findOneOrFail(entities_1.Project, {
            where: { type: 'personal', projectRelations: { userId, role: 'project:personalOwner' } },
        });
    }
    async getAccessibleProjects(userId) {
        return await this.find({
            where: [
                { type: 'personal' },
                {
                    projectRelations: {
                        userId,
                    },
                },
            ],
        });
    }
    async getProjectCounts() {
        return {
            personal: await this.count({ where: { type: 'personal' } }),
            team: await this.count({ where: { type: 'team' } }),
        };
    }
};
exports.ProjectRepository = ProjectRepository;
exports.ProjectRepository = ProjectRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ProjectRepository);
//# sourceMappingURL=project.repository.js.map