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
exports.CredentialsRepository = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const entities_1 = require("../entities");
let CredentialsRepository = class CredentialsRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.CredentialsEntity, dataSource.manager);
    }
    async findStartingWith(credentialName) {
        return await this.find({
            select: ['name'],
            where: { name: (0, typeorm_1.Like)(`${credentialName}%`) },
        });
    }
    async findMany(listQueryOptions, credentialIds) {
        const findManyOptions = this.toFindManyOptions(listQueryOptions);
        if (credentialIds) {
            findManyOptions.where = { ...findManyOptions.where, id: (0, typeorm_1.In)(credentialIds) };
        }
        return await this.find(findManyOptions);
    }
    toFindManyOptions(listQueryOptions) {
        const findManyOptions = {};
        const defaultRelations = ['shared', 'shared.project', 'shared.project.projectRelations'];
        const defaultSelect = ['id', 'name', 'type', 'isManaged', 'createdAt', 'updatedAt'];
        if (!listQueryOptions)
            return { select: defaultSelect, relations: defaultRelations };
        const { filter, select, take, skip } = listQueryOptions;
        if (typeof filter?.name === 'string' && filter?.name !== '') {
            filter.name = (0, typeorm_1.Like)(`%${filter.name}%`);
        }
        if (typeof filter?.type === 'string' && filter?.type !== '') {
            filter.type = (0, typeorm_1.Like)(`%${filter.type}%`);
        }
        this.handleSharedFilters(listQueryOptions);
        if (filter)
            findManyOptions.where = filter;
        if (select)
            findManyOptions.select = select;
        if (take)
            findManyOptions.take = take;
        if (skip)
            findManyOptions.skip = skip;
        if (take && select && !select?.id) {
            findManyOptions.select = { ...findManyOptions.select, id: true };
        }
        if (!findManyOptions.select) {
            findManyOptions.select = defaultSelect;
            findManyOptions.relations = defaultRelations;
        }
        if (listQueryOptions.includeData) {
            if (Array.isArray(findManyOptions.select)) {
                findManyOptions.select.push('data');
            }
            else {
                findManyOptions.select.data = true;
            }
        }
        return findManyOptions;
    }
    handleSharedFilters(listQueryOptions) {
        if (!listQueryOptions?.filter)
            return;
        const { filter } = listQueryOptions;
        if (typeof filter.projectId === 'string' && filter.projectId !== '') {
            filter.shared = {
                projectId: filter.projectId,
            };
            delete filter.projectId;
        }
        if (typeof filter.withRole === 'string' && filter.withRole !== '') {
            filter.shared = {
                ...(filter?.shared ? filter.shared : {}),
                role: filter.withRole,
            };
            delete filter.withRole;
        }
        if (filter.user &&
            typeof filter.user === 'object' &&
            'id' in filter.user &&
            typeof filter.user.id === 'string') {
            filter.shared = {
                ...(filter?.shared ? filter.shared : {}),
                project: {
                    projectRelations: {
                        userId: filter.user.id,
                    },
                },
            };
            delete filter.user;
        }
    }
    async getManyByIds(ids, { withSharings } = { withSharings: false }) {
        const findManyOptions = { where: { id: (0, typeorm_1.In)(ids) } };
        if (withSharings) {
            findManyOptions.relations = {
                shared: {
                    project: true,
                },
            };
        }
        return await this.find(findManyOptions);
    }
    async findAllPersonalCredentials() {
        return await this.findBy({ shared: { project: { type: 'personal' } } });
    }
    async findAllCredentialsForWorkflow(workflowId) {
        return await this.findBy({
            shared: { project: { sharedWorkflows: { workflowId } } },
        });
    }
    async findAllCredentialsForProject(projectId) {
        return await this.findBy({ shared: { projectId } });
    }
};
exports.CredentialsRepository = CredentialsRepository;
exports.CredentialsRepository = CredentialsRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CredentialsRepository);
//# sourceMappingURL=credentials.repository.js.map