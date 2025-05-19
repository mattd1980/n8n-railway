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
exports.SourceControlService = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const fs_1 = require("fs");
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const path_1 = __importDefault(require("path"));
const bad_request_error_1 = require("../../errors/response-errors/bad-request.error");
const event_service_1 = require("../../events/event.service");
const constants_1 = require("./constants");
const source_control_export_service_ee_1 = require("./source-control-export.service.ee");
const source_control_git_service_ee_1 = require("./source-control-git.service.ee");
const source_control_helper_ee_1 = require("./source-control-helper.ee");
const source_control_import_service_ee_1 = require("./source-control-import.service.ee");
const source_control_preferences_service_ee_1 = require("./source-control-preferences.service.ee");
let SourceControlService = class SourceControlService {
    constructor(logger, gitService, sourceControlPreferencesService, sourceControlExportService, sourceControlImportService, tagRepository, folderRepository, eventService) {
        this.logger = logger;
        this.gitService = gitService;
        this.sourceControlPreferencesService = sourceControlPreferencesService;
        this.sourceControlExportService = sourceControlExportService;
        this.sourceControlImportService = sourceControlImportService;
        this.tagRepository = tagRepository;
        this.folderRepository = folderRepository;
        this.eventService = eventService;
        const { gitFolder, sshFolder, sshKeyName } = sourceControlPreferencesService;
        this.gitFolder = gitFolder;
        this.sshFolder = sshFolder;
        this.sshKeyName = sshKeyName;
    }
    async init() {
        this.gitService.resetService();
        (0, source_control_helper_ee_1.sourceControlFoldersExistCheck)([this.gitFolder, this.sshFolder]);
        await this.sourceControlPreferencesService.loadFromDbAndApplySourceControlPreferences();
        if (this.sourceControlPreferencesService.isSourceControlLicensedAndEnabled()) {
            await this.initGitService();
        }
    }
    async initGitService() {
        await this.gitService.initService({
            sourceControlPreferences: this.sourceControlPreferencesService.getPreferences(),
            gitFolder: this.gitFolder,
            sshKeyName: this.sshKeyName,
            sshFolder: this.sshFolder,
        });
    }
    async sanityCheck() {
        try {
            const foldersExisted = (0, source_control_helper_ee_1.sourceControlFoldersExistCheck)([this.gitFolder, this.sshFolder], false);
            if (!foldersExisted) {
                throw new n8n_workflow_1.UserError('No folders exist');
            }
            if (!this.gitService.git) {
                await this.initGitService();
            }
            const branches = await this.gitService.getCurrentBranch();
            if (branches.current === '' ||
                branches.current !==
                    this.sourceControlPreferencesService.sourceControlPreferences.branchName) {
                throw new n8n_workflow_1.UserError('Branch is not set up correctly');
            }
        }
        catch (error) {
            throw new bad_request_error_1.BadRequestError('Source control is not properly set up, please disconnect and reconnect.');
        }
    }
    async disconnect(options = {}) {
        try {
            await this.sourceControlPreferencesService.setPreferences({
                connected: false,
                branchName: '',
            });
            await this.sourceControlExportService.deleteRepositoryFolder();
            if (!options.keepKeyPair) {
                await this.sourceControlPreferencesService.deleteKeyPair();
            }
            this.gitService.resetService();
            return this.sourceControlPreferencesService.sourceControlPreferences;
        }
        catch (error) {
            throw new n8n_workflow_1.UnexpectedError('Failed to disconnect from source control', { cause: error });
        }
    }
    async initializeRepository(preferences, user) {
        if (!this.gitService.git) {
            await this.initGitService();
        }
        this.logger.debug('Initializing repository...');
        await this.gitService.initRepository(preferences, user);
        let getBranchesResult;
        try {
            getBranchesResult = await this.getBranches();
        }
        catch (error) {
            if (error.message.includes('Warning: Permanently added')) {
                this.logger.debug('Added repository host to the list of known hosts. Retrying...');
                getBranchesResult = await this.getBranches();
            }
            else {
                throw error;
            }
        }
        if (getBranchesResult.branches.includes(preferences.branchName)) {
            await this.gitService.setBranch(preferences.branchName);
        }
        else {
            if (getBranchesResult.branches?.length === 0) {
                try {
                    (0, fs_1.writeFileSync)(path_1.default.join(this.gitFolder, '/README.md'), constants_1.SOURCE_CONTROL_README);
                    await this.gitService.stage(new Set(['README.md']));
                    await this.gitService.commit('Initial commit');
                    await this.gitService.push({
                        branch: preferences.branchName,
                        force: true,
                    });
                    getBranchesResult = await this.getBranches();
                    await this.gitService.setBranch(preferences.branchName);
                }
                catch (fileError) {
                    this.logger.error(`Failed to create initial commit: ${fileError.message}`);
                }
            }
        }
        await this.sourceControlPreferencesService.setPreferences({
            branchName: getBranchesResult.currentBranch,
            connected: true,
        });
        return getBranchesResult;
    }
    async getBranches() {
        if (!this.gitService.git) {
            await this.initGitService();
        }
        await this.gitService.fetch();
        return await this.gitService.getBranches();
    }
    async setBranch(branch) {
        if (!this.gitService.git) {
            await this.initGitService();
        }
        await this.sourceControlPreferencesService.setPreferences({
            branchName: branch,
            connected: branch?.length > 0,
        });
        return await this.gitService.setBranch(branch);
    }
    async resetWorkfolder() {
        if (!this.gitService.git) {
            await this.initGitService();
        }
        try {
            await this.gitService.resetBranch();
            await this.gitService.pull();
        }
        catch (error) {
            this.logger.error(`Failed to reset workfolder: ${error.message}`);
            throw new n8n_workflow_1.UserError('Unable to fetch updates from git - your folder might be out of sync. Try reconnecting from the Source Control settings page.');
        }
        return;
    }
    async pushWorkfolder(user, options) {
        await this.sanityCheck();
        if (this.sourceControlPreferencesService.isBranchReadOnly()) {
            throw new bad_request_error_1.BadRequestError('Cannot push onto read-only branch.');
        }
        const filesToPush = options.fileNames.map((file) => {
            const normalizedPath = (0, source_control_helper_ee_1.normalizeAndValidateSourceControlledFilePath)(this.gitFolder, file.file);
            return {
                ...file,
                file: normalizedPath,
            };
        });
        let statusResult = filesToPush;
        if (statusResult.length === 0) {
            statusResult = (await this.getStatus(user, {
                direction: 'push',
                verbose: false,
                preferLocalVersion: true,
            }));
        }
        if (!options.force) {
            const possibleConflicts = statusResult?.filter((file) => file.conflict);
            if (possibleConflicts?.length > 0) {
                return {
                    statusCode: 409,
                    pushResult: undefined,
                    statusResult,
                };
            }
        }
        const filesToBePushed = new Set();
        const filesToBeDeleted = new Set();
        filesToPush
            .filter((f) => ['workflow', 'credential'].includes(f.type))
            .forEach((e) => {
            if (e.status !== 'deleted') {
                filesToBePushed.add(e.file);
            }
            else {
                filesToBeDeleted.add(e.file);
            }
        });
        this.sourceControlExportService.rmFilesFromExportFolder(filesToBeDeleted);
        const workflowsToBeExported = filesToPush.filter((e) => e.type === 'workflow' && e.status !== 'deleted');
        await this.sourceControlExportService.exportWorkflowsToWorkFolder(workflowsToBeExported);
        const credentialsToBeExported = filesToPush.filter((e) => e.type === 'credential' && e.status !== 'deleted');
        const credentialExportResult = await this.sourceControlExportService.exportCredentialsToWorkFolder(credentialsToBeExported);
        if (credentialExportResult.missingIds && credentialExportResult.missingIds.length > 0) {
            credentialExportResult.missingIds.forEach((id) => {
                filesToBePushed.delete(this.sourceControlExportService.getCredentialsPath(id));
                statusResult = statusResult.filter((e) => e.file !== this.sourceControlExportService.getCredentialsPath(id));
            });
        }
        const tagChanges = filesToPush.find((e) => e.type === 'tags');
        if (tagChanges) {
            filesToBePushed.add(tagChanges.file);
            await this.sourceControlExportService.exportTagsToWorkFolder();
        }
        const folderChanges = filesToPush.find((e) => e.type === 'folders');
        if (folderChanges) {
            filesToBePushed.add(folderChanges.file);
            await this.sourceControlExportService.exportFoldersToWorkFolder();
        }
        const variablesChanges = filesToPush.find((e) => e.type === 'variables');
        if (variablesChanges) {
            filesToBePushed.add(variablesChanges.file);
            await this.sourceControlExportService.exportVariablesToWorkFolder();
        }
        await this.gitService.stage(filesToBePushed, filesToBeDeleted);
        for (let i = 0; i < statusResult.length; i++) {
            if (filesToPush.find((file) => file.file === statusResult[i].file)) {
                statusResult[i].pushed = true;
            }
        }
        await this.gitService.commit(options.commitMessage ?? 'Updated Workfolder');
        const pushResult = await this.gitService.push({
            branch: this.sourceControlPreferencesService.getBranchName(),
            force: options.force ?? false,
        });
        this.eventService.emit('source-control-user-finished-push-ui', (0, source_control_helper_ee_1.getTrackingInformationFromPostPushResult)(user.id, statusResult));
        return {
            statusCode: 200,
            pushResult,
            statusResult,
        };
    }
    getConflicts(files) {
        return files.filter((file) => file.conflict || file.status === 'modified');
    }
    getWorkflowsToImport(files) {
        return files.filter((e) => e.type === 'workflow' && e.status !== 'deleted');
    }
    getWorkflowsToDelete(files) {
        return files.filter((e) => e.type === 'workflow' && e.status === 'deleted');
    }
    getCredentialsToImport(files) {
        return files.filter((e) => e.type === 'credential' && e.status !== 'deleted');
    }
    getCredentialsToDelete(files) {
        return files.filter((e) => e.type === 'credential' && e.status === 'deleted');
    }
    getTagsToImport(files) {
        return files.find((e) => e.type === 'tags' && e.status !== 'deleted');
    }
    getTagsToDelete(files) {
        return files.filter((e) => e.type === 'tags' && e.status === 'deleted');
    }
    getVariablesToImport(files) {
        return files.find((e) => e.type === 'variables' && e.status !== 'deleted');
    }
    getFoldersToImport(files) {
        return files.find((e) => e.type === 'folders' && e.status !== 'deleted');
    }
    getFoldersToDelete(files) {
        return files.filter((e) => e.type === 'folders' && e.status === 'deleted');
    }
    getVariablesToDelete(files) {
        return files.filter((e) => e.type === 'variables' && e.status === 'deleted');
    }
    async pullWorkfolder(user, options) {
        await this.sanityCheck();
        const statusResult = (await this.getStatus(user, {
            direction: 'pull',
            verbose: false,
            preferLocalVersion: false,
        }));
        if (options.force !== true) {
            const possibleConflicts = this.getConflicts(statusResult);
            if (possibleConflicts?.length > 0) {
                await this.gitService.resetBranch();
                return {
                    statusCode: 409,
                    statusResult,
                };
            }
        }
        const foldersToBeImported = this.getFoldersToImport(statusResult);
        if (foldersToBeImported) {
            await this.sourceControlImportService.importFoldersFromWorkFolder(user, foldersToBeImported);
        }
        const workflowsToBeImported = this.getWorkflowsToImport(statusResult);
        await this.sourceControlImportService.importWorkflowFromWorkFolder(workflowsToBeImported, user.id);
        const workflowsToBeDeleted = this.getWorkflowsToDelete(statusResult);
        await this.sourceControlImportService.deleteWorkflowsNotInWorkfolder(user, workflowsToBeDeleted);
        const credentialsToBeImported = this.getCredentialsToImport(statusResult);
        await this.sourceControlImportService.importCredentialsFromWorkFolder(credentialsToBeImported, user.id);
        const credentialsToBeDeleted = this.getCredentialsToDelete(statusResult);
        await this.sourceControlImportService.deleteCredentialsNotInWorkfolder(user, credentialsToBeDeleted);
        const tagsToBeImported = this.getTagsToImport(statusResult);
        if (tagsToBeImported) {
            await this.sourceControlImportService.importTagsFromWorkFolder(tagsToBeImported);
        }
        const tagsToBeDeleted = this.getTagsToDelete(statusResult);
        await this.sourceControlImportService.deleteTagsNotInWorkfolder(tagsToBeDeleted);
        const variablesToBeImported = this.getVariablesToImport(statusResult);
        if (variablesToBeImported) {
            await this.sourceControlImportService.importVariablesFromWorkFolder(variablesToBeImported);
        }
        const variablesToBeDeleted = this.getVariablesToDelete(statusResult);
        await this.sourceControlImportService.deleteVariablesNotInWorkfolder(variablesToBeDeleted);
        const foldersToBeDeleted = this.getFoldersToDelete(statusResult);
        await this.sourceControlImportService.deleteFoldersNotInWorkfolder(foldersToBeDeleted);
        this.eventService.emit('source-control-user-finished-pull-ui', (0, source_control_helper_ee_1.getTrackingInformationFromPullResult)(user.id, statusResult));
        return {
            statusCode: 200,
            statusResult,
        };
    }
    async getStatus(user, options) {
        await this.sanityCheck();
        const sourceControlledFiles = [];
        await this.resetWorkfolder();
        const { wfRemoteVersionIds, wfLocalVersionIds, wfMissingInLocal, wfMissingInRemote, wfModifiedInEither, } = await this.getStatusWorkflows(options, sourceControlledFiles);
        const { credMissingInLocal, credMissingInRemote, credModifiedInEither } = await this.getStatusCredentials(options, sourceControlledFiles);
        const { varMissingInLocal, varMissingInRemote, varModifiedInEither } = await this.getStatusVariables(options, sourceControlledFiles);
        const { tagsMissingInLocal, tagsMissingInRemote, tagsModifiedInEither, mappingsMissingInLocal, mappingsMissingInRemote, } = await this.getStatusTagsMappings(options, sourceControlledFiles);
        const { foldersMissingInLocal, foldersMissingInRemote, foldersModifiedInEither } = await this.getStatusFoldersMapping(options, sourceControlledFiles);
        if (options.direction === 'push') {
            this.eventService.emit('source-control-user-started-push-ui', (0, source_control_helper_ee_1.getTrackingInformationFromPrePushResult)(user.id, sourceControlledFiles));
        }
        else if (options.direction === 'pull') {
            this.eventService.emit('source-control-user-started-pull-ui', (0, source_control_helper_ee_1.getTrackingInformationFromPullResult)(user.id, sourceControlledFiles));
        }
        if (options?.verbose) {
            return {
                wfRemoteVersionIds,
                wfLocalVersionIds,
                wfMissingInLocal,
                wfMissingInRemote,
                wfModifiedInEither,
                credMissingInLocal,
                credMissingInRemote,
                credModifiedInEither,
                varMissingInLocal,
                varMissingInRemote,
                varModifiedInEither,
                tagsMissingInLocal,
                tagsMissingInRemote,
                tagsModifiedInEither,
                mappingsMissingInLocal,
                mappingsMissingInRemote,
                foldersMissingInLocal,
                foldersMissingInRemote,
                foldersModifiedInEither,
                sourceControlledFiles,
            };
        }
        else {
            return sourceControlledFiles;
        }
    }
    async getStatusWorkflows(options, sourceControlledFiles) {
        const wfRemoteVersionIds = await this.sourceControlImportService.getRemoteVersionIdsFromFiles();
        const wfLocalVersionIds = await this.sourceControlImportService.getLocalVersionIdsFromDb();
        const wfMissingInLocal = wfRemoteVersionIds.filter((remote) => wfLocalVersionIds.findIndex((local) => local.id === remote.id) === -1);
        const wfMissingInRemote = wfLocalVersionIds.filter((local) => wfRemoteVersionIds.findIndex((remote) => remote.id === local.id) === -1);
        const wfModifiedInEither = [];
        wfLocalVersionIds.forEach((localWorkflow) => {
            const remoteWorkflowWithSameId = wfRemoteVersionIds.find((removeWorkflow) => removeWorkflow.id === localWorkflow.id);
            if (!remoteWorkflowWithSameId) {
                return;
            }
            if ((0, source_control_helper_ee_1.isWorkflowModified)(localWorkflow, remoteWorkflowWithSameId)) {
                let name = (options?.preferLocalVersion ? localWorkflow?.name : remoteWorkflowWithSameId?.name) ??
                    'Workflow';
                if (localWorkflow.name &&
                    remoteWorkflowWithSameId?.name &&
                    localWorkflow.name !== remoteWorkflowWithSameId.name) {
                    name = options?.preferLocalVersion
                        ? `${localWorkflow.name} (Remote: ${remoteWorkflowWithSameId.name})`
                        : (name = `${remoteWorkflowWithSameId.name} (Local: ${localWorkflow.name})`);
                }
                wfModifiedInEither.push({
                    ...localWorkflow,
                    name,
                    versionId: options.preferLocalVersion
                        ? localWorkflow.versionId
                        : remoteWorkflowWithSameId.versionId,
                    localId: localWorkflow.versionId,
                    remoteId: remoteWorkflowWithSameId.versionId,
                });
            }
        });
        wfMissingInLocal.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name ?? 'Workflow',
                type: 'workflow',
                status: options.direction === 'push' ? 'deleted' : 'created',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: false,
                file: item.filename,
                updatedAt: item.updatedAt ?? new Date().toISOString(),
            });
        });
        wfMissingInRemote.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name ?? 'Workflow',
                type: 'workflow',
                status: options.direction === 'push' ? 'created' : 'deleted',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: options.direction === 'push' ? false : true,
                file: item.filename,
                updatedAt: item.updatedAt ?? new Date().toISOString(),
            });
        });
        wfModifiedInEither.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name ?? 'Workflow',
                type: 'workflow',
                status: 'modified',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: true,
                file: item.filename,
                updatedAt: item.updatedAt ?? new Date().toISOString(),
            });
        });
        return {
            wfRemoteVersionIds,
            wfLocalVersionIds,
            wfMissingInLocal,
            wfMissingInRemote,
            wfModifiedInEither,
        };
    }
    async getStatusCredentials(options, sourceControlledFiles) {
        const credRemoteIds = await this.sourceControlImportService.getRemoteCredentialsFromFiles();
        const credLocalIds = await this.sourceControlImportService.getLocalCredentialsFromDb();
        const credMissingInLocal = credRemoteIds.filter((remote) => credLocalIds.findIndex((local) => local.id === remote.id) === -1);
        const credMissingInRemote = credLocalIds.filter((local) => credRemoteIds.findIndex((remote) => remote.id === local.id) === -1);
        const credModifiedInEither = [];
        credLocalIds.forEach((local) => {
            const mismatchingCreds = credRemoteIds.find((remote) => {
                return remote.id === local.id && (remote.name !== local.name || remote.type !== local.type);
            });
            if (mismatchingCreds) {
                credModifiedInEither.push({
                    ...local,
                    name: options?.preferLocalVersion ? local.name : mismatchingCreds.name,
                });
            }
        });
        credMissingInLocal.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name ?? 'Credential',
                type: 'credential',
                status: options.direction === 'push' ? 'deleted' : 'created',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: false,
                file: item.filename,
                updatedAt: new Date().toISOString(),
            });
        });
        credMissingInRemote.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name ?? 'Credential',
                type: 'credential',
                status: options.direction === 'push' ? 'created' : 'deleted',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: options.direction === 'push' ? false : true,
                file: item.filename,
                updatedAt: new Date().toISOString(),
            });
        });
        credModifiedInEither.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name ?? 'Credential',
                type: 'credential',
                status: 'modified',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: true,
                file: item.filename,
                updatedAt: new Date().toISOString(),
            });
        });
        return {
            credMissingInLocal,
            credMissingInRemote,
            credModifiedInEither,
        };
    }
    async getStatusVariables(options, sourceControlledFiles) {
        const varRemoteIds = await this.sourceControlImportService.getRemoteVariablesFromFile();
        const varLocalIds = await this.sourceControlImportService.getLocalVariablesFromDb();
        const varMissingInLocal = varRemoteIds.filter((remote) => varLocalIds.findIndex((local) => local.id === remote.id) === -1);
        const varMissingInRemote = varLocalIds.filter((local) => varRemoteIds.findIndex((remote) => remote.id === local.id) === -1);
        const varModifiedInEither = [];
        varLocalIds.forEach((local) => {
            const mismatchingIds = varRemoteIds.find((remote) => (remote.id === local.id && remote.key !== local.key) ||
                (remote.id !== local.id && remote.key === local.key));
            if (mismatchingIds) {
                varModifiedInEither.push(options.preferLocalVersion ? local : mismatchingIds);
            }
        });
        varMissingInLocal.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.key,
                type: 'variables',
                status: options.direction === 'push' ? 'deleted' : 'created',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: false,
                file: (0, source_control_helper_ee_1.getVariablesPath)(this.gitFolder),
                updatedAt: new Date().toISOString(),
            });
        });
        varMissingInRemote.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.key,
                type: 'variables',
                status: options.direction === 'push' ? 'created' : 'deleted',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: options.direction === 'push' ? false : true,
                file: (0, source_control_helper_ee_1.getVariablesPath)(this.gitFolder),
                updatedAt: new Date().toISOString(),
            });
        });
        varModifiedInEither.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.key,
                type: 'variables',
                status: 'modified',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: true,
                file: (0, source_control_helper_ee_1.getVariablesPath)(this.gitFolder),
                updatedAt: new Date().toISOString(),
            });
        });
        return {
            varMissingInLocal,
            varMissingInRemote,
            varModifiedInEither,
        };
    }
    async getStatusTagsMappings(options, sourceControlledFiles) {
        const lastUpdatedTag = await this.tagRepository.find({
            order: { updatedAt: 'DESC' },
            take: 1,
            select: ['updatedAt'],
        });
        const tagMappingsRemote = await this.sourceControlImportService.getRemoteTagsAndMappingsFromFile();
        const tagMappingsLocal = await this.sourceControlImportService.getLocalTagsAndMappingsFromDb();
        const tagsMissingInLocal = tagMappingsRemote.tags.filter((remote) => tagMappingsLocal.tags.findIndex((local) => local.id === remote.id) === -1);
        const tagsMissingInRemote = tagMappingsLocal.tags.filter((local) => tagMappingsRemote.tags.findIndex((remote) => remote.id === local.id) === -1);
        const tagsModifiedInEither = [];
        tagMappingsLocal.tags.forEach((local) => {
            const mismatchingIds = tagMappingsRemote.tags.find((remote) => remote.id === local.id && remote.name !== local.name);
            if (!mismatchingIds) {
                return;
            }
            tagsModifiedInEither.push(options.preferLocalVersion ? local : mismatchingIds);
        });
        const mappingsMissingInLocal = tagMappingsRemote.mappings.filter((remote) => tagMappingsLocal.mappings.findIndex((local) => local.tagId === remote.tagId && local.workflowId === remote.workflowId) === -1);
        const mappingsMissingInRemote = tagMappingsLocal.mappings.filter((local) => tagMappingsRemote.mappings.findIndex((remote) => remote.tagId === local.tagId && remote.workflowId === remote.workflowId) === -1);
        tagsMissingInLocal.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name,
                type: 'tags',
                status: options.direction === 'push' ? 'deleted' : 'created',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: false,
                file: (0, source_control_helper_ee_1.getTagsPath)(this.gitFolder),
                updatedAt: lastUpdatedTag[0]?.updatedAt.toISOString(),
            });
        });
        tagsMissingInRemote.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name,
                type: 'tags',
                status: options.direction === 'push' ? 'created' : 'deleted',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: options.direction === 'push' ? false : true,
                file: (0, source_control_helper_ee_1.getTagsPath)(this.gitFolder),
                updatedAt: lastUpdatedTag[0]?.updatedAt.toISOString(),
            });
        });
        tagsModifiedInEither.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name,
                type: 'tags',
                status: 'modified',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: true,
                file: (0, source_control_helper_ee_1.getTagsPath)(this.gitFolder),
                updatedAt: lastUpdatedTag[0]?.updatedAt.toISOString(),
            });
        });
        return {
            tagsMissingInLocal,
            tagsMissingInRemote,
            tagsModifiedInEither,
            mappingsMissingInLocal,
            mappingsMissingInRemote,
        };
    }
    async getStatusFoldersMapping(options, sourceControlledFiles) {
        const lastUpdatedFolder = await this.folderRepository.find({
            order: { updatedAt: 'DESC' },
            take: 1,
            select: ['updatedAt'],
        });
        const foldersMappingsRemote = await this.sourceControlImportService.getRemoteFoldersAndMappingsFromFile();
        const foldersMappingsLocal = await this.sourceControlImportService.getLocalFoldersAndMappingsFromDb();
        const foldersMissingInLocal = foldersMappingsRemote.folders.filter((remote) => foldersMappingsLocal.folders.findIndex((local) => local.id === remote.id) === -1);
        const foldersMissingInRemote = foldersMappingsLocal.folders.filter((local) => foldersMappingsRemote.folders.findIndex((remote) => remote.id === local.id) === -1);
        const foldersModifiedInEither = [];
        foldersMappingsLocal.folders.forEach((local) => {
            const mismatchingIds = foldersMappingsRemote.folders.find((remote) => remote.id === local.id &&
                (remote.name !== local.name || remote.parentFolderId !== local.parentFolderId));
            if (!mismatchingIds) {
                return;
            }
            foldersModifiedInEither.push(options.preferLocalVersion ? local : mismatchingIds);
        });
        foldersMissingInLocal.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name,
                type: 'folders',
                status: options.direction === 'push' ? 'deleted' : 'created',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: false,
                file: (0, source_control_helper_ee_1.getFoldersPath)(this.gitFolder),
                updatedAt: lastUpdatedFolder[0]?.updatedAt.toISOString(),
            });
        });
        foldersMissingInRemote.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name,
                type: 'folders',
                status: options.direction === 'push' ? 'created' : 'deleted',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: options.direction === 'push' ? false : true,
                file: (0, source_control_helper_ee_1.getFoldersPath)(this.gitFolder),
                updatedAt: lastUpdatedFolder[0]?.updatedAt.toISOString(),
            });
        });
        foldersModifiedInEither.forEach((item) => {
            sourceControlledFiles.push({
                id: item.id,
                name: item.name,
                type: 'folders',
                status: 'modified',
                location: options.direction === 'push' ? 'local' : 'remote',
                conflict: true,
                file: (0, source_control_helper_ee_1.getFoldersPath)(this.gitFolder),
                updatedAt: lastUpdatedFolder[0]?.updatedAt.toISOString(),
            });
        });
        return {
            foldersMissingInLocal,
            foldersMissingInRemote,
            foldersModifiedInEither,
        };
    }
    async setGitUserDetails(name = constants_1.SOURCE_CONTROL_DEFAULT_NAME, email = constants_1.SOURCE_CONTROL_DEFAULT_EMAIL) {
        await this.sanityCheck();
        await this.gitService.setGitUserDetails(name, email);
    }
};
exports.SourceControlService = SourceControlService;
exports.SourceControlService = SourceControlService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [n8n_core_1.Logger,
        source_control_git_service_ee_1.SourceControlGitService,
        source_control_preferences_service_ee_1.SourceControlPreferencesService,
        source_control_export_service_ee_1.SourceControlExportService,
        source_control_import_service_ee_1.SourceControlImportService,
        db_1.TagRepository,
        db_1.FolderRepository,
        event_service_1.EventService])
], SourceControlService);
//# sourceMappingURL=source-control.service.ee.js.map