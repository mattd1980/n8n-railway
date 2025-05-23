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
exports.SourceControlImportService = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const fast_glob_1 = __importDefault(require("fast-glob"));
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const promises_1 = require("node:fs/promises");
const path_1 = __importDefault(require("path"));
const active_workflow_manager_1 = require("../../active-workflow-manager");
const credentials_service_1 = require("../../credentials/credentials.service");
const response_helper_1 = require("../../response-helper");
const tag_service_1 = require("../../services/tag.service");
const utils_1 = require("../../utils");
const workflow_service_1 = require("../../workflows/workflow.service");
const constants_1 = require("./constants");
const source_control_helper_ee_1 = require("./source-control-helper.ee");
const variables_service_ee_1 = require("../variables/variables.service.ee");
let SourceControlImportService = class SourceControlImportService {
    constructor(logger, errorReporter, variablesService, activeWorkflowManager, credentialsRepository, projectRepository, tagRepository, sharedWorkflowRepository, sharedCredentialsRepository, userRepository, variablesRepository, workflowRepository, workflowTagMappingRepository, workflowService, credentialsService, tagService, folderRepository, instanceSettings) {
        this.logger = logger;
        this.errorReporter = errorReporter;
        this.variablesService = variablesService;
        this.activeWorkflowManager = activeWorkflowManager;
        this.credentialsRepository = credentialsRepository;
        this.projectRepository = projectRepository;
        this.tagRepository = tagRepository;
        this.sharedWorkflowRepository = sharedWorkflowRepository;
        this.sharedCredentialsRepository = sharedCredentialsRepository;
        this.userRepository = userRepository;
        this.variablesRepository = variablesRepository;
        this.workflowRepository = workflowRepository;
        this.workflowTagMappingRepository = workflowTagMappingRepository;
        this.workflowService = workflowService;
        this.credentialsService = credentialsService;
        this.tagService = tagService;
        this.folderRepository = folderRepository;
        this.gitFolder = path_1.default.join(instanceSettings.n8nFolder, constants_1.SOURCE_CONTROL_GIT_FOLDER);
        this.workflowExportFolder = path_1.default.join(this.gitFolder, constants_1.SOURCE_CONTROL_WORKFLOW_EXPORT_FOLDER);
        this.credentialExportFolder = path_1.default.join(this.gitFolder, constants_1.SOURCE_CONTROL_CREDENTIAL_EXPORT_FOLDER);
    }
    async getRemoteVersionIdsFromFiles() {
        const remoteWorkflowFiles = await (0, fast_glob_1.default)('*.json', {
            cwd: this.workflowExportFolder,
            absolute: true,
        });
        const remoteWorkflowFilesParsed = await Promise.all(remoteWorkflowFiles.map(async (file) => {
            this.logger.debug(`Parsing workflow file ${file}`);
            const remote = (0, n8n_workflow_1.jsonParse)(await (0, promises_1.readFile)(file, { encoding: 'utf8' }));
            if (!remote?.id) {
                return undefined;
            }
            return {
                id: remote.id,
                versionId: remote.versionId,
                name: remote.name,
                parentFolderId: remote.parentFolderId,
                remoteId: remote.id,
                filename: (0, source_control_helper_ee_1.getWorkflowExportPath)(remote.id, this.workflowExportFolder),
            };
        }));
        return remoteWorkflowFilesParsed.filter((e) => e !== undefined);
    }
    async getLocalVersionIdsFromDb() {
        const localWorkflows = await this.workflowRepository.find({
            relations: ['parentFolder'],
            select: {
                id: true,
                versionId: true,
                name: true,
                updatedAt: true,
                parentFolder: {
                    id: true,
                },
            },
        });
        return localWorkflows.map((local) => {
            let updatedAt;
            if (local.updatedAt instanceof Date) {
                updatedAt = local.updatedAt;
            }
            else {
                this.errorReporter.warn('updatedAt is not a Date', {
                    extra: {
                        type: typeof local.updatedAt,
                        value: local.updatedAt,
                    },
                });
                updatedAt = isNaN(Date.parse(local.updatedAt)) ? new Date() : new Date(local.updatedAt);
            }
            return {
                id: local.id,
                versionId: local.versionId,
                name: local.name,
                localId: local.id,
                parentFolderId: local.parentFolder?.id ?? null,
                filename: (0, source_control_helper_ee_1.getWorkflowExportPath)(local.id, this.workflowExportFolder),
                updatedAt: updatedAt.toISOString(),
            };
        });
    }
    async getRemoteCredentialsFromFiles() {
        const remoteCredentialFiles = await (0, fast_glob_1.default)('*.json', {
            cwd: this.credentialExportFolder,
            absolute: true,
        });
        const remoteCredentialFilesParsed = await Promise.all(remoteCredentialFiles.map(async (file) => {
            this.logger.debug(`Parsing credential file ${file}`);
            const remote = (0, n8n_workflow_1.jsonParse)(await (0, promises_1.readFile)(file, { encoding: 'utf8' }));
            if (!remote?.id) {
                return undefined;
            }
            return {
                ...remote,
                filename: (0, source_control_helper_ee_1.getCredentialExportPath)(remote.id, this.credentialExportFolder),
            };
        }));
        return remoteCredentialFilesParsed.filter((e) => e !== undefined);
    }
    async getLocalCredentialsFromDb() {
        const localCredentials = await this.credentialsRepository.find({
            select: ['id', 'name', 'type'],
        });
        return localCredentials.map((local) => ({
            id: local.id,
            name: local.name,
            type: local.type,
            filename: (0, source_control_helper_ee_1.getCredentialExportPath)(local.id, this.credentialExportFolder),
        }));
    }
    async getRemoteVariablesFromFile() {
        const variablesFile = await (0, fast_glob_1.default)(constants_1.SOURCE_CONTROL_VARIABLES_EXPORT_FILE, {
            cwd: this.gitFolder,
            absolute: true,
        });
        if (variablesFile.length > 0) {
            this.logger.debug(`Importing variables from file ${variablesFile[0]}`);
            return (0, n8n_workflow_1.jsonParse)(await (0, promises_1.readFile)(variablesFile[0], { encoding: 'utf8' }), {
                fallbackValue: [],
            });
        }
        return [];
    }
    async getLocalVariablesFromDb() {
        return await this.variablesService.getAllCached();
    }
    async getRemoteFoldersAndMappingsFromFile() {
        const foldersFile = await (0, fast_glob_1.default)(constants_1.SOURCE_CONTROL_FOLDERS_EXPORT_FILE, {
            cwd: this.gitFolder,
            absolute: true,
        });
        if (foldersFile.length > 0) {
            this.logger.debug(`Importing folders from file ${foldersFile[0]}`);
            const mappedFolders = (0, n8n_workflow_1.jsonParse)(await (0, promises_1.readFile)(foldersFile[0], { encoding: 'utf8' }), {
                fallbackValue: { folders: [] },
            });
            return mappedFolders;
        }
        return { folders: [] };
    }
    async getLocalFoldersAndMappingsFromDb() {
        const localFolders = await this.folderRepository.find({
            relations: ['parentFolder', 'homeProject'],
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                parentFolder: { id: true },
                homeProject: { id: true },
            },
        });
        return {
            folders: localFolders.map((f) => ({
                id: f.id,
                name: f.name,
                parentFolderId: f.parentFolder?.id ?? null,
                homeProjectId: f.homeProject.id,
                createdAt: f.createdAt.toISOString(),
                updatedAt: f.updatedAt.toISOString(),
            })),
        };
    }
    async getRemoteTagsAndMappingsFromFile() {
        const tagsFile = await (0, fast_glob_1.default)(constants_1.SOURCE_CONTROL_TAGS_EXPORT_FILE, {
            cwd: this.gitFolder,
            absolute: true,
        });
        if (tagsFile.length > 0) {
            this.logger.debug(`Importing tags from file ${tagsFile[0]}`);
            const mappedTags = (0, n8n_workflow_1.jsonParse)(await (0, promises_1.readFile)(tagsFile[0], { encoding: 'utf8' }), { fallbackValue: { tags: [], mappings: [] } });
            return mappedTags;
        }
        return { tags: [], mappings: [] };
    }
    async getLocalTagsAndMappingsFromDb() {
        const localTags = await this.tagRepository.find({
            select: ['id', 'name'],
        });
        const localMappings = await this.workflowTagMappingRepository.find({
            select: ['workflowId', 'tagId'],
        });
        return { tags: localTags, mappings: localMappings };
    }
    async importWorkflowFromWorkFolder(candidates, userId) {
        const personalProject = await this.projectRepository.getPersonalProjectForUserOrFail(userId);
        const workflowManager = this.activeWorkflowManager;
        const candidateIds = candidates.map((c) => c.id);
        const existingWorkflows = await this.workflowRepository.findByIds(candidateIds, {
            fields: ['id', 'name', 'versionId', 'active'],
        });
        const folders = await this.folderRepository.find({ select: ['id'] });
        const existingFolderIds = folders.map((f) => f.id);
        const allSharedWorkflows = await this.sharedWorkflowRepository.findWithFields(candidateIds, {
            select: ['workflowId', 'role', 'projectId'],
        });
        const importWorkflowsResult = [];
        for (const candidate of candidates) {
            this.logger.debug(`Parsing workflow file ${candidate.file}`);
            const importedWorkflow = (0, n8n_workflow_1.jsonParse)(await (0, promises_1.readFile)(candidate.file, { encoding: 'utf8' }));
            if (!importedWorkflow?.id) {
                continue;
            }
            const existingWorkflow = existingWorkflows.find((e) => e.id === importedWorkflow.id);
            importedWorkflow.active = existingWorkflow
                ? existingWorkflow.active && !importedWorkflow.isArchived
                : false;
            const parentFolderId = importedWorkflow.parentFolderId ?? '';
            this.logger.debug(`Updating workflow id ${importedWorkflow.id ?? 'new'}`);
            const upsertResult = await this.workflowRepository.upsert({
                ...importedWorkflow,
                parentFolder: existingFolderIds.includes(parentFolderId) ? { id: parentFolderId } : null,
            }, ['id']);
            if (upsertResult?.identifiers?.length !== 1) {
                throw new n8n_workflow_1.UnexpectedError('Failed to upsert workflow', {
                    extra: { workflowId: importedWorkflow.id ?? 'new' },
                });
            }
            const isOwnedLocally = allSharedWorkflows.some((w) => w.workflowId === importedWorkflow.id && w.role === 'workflow:owner');
            if (!isOwnedLocally) {
                const remoteOwnerProject = importedWorkflow.owner
                    ? await this.findOrCreateOwnerProject(importedWorkflow.owner)
                    : null;
                await this.sharedWorkflowRepository.upsert({
                    workflowId: importedWorkflow.id,
                    projectId: remoteOwnerProject?.id ?? personalProject.id,
                    role: 'workflow:owner',
                }, ['workflowId', 'projectId']);
            }
            if (existingWorkflow?.active) {
                try {
                    this.logger.debug(`Deactivating workflow id ${existingWorkflow.id}`);
                    await workflowManager.remove(existingWorkflow.id);
                    if (importedWorkflow.active) {
                        this.logger.debug(`Reactivating workflow id ${existingWorkflow.id}`);
                        await workflowManager.add(existingWorkflow.id, 'activate');
                    }
                }
                catch (e) {
                    const error = (0, n8n_workflow_1.ensureError)(e);
                    this.logger.error(`Failed to activate workflow ${existingWorkflow.id}`, { error });
                }
                finally {
                    await this.workflowRepository.update({ id: existingWorkflow.id }, { versionId: importedWorkflow.versionId });
                }
            }
            importWorkflowsResult.push({
                id: importedWorkflow.id ?? 'unknown',
                name: candidate.file,
            });
        }
        return importWorkflowsResult.filter((e) => e !== undefined);
    }
    async importCredentialsFromWorkFolder(candidates, userId) {
        const personalProject = await this.projectRepository.getPersonalProjectForUserOrFail(userId);
        const candidateIds = candidates.map((c) => c.id);
        const existingCredentials = await this.credentialsRepository.find({
            where: {
                id: (0, typeorm_1.In)(candidateIds),
            },
            select: ['id', 'name', 'type', 'data'],
        });
        const existingSharedCredentials = await this.sharedCredentialsRepository.find({
            select: ['credentialsId', 'role'],
            where: {
                credentialsId: (0, typeorm_1.In)(candidateIds),
                role: 'credential:owner',
            },
        });
        let importCredentialsResult = [];
        importCredentialsResult = await Promise.all(candidates.map(async (candidate) => {
            this.logger.debug(`Importing credentials file ${candidate.file}`);
            const credential = (0, n8n_workflow_1.jsonParse)(await (0, promises_1.readFile)(candidate.file, { encoding: 'utf8' }));
            const existingCredential = existingCredentials.find((e) => e.id === credential.id && e.type === credential.type);
            const { name, type, data, id } = credential;
            const newCredentialObject = new n8n_core_1.Credentials({ id, name }, type);
            if (existingCredential?.data) {
                newCredentialObject.data = existingCredential.data;
            }
            else {
                const { oauthTokenData, ...rest } = data;
                newCredentialObject.setData(rest);
            }
            this.logger.debug(`Updating credential id ${newCredentialObject.id}`);
            await this.credentialsRepository.upsert(newCredentialObject, ['id']);
            const isOwnedLocally = existingSharedCredentials.some((c) => c.credentialsId === credential.id && c.role === 'credential:owner');
            if (!isOwnedLocally) {
                const remoteOwnerProject = credential.ownedBy
                    ? await this.findOrCreateOwnerProject(credential.ownedBy)
                    : null;
                const newSharedCredential = new db_1.SharedCredentials();
                newSharedCredential.credentialsId = newCredentialObject.id;
                newSharedCredential.projectId = remoteOwnerProject?.id ?? personalProject.id;
                newSharedCredential.role = 'credential:owner';
                await this.sharedCredentialsRepository.upsert({ ...newSharedCredential }, [
                    'credentialsId',
                    'projectId',
                ]);
            }
            return {
                id: newCredentialObject.id,
                name: newCredentialObject.name,
                type: newCredentialObject.type,
            };
        }));
        return importCredentialsResult.filter((e) => e !== undefined);
    }
    async importTagsFromWorkFolder(candidate) {
        let mappedTags;
        try {
            this.logger.debug(`Importing tags from file ${candidate.file}`);
            mappedTags = (0, n8n_workflow_1.jsonParse)(await (0, promises_1.readFile)(candidate.file, { encoding: 'utf8' }), { fallbackValue: { tags: [], mappings: [] } });
        }
        catch (e) {
            const error = (0, n8n_workflow_1.ensureError)(e);
            this.logger.error(`Failed to import tags from file ${candidate.file}`, { error });
            return;
        }
        if (mappedTags.mappings.length === 0 && mappedTags.tags.length === 0) {
            return;
        }
        const existingWorkflowIds = new Set((await this.workflowRepository.find({
            select: ['id'],
        })).map((e) => e.id));
        await Promise.all(mappedTags.tags.map(async (tag) => {
            const findByName = await this.tagRepository.findOne({
                where: { name: tag.name },
                select: ['id'],
            });
            if (findByName && findByName.id !== tag.id) {
                throw new n8n_workflow_1.UserError(`A tag with the name <strong>${tag.name}</strong> already exists locally.<br />Please either rename the local tag, or the remote one with the id <strong>${tag.id}</strong> in the tags.json file.`);
            }
            const tagCopy = this.tagRepository.create(tag);
            await this.tagRepository.upsert(tagCopy, {
                skipUpdateIfNoValuesChanged: true,
                conflictPaths: { id: true },
            });
        }));
        await Promise.all(mappedTags.mappings.map(async (mapping) => {
            if (!existingWorkflowIds.has(String(mapping.workflowId)))
                return;
            await this.workflowTagMappingRepository.upsert({ tagId: String(mapping.tagId), workflowId: String(mapping.workflowId) }, {
                skipUpdateIfNoValuesChanged: true,
                conflictPaths: { tagId: true, workflowId: true },
            });
        }));
        return mappedTags;
    }
    async importFoldersFromWorkFolder(user, candidate) {
        let mappedFolders;
        const projects = await this.projectRepository.find();
        const personalProject = await this.projectRepository.getPersonalProjectForUserOrFail(user.id);
        try {
            this.logger.debug(`Importing folders from file ${candidate.file}`);
            mappedFolders = (0, n8n_workflow_1.jsonParse)(await (0, promises_1.readFile)(candidate.file, { encoding: 'utf8' }), {
                fallbackValue: { folders: [] },
            });
        }
        catch (e) {
            const error = (0, n8n_workflow_1.ensureError)(e);
            this.logger.error(`Failed to import folders from file ${candidate.file}`, { error });
            return;
        }
        if (mappedFolders.folders.length === 0) {
            return;
        }
        await Promise.all(mappedFolders.folders.map(async (folder) => {
            const folderCopy = this.folderRepository.create({
                id: folder.id,
                name: folder.name,
                homeProject: {
                    id: projects.find((p) => p.id === folder.homeProjectId)?.id ?? personalProject.id,
                },
            });
            await this.folderRepository.upsert(folderCopy, {
                skipUpdateIfNoValuesChanged: true,
                conflictPaths: { id: true },
            });
        }));
        await Promise.all(mappedFolders.folders.map(async (folder) => {
            await this.folderRepository.update({ id: folder.id }, {
                parentFolder: folder.parentFolderId ? { id: folder.parentFolderId } : null,
                createdAt: folder.createdAt,
                updatedAt: folder.updatedAt,
            });
        }));
        return mappedFolders;
    }
    async importVariablesFromWorkFolder(candidate, valueOverrides) {
        const result = { imported: [] };
        let importedVariables;
        try {
            this.logger.debug(`Importing variables from file ${candidate.file}`);
            importedVariables = (0, n8n_workflow_1.jsonParse)(await (0, promises_1.readFile)(candidate.file, { encoding: 'utf8' }), { fallbackValue: [] });
        }
        catch (e) {
            this.logger.error(`Failed to import tags from file ${candidate.file}`, { error: e });
            return;
        }
        const overriddenKeys = Object.keys(valueOverrides ?? {});
        for (const variable of importedVariables) {
            if (!variable.key) {
                continue;
            }
            if (variable.value === '') {
                variable.value = undefined;
            }
            if (overriddenKeys.includes(variable.key) && valueOverrides) {
                variable.value = valueOverrides[variable.key];
                overriddenKeys.splice(overriddenKeys.indexOf(variable.key), 1);
            }
            try {
                await this.variablesRepository.upsert({ ...variable }, ['id']);
            }
            catch (errorUpsert) {
                if ((0, response_helper_1.isUniqueConstraintError)(errorUpsert)) {
                    this.logger.debug(`Variable ${variable.key} already exists, updating instead`);
                    try {
                        await this.variablesRepository.update({ key: variable.key }, { ...variable });
                    }
                    catch (errorUpdate) {
                        this.logger.debug(`Failed to update variable ${variable.key}, skipping`);
                        this.logger.debug(errorUpdate.message);
                    }
                }
            }
            finally {
                result.imported.push(variable.key);
            }
        }
        if (overriddenKeys.length > 0 && valueOverrides) {
            for (const key of overriddenKeys) {
                result.imported.push(key);
                const newVariable = this.variablesRepository.create({
                    key,
                    value: valueOverrides[key],
                });
                await this.variablesRepository.save(newVariable, { transaction: false });
            }
        }
        await this.variablesService.updateCache();
        return result;
    }
    async deleteWorkflowsNotInWorkfolder(user, candidates) {
        for (const candidate of candidates) {
            await this.workflowService.delete(user, candidate.id, true);
        }
    }
    async deleteCredentialsNotInWorkfolder(user, candidates) {
        for (const candidate of candidates) {
            await this.credentialsService.delete(user, candidate.id);
        }
    }
    async deleteVariablesNotInWorkfolder(candidates) {
        for (const candidate of candidates) {
            await this.variablesService.delete(candidate.id);
        }
    }
    async deleteTagsNotInWorkfolder(candidates) {
        for (const candidate of candidates) {
            await this.tagService.delete(candidate.id);
        }
    }
    async deleteFoldersNotInWorkfolder(candidates) {
        for (const candidate of candidates) {
            await this.folderRepository.delete(candidate.id);
        }
    }
    async findOrCreateOwnerProject(owner) {
        if (typeof owner === 'string' || owner.type === 'personal') {
            const email = typeof owner === 'string' ? owner : owner.personalEmail;
            const user = await this.userRepository.findOne({
                where: { email },
            });
            if (!user) {
                return null;
            }
            return await this.projectRepository.getPersonalProjectForUserOrFail(user.id);
        }
        else if (owner.type === 'team') {
            let teamProject = await this.projectRepository.findOne({
                where: { id: owner.teamId },
            });
            if (!teamProject) {
                try {
                    teamProject = await this.projectRepository.save(this.projectRepository.create({
                        id: owner.teamId,
                        name: owner.teamName,
                        type: 'team',
                    }));
                }
                catch (e) {
                    teamProject = await this.projectRepository.findOne({
                        where: { id: owner.teamId },
                    });
                    if (!teamProject) {
                        throw e;
                    }
                }
            }
            return teamProject;
        }
        (0, utils_1.assertNever)(owner);
        const errorOwner = owner;
        throw new n8n_workflow_1.UnexpectedError(`Unknown resource owner type "${typeof errorOwner !== 'string' ? errorOwner.type : 'UNKNOWN'}" found when importing from source controller`);
    }
};
exports.SourceControlImportService = SourceControlImportService;
exports.SourceControlImportService = SourceControlImportService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [n8n_core_1.Logger,
        n8n_core_1.ErrorReporter,
        variables_service_ee_1.VariablesService,
        active_workflow_manager_1.ActiveWorkflowManager,
        db_1.CredentialsRepository,
        db_1.ProjectRepository,
        db_1.TagRepository,
        db_1.SharedWorkflowRepository,
        db_1.SharedCredentialsRepository,
        db_1.UserRepository,
        db_1.VariablesRepository,
        db_1.WorkflowRepository,
        db_1.WorkflowTagMappingRepository,
        workflow_service_1.WorkflowService,
        credentials_service_1.CredentialsService,
        tag_service_1.TagService,
        db_1.FolderRepository,
        n8n_core_1.InstanceSettings])
], SourceControlImportService);
//# sourceMappingURL=source-control-import.service.ee.js.map