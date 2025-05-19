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
exports.WorkflowRepository = void 0;
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const n8n_workflow_1 = require("n8n-workflow");
const folder_repository_1 = require("./folder.repository");
const entities_1 = require("../entities");
const is_string_array_1 = require("../utils/is-string-array");
let WorkflowRepository = class WorkflowRepository extends typeorm_1.Repository {
    constructor(dataSource, globalConfig, folderRepository) {
        super(entities_1.WorkflowEntity, dataSource.manager);
        this.globalConfig = globalConfig;
        this.folderRepository = folderRepository;
    }
    async get(where, options) {
        return await this.findOne({
            where,
            relations: options?.relations,
        });
    }
    async getAllActiveIds() {
        const result = await this.find({
            select: { id: true },
            where: { active: true },
            relations: { shared: { project: { projectRelations: true } } },
        });
        return result.map(({ id }) => id);
    }
    async getActiveIds({ maxResults } = {}) {
        const activeWorkflows = await this.find({
            select: ['id'],
            where: { active: true },
            ...(maxResults ? { take: maxResults, order: { createdAt: 'ASC' } } : {}),
        });
        return activeWorkflows.map((workflow) => workflow.id);
    }
    async getActiveCount() {
        return await this.count({
            where: { active: true },
        });
    }
    async findById(workflowId) {
        return await this.findOne({
            where: { id: workflowId },
            relations: { shared: { project: { projectRelations: true } } },
        });
    }
    async findByIds(workflowIds, { fields } = {}) {
        const options = {
            where: { id: (0, typeorm_1.In)(workflowIds) },
        };
        if (fields?.length)
            options.select = fields;
        return await this.find(options);
    }
    async getActiveTriggerCount() {
        const totalTriggerCount = await this.sum('triggerCount', {
            active: true,
        });
        return totalTriggerCount ?? 0;
    }
    async updateWorkflowTriggerCount(id, triggerCount) {
        const qb = this.createQueryBuilder('workflow');
        const dbType = this.globalConfig.database.type;
        return await qb
            .update()
            .set({
            triggerCount,
            updatedAt: () => {
                if (['mysqldb', 'mariadb'].includes(dbType)) {
                    return 'updatedAt';
                }
                return '"updatedAt"';
            },
        })
            .where('id = :id', { id })
            .execute();
    }
    buildBaseUnionQuery(workflowIds, options = {}) {
        const subQueryParameters = {
            select: {
                createdAt: true,
                updatedAt: true,
                id: true,
                name: true,
            },
            filter: options.filter,
        };
        const columnNames = [...Object.keys(subQueryParameters.select ?? {}), 'resource'];
        const [sortByColumn, sortByDirection] = this.parseSortingParams(options.sortBy ?? 'updatedAt:asc');
        const foldersQuery = this.folderRepository
            .getManyQuery(subQueryParameters)
            .addSelect("'folder'", 'resource');
        const workflowsQuery = this.getManyQuery(workflowIds, subQueryParameters).addSelect("'workflow'", 'resource');
        const qb = this.manager.createQueryBuilder();
        return {
            baseQuery: qb
                .createQueryBuilder()
                .addCommonTableExpression(foldersQuery, 'FOLDERS_QUERY', { columnNames })
                .addCommonTableExpression(workflowsQuery, 'WORKFLOWS_QUERY', { columnNames })
                .addCommonTableExpression(`SELECT * FROM ${qb.escape('FOLDERS_QUERY')} UNION ALL SELECT * FROM ${qb.escape('WORKFLOWS_QUERY')}`, 'RESULT_QUERY'),
            sortByColumn,
            sortByDirection,
        };
    }
    async getWorkflowsAndFoldersUnion(workflowIds, options = {}) {
        const { baseQuery, sortByColumn, sortByDirection } = this.buildBaseUnionQuery(workflowIds, options);
        const query = this.buildUnionQuery(baseQuery, {
            sortByColumn,
            sortByDirection,
            pagination: {
                take: options.take,
                skip: options.skip ?? 0,
            },
        });
        const workflowsAndFolders = await query.getRawMany();
        return this.removeNameLowerFromResults(workflowsAndFolders);
    }
    buildUnionQuery(baseQuery, options) {
        const query = baseQuery
            .select(`${baseQuery.escape('RESULT')}.*`)
            .from('RESULT_QUERY', 'RESULT');
        this.applySortingToUnionQuery(query, baseQuery, options);
        this.applyPaginationToUnionQuery(query, options.pagination);
        return query;
    }
    applySortingToUnionQuery(query, baseQuery, options) {
        const { sortByColumn, sortByDirection } = options;
        const resultTableEscaped = baseQuery.escape('RESULT');
        const nameColumnEscaped = baseQuery.escape('name');
        const resourceColumnEscaped = baseQuery.escape('resource');
        const sortByColumnEscaped = baseQuery.escape(sortByColumn);
        query.orderBy(`${resultTableEscaped}.${resourceColumnEscaped}`, 'ASC');
        if (sortByColumn === 'name') {
            query
                .addSelect(`LOWER(${resultTableEscaped}.${nameColumnEscaped})`, 'name_lower')
                .addOrderBy('name_lower', sortByDirection);
        }
        else {
            query.addOrderBy(`${resultTableEscaped}.${sortByColumnEscaped}`, sortByDirection);
        }
    }
    applyPaginationToUnionQuery(query, pagination) {
        if (pagination.take) {
            query.take(pagination.take);
        }
        query.skip(pagination.skip);
    }
    removeNameLowerFromResults(results) {
        return results.map(({ name_lower, ...rest }) => rest);
    }
    async getWorkflowsAndFoldersCount(workflowIds, options = {}) {
        const { skip, take, ...baseQueryParameters } = options;
        const { baseQuery } = this.buildBaseUnionQuery(workflowIds, baseQueryParameters);
        const response = await baseQuery
            .select(`COUNT(DISTINCT ${baseQuery.escape('RESULT')}.${baseQuery.escape('id')})`, 'count')
            .from('RESULT_QUERY', 'RESULT')
            .select('COUNT(*)', 'count')
            .getRawOne();
        return Number(response?.count) || 0;
    }
    async getWorkflowsAndFoldersWithCount(workflowIds, options = {}) {
        if (options.filter?.parentFolderId &&
            typeof options.filter?.parentFolderId === 'string' &&
            options.filter.parentFolderId !== n8n_workflow_1.PROJECT_ROOT &&
            typeof options.filter?.projectId === 'string' &&
            options.filter.name) {
            const folderIds = await this.folderRepository.getAllFolderIdsInHierarchy(options.filter.parentFolderId, options.filter.projectId);
            options.filter.parentFolderIds = [options.filter.parentFolderId, ...folderIds];
            options.filter.folderIds = folderIds;
            delete options.filter.parentFolderId;
        }
        const [workflowsAndFolders, count] = await Promise.all([
            this.getWorkflowsAndFoldersUnion(workflowIds, options),
            this.getWorkflowsAndFoldersCount(workflowIds, options),
        ]);
        const isArchived = typeof options.filter?.isArchived === 'boolean' ? options.filter.isArchived : undefined;
        const { workflows, folders } = await this.fetchExtraData(workflowsAndFolders, isArchived);
        const enrichedWorkflowsAndFolders = this.enrichDataWithExtras(workflowsAndFolders, {
            workflows,
            folders,
        });
        return [enrichedWorkflowsAndFolders, count];
    }
    async getAllWorkflowIdsInHierarchy(folderId, projectId) {
        const subFolderIds = await this.folderRepository.getAllFolderIdsInHierarchy(folderId, projectId);
        const query = this.createQueryBuilder('workflow');
        this.applySelect(query, { id: true });
        this.applyParentFolderFilter(query, { parentFolderIds: [folderId, ...subFolderIds] });
        const workflowIds = (await query.getMany()).map((workflow) => workflow.id);
        return workflowIds;
    }
    getFolderIds(workflowsAndFolders) {
        return workflowsAndFolders.filter((item) => item.resource === 'folder').map((item) => item.id);
    }
    getWorkflowsIds(workflowsAndFolders) {
        return workflowsAndFolders
            .filter((item) => item.resource === 'workflow')
            .map((item) => item.id);
    }
    async fetchExtraData(workflowsAndFolders, isArchived) {
        const workflowIds = this.getWorkflowsIds(workflowsAndFolders);
        const folderIds = this.getFolderIds(workflowsAndFolders);
        const [workflows, folders] = await Promise.all([
            this.getMany(workflowIds),
            this.folderRepository.getMany({ filter: { folderIds, isArchived } }),
        ]);
        return { workflows, folders };
    }
    enrichDataWithExtras(baseData, extraData) {
        const workflowsMap = new Map(extraData.workflows.map((workflow) => [workflow.id, workflow]));
        const foldersMap = new Map(extraData.folders.map((folder) => [folder.id, folder]));
        return baseData.map((item) => {
            const lookupMap = item.resource === 'folder' ? foldersMap : workflowsMap;
            const extraItem = lookupMap.get(item.id);
            return extraItem ? { ...item, ...extraItem } : item;
        });
    }
    async getMany(workflowIds, options = {}) {
        if (workflowIds.length === 0) {
            return [];
        }
        const query = this.getManyQuery(workflowIds, options);
        const workflows = (await query.getMany());
        return workflows;
    }
    async getManyAndCount(sharedWorkflowIds, options = {}) {
        if (sharedWorkflowIds.length === 0) {
            return { workflows: [], count: 0 };
        }
        const query = this.getManyQuery(sharedWorkflowIds, options);
        const [workflows, count] = (await query.getManyAndCount());
        return { workflows, count };
    }
    getManyQuery(workflowIds, options = {}) {
        const qb = this.createBaseQuery(workflowIds);
        this.applyFilters(qb, options.filter);
        this.applySelect(qb, options.select);
        this.applyRelations(qb, options.select);
        this.applySorting(qb, options.sortBy);
        this.applyPagination(qb, options);
        return qb;
    }
    createBaseQuery(workflowIds) {
        return this.createQueryBuilder('workflow').where('workflow.id IN (:...workflowIds)', {
            workflowIds: !workflowIds.length ? [''] : workflowIds,
        });
    }
    applyFilters(qb, filter) {
        this.applyNameFilter(qb, filter);
        this.applyActiveFilter(qb, filter);
        this.applyIsArchivedFilter(qb, filter);
        this.applyTagsFilter(qb, filter);
        this.applyProjectFilter(qb, filter);
        this.applyParentFolderFilter(qb, filter);
    }
    applyNameFilter(qb, filter) {
        if (typeof filter?.name === 'string' && filter.name !== '') {
            qb.andWhere('LOWER(workflow.name) LIKE :name', {
                name: `%${filter.name.toLowerCase()}%`,
            });
        }
    }
    applyParentFolderFilter(qb, filter) {
        if (filter?.parentFolderId === n8n_workflow_1.PROJECT_ROOT) {
            qb.andWhere('workflow.parentFolderId IS NULL');
        }
        else if (filter?.parentFolderId) {
            qb.andWhere('workflow.parentFolderId = :parentFolderId', {
                parentFolderId: filter.parentFolderId,
            });
        }
        else if (filter?.parentFolderIds &&
            Array.isArray(filter.parentFolderIds) &&
            filter.parentFolderIds.length > 0) {
            qb.andWhere('workflow.parentFolderId IN (:...parentFolderIds)', {
                parentFolderIds: filter.parentFolderIds,
            });
        }
    }
    applyActiveFilter(qb, filter) {
        if (typeof filter?.active === 'boolean') {
            qb.andWhere('workflow.active = :active', { active: filter.active });
        }
    }
    applyIsArchivedFilter(qb, filter) {
        if (typeof filter?.isArchived === 'boolean') {
            qb.andWhere('workflow.isArchived = :isArchived', { isArchived: filter.isArchived });
        }
    }
    applyTagsFilter(qb, filter) {
        if ((0, is_string_array_1.isStringArray)(filter?.tags) && filter.tags.length > 0) {
            const subQuery = qb
                .subQuery()
                .select('wt.workflowId')
                .from(entities_1.WorkflowTagMapping, 'wt')
                .innerJoin(entities_1.TagEntity, 'filter_tags', 'filter_tags.id = wt.tagId')
                .where('filter_tags.name IN (:...tagNames)', { tagNames: filter.tags })
                .groupBy('wt.workflowId')
                .having('COUNT(DISTINCT filter_tags.name) = :tagCount', { tagCount: filter.tags.length });
            qb.andWhere(`workflow.id IN (${subQuery.getQuery()})`).setParameters({
                tagNames: filter.tags,
                tagCount: filter.tags.length,
            });
        }
    }
    applyProjectFilter(qb, filter) {
        if (typeof filter?.projectId === 'string' && filter.projectId !== '') {
            qb.innerJoin('workflow.shared', 'shared').andWhere('shared.projectId = :projectId', {
                projectId: filter.projectId,
            });
        }
    }
    applyOwnedByRelation(qb) {
        if (!qb.expressionMap.aliases.find((alias) => alias.name === 'shared')) {
            qb.leftJoin('workflow.shared', 'shared');
        }
        qb.addSelect([
            'shared.role',
            'shared.createdAt',
            'shared.updatedAt',
            'shared.workflowId',
            'shared.projectId',
        ])
            .leftJoin('shared.project', 'project')
            .addSelect([
            'project.id',
            'project.name',
            'project.type',
            'project.icon',
            'project.createdAt',
            'project.updatedAt',
        ]);
    }
    applySelect(qb, select) {
        if (!select) {
            qb.select([
                'workflow.id',
                'workflow.name',
                'workflow.active',
                'workflow.isArchived',
                'workflow.createdAt',
                'workflow.updatedAt',
                'workflow.versionId',
            ]);
            return;
        }
        const fieldsToSelect = ['workflow.id'];
        const regularFields = Object.entries(select).filter(([field]) => !['ownedBy', 'tags', 'parentFolder'].includes(field));
        regularFields.forEach(([field, include]) => {
            if (include && field !== 'id') {
                fieldsToSelect.push(`workflow.${field}`);
            }
        });
        qb.select(fieldsToSelect);
    }
    applyRelations(qb, select) {
        const areTagsEnabled = !this.globalConfig.tags.disabled;
        const isDefaultSelect = select === undefined;
        const areTagsRequested = isDefaultSelect || select?.tags;
        const isOwnedByIncluded = isDefaultSelect || select?.ownedBy;
        const isParentFolderIncluded = isDefaultSelect || select?.parentFolder;
        if (isParentFolderIncluded) {
            qb.leftJoin('workflow.parentFolder', 'parentFolder').addSelect([
                'parentFolder.id',
                'parentFolder.name',
                'parentFolder.parentFolderId',
            ]);
        }
        if (areTagsEnabled && areTagsRequested) {
            this.applyTagsRelation(qb);
        }
        if (isOwnedByIncluded) {
            this.applyOwnedByRelation(qb);
        }
    }
    applyTagsRelation(qb) {
        qb.leftJoin('workflow.tags', 'tags')
            .addSelect(['tags.id', 'tags.name'])
            .addOrderBy('tags.createdAt', 'ASC');
    }
    applySorting(qb, sortBy) {
        if (!sortBy) {
            qb.orderBy('workflow.updatedAt', 'ASC');
            return;
        }
        const [column, direction] = this.parseSortingParams(sortBy);
        this.applySortingByColumn(qb, column, direction);
    }
    parseSortingParams(sortBy) {
        const [column, order] = sortBy.split(':');
        return [column, order.toUpperCase()];
    }
    applySortingByColumn(qb, column, direction) {
        if (column === 'name') {
            qb.addSelect('LOWER(workflow.name)', 'workflow_name_lower').orderBy('workflow_name_lower', direction);
            return;
        }
        qb.orderBy(`workflow.${column}`, direction);
    }
    applyPagination(qb, options) {
        if (options?.take) {
            qb.skip(options.skip ?? 0).take(options.take);
        }
    }
    async findStartingWith(workflowName) {
        return await this.find({
            select: ['name'],
            where: { name: (0, typeorm_1.Like)(`${workflowName}%`) },
        });
    }
    async findIn(workflowIds) {
        return await this.find({
            select: ['id', 'name'],
            where: { id: (0, typeorm_1.In)(workflowIds) },
        });
    }
    async findWebhookBasedActiveWorkflows() {
        return await this.createQueryBuilder('workflow')
            .select('DISTINCT workflow.id, workflow.name')
            .innerJoin(entities_1.WebhookEntity, 'webhook_entity', 'workflow.id = webhook_entity.workflowId')
            .execute();
    }
    async updateActiveState(workflowId, newState) {
        return await this.update({ id: workflowId }, { active: newState });
    }
    async deactivateAll() {
        return await this.update({ active: true }, { active: false });
    }
    async activateAll() {
        return await this.update({ active: false }, { active: true });
    }
    async findByActiveState(activeState) {
        return await this.findBy({ active: activeState });
    }
    async moveAllToFolder(fromFolderId, toFolderId, tx) {
        await tx.update(entities_1.WorkflowEntity, { parentFolder: { id: fromFolderId } }, {
            parentFolder: toFolderId === n8n_workflow_1.PROJECT_ROOT
                ? null
                : {
                    id: toFolderId,
                },
        });
    }
    async moveToFolder(workflowIds, toFolderId) {
        await this.update({ id: (0, typeorm_1.In)(workflowIds) }, { parentFolder: toFolderId === n8n_workflow_1.PROJECT_ROOT ? null : { id: toFolderId } });
    }
};
exports.WorkflowRepository = WorkflowRepository;
exports.WorkflowRepository = WorkflowRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        config_1.GlobalConfig,
        folder_repository_1.FolderRepository])
], WorkflowRepository);
//# sourceMappingURL=workflow.repository.js.map