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
exports.UserRepository = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const entities_1 = require("../entities");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.User, dataSource.manager);
    }
    async findManyByIds(userIds) {
        return await this.find({
            where: { id: (0, typeorm_1.In)(userIds) },
        });
    }
    async update(...args) {
        return await super.update(...args);
    }
    async deleteAllExcept(user) {
        await this.delete({ id: (0, typeorm_1.Not)(user.id) });
    }
    async getByIds(transaction, ids) {
        return await transaction.find(entities_1.User, { where: { id: (0, typeorm_1.In)(ids) } });
    }
    async findManyByEmail(emails) {
        return await this.find({
            where: { email: (0, typeorm_1.In)(emails) },
            select: ['email', 'password', 'id'],
        });
    }
    async deleteMany(userIds) {
        return await this.delete({ id: (0, typeorm_1.In)(userIds) });
    }
    async findNonShellUser(email) {
        return await this.findOne({
            where: {
                email,
                password: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
            },
            relations: ['authIdentities'],
        });
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
    async toFindManyOptions(listQueryOptions) {
        const findManyOptions = {};
        if (!listQueryOptions) {
            findManyOptions.relations = ['authIdentities'];
            return findManyOptions;
        }
        const { filter, select, take, skip } = listQueryOptions;
        if (select)
            findManyOptions.select = select;
        if (take)
            findManyOptions.take = take;
        if (skip)
            findManyOptions.skip = skip;
        if (take && !select) {
            findManyOptions.relations = ['authIdentities'];
        }
        if (take && select && !select?.id) {
            findManyOptions.select = { ...findManyOptions.select, id: true };
        }
        if (filter) {
            const { isOwner, ...otherFilters } = filter;
            findManyOptions.where = otherFilters;
            if (isOwner !== undefined) {
                findManyOptions.where.role = isOwner ? 'global:owner' : (0, typeorm_1.Not)('global:owner');
            }
        }
        return findManyOptions;
    }
    async getEmailsByIds(userIds) {
        return await this.find({
            select: ['email'],
            where: { id: (0, typeorm_1.In)(userIds), password: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
        });
    }
    async createUserWithProject(user, transactionManager) {
        const createInner = async (entityManager) => {
            const newUser = entityManager.create(entities_1.User, user);
            const savedUser = await entityManager.save(newUser);
            const savedProject = await entityManager.save(entityManager.create(entities_1.Project, {
                type: 'personal',
                name: savedUser.createPersonalProjectName(),
            }));
            await entityManager.save(entityManager.create(entities_1.ProjectRelation, {
                projectId: savedProject.id,
                userId: savedUser.id,
                role: 'project:personalOwner',
            }));
            return { user: savedUser, project: savedProject };
        };
        if (transactionManager) {
            return await createInner(transactionManager);
        }
        return await createInner(this.manager);
    }
    async findPersonalOwnerForWorkflow(workflowId) {
        return await this.findOne({
            where: {
                projectRelations: {
                    role: 'project:personalOwner',
                    project: { sharedWorkflows: { workflowId, role: 'workflow:owner' } },
                },
            },
        });
    }
    async findPersonalOwnerForProject(projectId) {
        return await this.findOne({
            where: {
                projectRelations: {
                    role: 'project:personalOwner',
                    projectId,
                },
            },
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
//# sourceMappingURL=user.repository.js.map