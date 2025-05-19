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
exports.SharedCredentialsRepository = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const entities_1 = require("../entities");
let SharedCredentialsRepository = class SharedCredentialsRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.SharedCredentials, dataSource.manager);
    }
    async findByCredentialIds(credentialIds, role) {
        return await this.find({
            relations: { credentials: true, project: { projectRelations: { user: true } } },
            where: {
                credentialsId: (0, typeorm_1.In)(credentialIds),
                role,
            },
        });
    }
    async makeOwnerOfAllCredentials(project) {
        return await this.update({
            projectId: (0, typeorm_1.Not)(project.id),
            role: 'credential:owner',
        }, { project });
    }
    async makeOwner(credentialIds, projectId, trx) {
        trx = trx ?? this.manager;
        return await trx.upsert(entities_1.SharedCredentials, credentialIds.map((credentialsId) => ({
            projectId,
            credentialsId,
            role: 'credential:owner',
        })), ['projectId', 'credentialsId']);
    }
    async deleteByIds(sharedCredentialsIds, projectId, trx) {
        trx = trx ?? this.manager;
        return await trx.delete(entities_1.SharedCredentials, {
            projectId,
            credentialsId: (0, typeorm_1.In)(sharedCredentialsIds),
        });
    }
    async getFilteredAccessibleCredentials(projectIds, credentialsIds) {
        return (await this.find({
            where: {
                projectId: (0, typeorm_1.In)(projectIds),
                credentialsId: (0, typeorm_1.In)(credentialsIds),
            },
            select: ['credentialsId'],
        })).map((s) => s.credentialsId);
    }
    async findCredentialOwningProject(credentialsId) {
        return (await this.findOne({
            where: { credentialsId, role: 'credential:owner' },
            relations: { project: true },
        }))?.project;
    }
    async getAllRelationsForCredentials(credentialIds) {
        return await this.find({
            where: {
                credentialsId: (0, typeorm_1.In)(credentialIds),
            },
            relations: ['project'],
        });
    }
    async findCredentialsWithOptions(where = {}, trx) {
        trx = trx ?? this.manager;
        return await trx.find(entities_1.SharedCredentials, {
            where,
            relations: {
                credentials: {
                    shared: { project: { projectRelations: { user: true } } },
                },
            },
        });
    }
    async findCredentialsByRoles(userIds, projectRoles, credentialRoles, trx) {
        trx = trx ?? this.manager;
        return await trx.find(entities_1.SharedCredentials, {
            where: {
                role: (0, typeorm_1.In)(credentialRoles),
                project: {
                    projectRelations: {
                        userId: (0, typeorm_1.In)(userIds),
                        role: (0, typeorm_1.In)(projectRoles),
                    },
                },
            },
        });
    }
};
exports.SharedCredentialsRepository = SharedCredentialsRepository;
exports.SharedCredentialsRepository = SharedCredentialsRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SharedCredentialsRepository);
//# sourceMappingURL=shared-credentials.repository.js.map