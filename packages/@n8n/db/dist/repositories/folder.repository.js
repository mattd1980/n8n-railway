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
exports.FolderRepository = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const n8n_workflow_1 = require("n8n-workflow");
const entities_1 = require("../entities");
let FolderRepository = class FolderRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(entities_1.Folder, dataSource.manager);
    }
    async getManyAndCount(options = {}) {
        const query = this.getManyQuery(options);
        return (await query.getManyAndCount());
    }
    async getMany(options = {}) {
        const query = this.getManyQuery(options);
        return (await query.getMany());
    }
    getManyQuery(options = {}) {
        const query = this.createQueryBuilder('folder');
        this.applySelections(query, options.select, options.filter);
        this.applyFilters(query, options.filter);
        this.applySorting(query, options.sortBy);
        this.applyPagination(query, options);
        return query;
    }
    applySelections(query, select, filter) {
        if (select) {
            this.applyCustomSelect(query, select, filter);
        }
        else {
            this.applyDefaultSelect(query, filter);
        }
    }
    applyWorkflowCountSelect(query, filter) {
        if (typeof filter?.isArchived === 'boolean') {
            query.loadRelationCountAndMap('folder.workflowCount', 'folder.workflows', 'workflow', (qb) => qb.andWhere('workflow.isArchived = :isArchived', {
                isArchived: filter.isArchived,
            }));
        }
        else {
            query.loadRelationCountAndMap('folder.workflowCount', 'folder.workflows');
        }
    }
    applyDefaultSelect(query, filter) {
        this.applyWorkflowCountSelect(query, filter);
        query
            .leftJoinAndSelect('folder.homeProject', 'homeProject')
            .leftJoinAndSelect('folder.parentFolder', 'parentFolder')
            .leftJoinAndSelect('folder.tags', 'tags')
            .loadRelationCountAndMap('folder.subFolderCount', 'folder.subFolders')
            .select([
            'folder',
            ...this.getProjectFields('homeProject'),
            ...this.getTagFields(),
            ...this.getParentFolderFields('parentFolder'),
        ]);
    }
    applyCustomSelect(query, select, filter) {
        const selections = ['folder.id'];
        this.addBasicFields(selections, select);
        this.addRelationFields(query, selections, select, filter);
        query.select(selections);
    }
    addBasicFields(selections, select) {
        if (select?.name)
            selections.push('folder.name');
        if (select?.createdAt)
            selections.push('folder.createdAt');
        if (select?.updatedAt)
            selections.push('folder.updatedAt');
    }
    addRelationFields(query, selections, select, filter) {
        if (select?.project) {
            query.leftJoin('folder.homeProject', 'homeProject');
            selections.push(...this.getProjectFields('homeProject'));
        }
        if (select?.tags) {
            query.leftJoin('folder.tags', 'tags').addOrderBy('tags.createdAt', 'ASC');
            selections.push(...this.getTagFields());
        }
        if (select?.parentFolder) {
            query.leftJoin('folder.parentFolder', 'parentFolder');
            selections.push(...this.getParentFolderFields('parentFolder'));
        }
        if (select?.workflowCount) {
            this.applyWorkflowCountSelect(query, filter);
        }
        if (select?.subFolderCount) {
            if (!query.hasRelation(entities_1.Folder, 'folder.parentFolder')) {
                query.loadRelationCountAndMap('folder.subFolderCount', 'folder.subFolders');
            }
        }
    }
    getProjectFields(alias) {
        return [`${alias}.id`, `${alias}.name`, `${alias}.type`, `${alias}.icon`];
    }
    getTagFields() {
        return ['tags.id', 'tags.name'];
    }
    getParentFolderFields(alias) {
        return [`${alias}.id`, `${alias}.name`, `${alias}.parentFolderId`];
    }
    applyFilters(query, filter) {
        if (!filter)
            return;
        this.applyBasicFilters(query, filter);
        this.applyTagsFilter(query, Array.isArray(filter?.tags) ? filter.tags : undefined);
        if (filter?.excludeFolderIdAndDescendants &&
            typeof filter.excludeFolderIdAndDescendants === 'string') {
            this.applyExcludeFolderFilter(query, filter.excludeFolderIdAndDescendants);
        }
    }
    applyBasicFilters(query, filter) {
        if (filter?.folderIds && Array.isArray(filter.folderIds)) {
            query.andWhere('folder.id IN (:...folderIds)', {
                folderIds: !filter?.folderIds.length ? [''] : filter?.folderIds,
            });
        }
        if (filter?.projectId) {
            query.andWhere('folder.projectId = :projectId', { projectId: filter.projectId });
        }
        if (filter?.name && typeof filter.name === 'string') {
            query.andWhere('LOWER(folder.name) LIKE LOWER(:name)', {
                name: `%${filter.name}%`,
            });
        }
        if (filter?.parentFolderId === n8n_workflow_1.PROJECT_ROOT) {
            query.andWhere('folder.parentFolderId IS NULL');
        }
        else if (filter?.parentFolderId) {
            query.andWhere('folder.parentFolderId = :parentFolderId', {
                parentFolderId: filter.parentFolderId,
            });
        }
    }
    applyTagsFilter(query, tags) {
        if (!Array.isArray(tags) || tags.length === 0)
            return;
        const subQuery = this.createTagsSubQuery(query, tags);
        query.andWhere(`folder.id IN (${subQuery.getQuery()})`).setParameters({
            tagNames: tags,
            tagCount: tags.length,
        });
    }
    createTagsSubQuery(query, tags) {
        return query
            .subQuery()
            .select('ft.folderId')
            .from(entities_1.FolderTagMapping, 'ft')
            .innerJoin(entities_1.TagEntity, 'filter_tags', 'filter_tags.id = ft.tagId')
            .where('filter_tags.name IN (:...tagNames)', { tagNames: tags })
            .groupBy('ft.folderId')
            .having('COUNT(DISTINCT filter_tags.name) = :tagCount', {
            tagCount: tags.length,
        });
    }
    applySorting(query, sortBy) {
        if (!sortBy) {
            query.orderBy('folder.updatedAt', 'DESC');
            return;
        }
        const [field, order] = this.parseSortingParams(sortBy);
        this.applySortingByField(query, field, order);
    }
    parseSortingParams(sortBy) {
        const [field, order] = sortBy.split(':');
        return [field, order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC'];
    }
    applySortingByField(query, field, direction) {
        if (field === 'name') {
            query
                .addSelect('LOWER(folder.name)', 'folder_name_lower')
                .orderBy('folder_name_lower', direction);
        }
        else if (['createdAt', 'updatedAt'].includes(field)) {
            query.orderBy(`folder.${field}`, direction);
        }
    }
    applyPagination(query, options) {
        if (options?.take) {
            query.skip(options.skip ?? 0).take(options.take);
        }
    }
    async findOneOrFailFolderInProject(folderId, projectId, em) {
        const manager = em ?? this.manager;
        return await manager.findOneOrFail(entities_1.Folder, {
            where: {
                id: folderId,
                homeProject: {
                    id: projectId,
                },
            },
        });
    }
    async moveAllToFolder(fromFolderId, toFolderId, tx) {
        await tx.update(entities_1.Folder, { parentFolder: { id: fromFolderId } }, {
            parentFolder: toFolderId === n8n_workflow_1.PROJECT_ROOT
                ? null
                : {
                    id: toFolderId,
                },
        });
    }
    async transferAllFoldersToProject(fromProjectId, toProjectId, tx) {
        const manager = tx ?? this.manager;
        return await manager.update(entities_1.Folder, {
            homeProject: { id: fromProjectId },
        }, {
            homeProject: { id: toProjectId },
        });
    }
    applyExcludeFolderFilter(query, excludeFolderIdAndDescendants) {
        query.andWhere('folder.id != :excludeFolderIdAndDescendants', {
            excludeFolderIdAndDescendants,
        });
        const baseQuery = this.createQueryBuilder('f')
            .select('f.id', 'id')
            .addSelect('f.parentFolderId', 'parentFolderId')
            .where('f.id = :excludeFolderIdAndDescendants', { excludeFolderIdAndDescendants });
        const recursiveQuery = this.createQueryBuilder('child')
            .select('child.id', 'id')
            .addSelect('child.parentFolderId', 'parentFolderId')
            .innerJoin('folder_tree', 'parent', 'child.parentFolderId = parent.id');
        const subQuery = this.createQueryBuilder()
            .select('tree.id')
            .addCommonTableExpression(`${baseQuery.getQuery()} UNION ALL ${recursiveQuery.getQuery()}`, 'folder_tree', { recursive: true })
            .from('folder_tree', 'tree')
            .setParameters({ excludeFolderIdAndDescendants });
        query.andWhere(`folder.id NOT IN (${subQuery.getQuery()})`);
    }
    async getAllFolderIdsInHierarchy(parentFolderId, projectId) {
        const baseQuery = this.createQueryBuilder('f')
            .select('f.id', 'id')
            .where('f.parentFolderId = :parentFolderId', { parentFolderId });
        if (projectId) {
            baseQuery.andWhere('f.projectId = :projectId', { projectId });
        }
        const recursiveQuery = this.createQueryBuilder('child')
            .select('child.id', 'id')
            .innerJoin('folder_tree', 'parent', 'child.parentFolderId = parent.id');
        if (projectId) {
            recursiveQuery.andWhere('child.projectId = :projectId', { projectId });
        }
        const query = this.createQueryBuilder()
            .addCommonTableExpression(`${baseQuery.getQuery()} UNION ALL ${recursiveQuery.getQuery()}`, 'folder_tree', { recursive: true })
            .select('DISTINCT tree.id', 'id')
            .from('folder_tree', 'tree')
            .setParameters(baseQuery.getParameters());
        const result = await query.getRawMany();
        return result.map((row) => row.id);
    }
    async getFolderPathsToRoot(folderIds) {
        if (!folderIds.length) {
            return new Map();
        }
        const baseQuery = this.createQueryBuilder('folder')
            .select([
            'folder.id as id',
            'folder.name as name',
            'folder.parentFolderId as parentFolderId',
            'CONCAT(folder.name) as path',
            '1 as level',
        ])
            .where('folder.parentFolderId IS NULL');
        const recursiveQuery = this.createQueryBuilder('child')
            .select([
            'child.id as id',
            'child.name as name',
            'child.parentFolderId as parentFolderId',
            "CONCAT(parent.path, '/', child.name) as path",
            'parent.level + 1 as level',
        ])
            .innerJoin('folder_paths', 'parent', 'child.parentFolderId = parent.id');
        const mainQuery = this.createQueryBuilder()
            .addCommonTableExpression(`${baseQuery.getQuery()} UNION ALL ${recursiveQuery.getQuery()}`, 'folder_paths', { recursive: true })
            .select('fp.id as folder_id, fp.path as folder_path')
            .from('folder_paths', 'fp')
            .where('fp.id IN (:...folderIds)', { folderIds });
        const results = await mainQuery.getRawMany();
        const pathMap = new Map();
        for (const row of results) {
            const pathNames = row.folder_path.split('/');
            pathMap.set(row.folder_id, pathNames);
        }
        return pathMap;
    }
};
exports.FolderRepository = FolderRepository;
exports.FolderRepository = FolderRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], FolderRepository);
//# sourceMappingURL=folder.repository.js.map