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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const api_types_1 = require("@n8n/api-types");
const db_1 = require("@n8n/db");
const decorators_1 = require("@n8n/decorators");
const n8n_core_1 = require("n8n-core");
const auth_service_1 = require("../auth/auth.service");
const credentials_service_1 = require("../credentials/credentials.service");
const bad_request_error_1 = require("../errors/response-errors/bad-request.error");
const forbidden_error_1 = require("../errors/response-errors/forbidden.error");
const not_found_error_1 = require("../errors/response-errors/not-found.error");
const event_service_1 = require("../events/event.service");
const external_hooks_1 = require("../external-hooks");
const middlewares_1 = require("../middlewares");
const folder_service_1 = require("../services/folder.service");
const project_service_ee_1 = require("../services/project.service.ee");
const user_service_1 = require("../services/user.service");
const workflow_service_1 = require("../workflows/workflow.service");
let UsersController = UsersController_1 = class UsersController {
    constructor(logger, externalHooks, sharedCredentialsRepository, sharedWorkflowRepository, userRepository, authService, userService, projectRepository, workflowService, credentialsService, projectService, eventService, folderService) {
        this.logger = logger;
        this.externalHooks = externalHooks;
        this.sharedCredentialsRepository = sharedCredentialsRepository;
        this.sharedWorkflowRepository = sharedWorkflowRepository;
        this.userRepository = userRepository;
        this.authService = authService;
        this.userService = userService;
        this.projectRepository = projectRepository;
        this.workflowService = workflowService;
        this.credentialsService = credentialsService;
        this.projectService = projectService;
        this.eventService = eventService;
        this.folderService = folderService;
    }
    removeSupplementaryFields(publicUsers, listQueryOptions) {
        const { take, select, filter } = listQueryOptions;
        if (take && select && !select?.id) {
            for (const user of publicUsers)
                delete user.id;
        }
        if (filter?.isOwner) {
            for (const user of publicUsers)
                delete user.role;
        }
        if (select) {
            for (const user of publicUsers) {
                delete user.isOwner;
                delete user.isPending;
                delete user.signInType;
            }
        }
        return publicUsers;
    }
    async listUsers(req) {
        const { listQueryOptions } = req;
        const findManyOptions = await this.userRepository.toFindManyOptions(listQueryOptions);
        const users = await this.userRepository.find(findManyOptions);
        const publicUsers = await Promise.all(users.map(async (u) => await this.userService.toPublic(u, { withInviteUrl: true, inviterId: req.user.id })));
        return listQueryOptions
            ? this.removeSupplementaryFields(publicUsers, listQueryOptions)
            : publicUsers;
    }
    async getUserPasswordResetLink(req) {
        const user = await this.userRepository.findOneOrFail({
            where: { id: req.params.id },
        });
        if (!user) {
            throw new not_found_error_1.NotFoundError('User not found');
        }
        if (req.user.role === 'global:admin' && user.role === 'global:owner') {
            throw new forbidden_error_1.ForbiddenError('Admin cannot reset password of global owner');
        }
        const link = this.authService.generatePasswordResetUrl(user);
        return { link };
    }
    async updateUserSettings(_req, _res, payload, id) {
        await this.userService.updateSettings(id, payload);
        const user = await this.userRepository.findOneOrFail({
            select: ['settings'],
            where: { id },
        });
        return user.settings;
    }
    async deleteUser(req) {
        const { id: idToDelete } = req.params;
        if (req.user.id === idToDelete) {
            this.logger.debug('Request to delete a user failed because it attempted to delete the requesting user', { userId: req.user.id });
            throw new bad_request_error_1.BadRequestError('Cannot delete your own user');
        }
        const { transferId } = req.query;
        const userToDelete = await this.userRepository.findOneBy({ id: idToDelete });
        if (!userToDelete) {
            throw new not_found_error_1.NotFoundError('Request to delete a user failed because the user to delete was not found in DB');
        }
        if (userToDelete.role === 'global:owner') {
            throw new forbidden_error_1.ForbiddenError('Instance owner cannot be deleted.');
        }
        const personalProjectToDelete = await this.projectRepository.getPersonalProjectForUserOrFail(userToDelete.id);
        if (transferId === personalProjectToDelete.id) {
            throw new bad_request_error_1.BadRequestError('Request to delete a user failed because the user to delete and the transferee are the same user');
        }
        let transfereeId;
        if (transferId) {
            const transfereeProject = await this.projectRepository.findOneBy({ id: transferId });
            if (!transfereeProject) {
                throw new not_found_error_1.NotFoundError('Request to delete a user failed because the transferee project was not found in DB');
            }
            const transferee = await this.userRepository.findOneByOrFail({
                projectRelations: {
                    projectId: transfereeProject.id,
                },
            });
            transfereeId = transferee.id;
            await this.userService.getManager().transaction(async (trx) => {
                await this.workflowService.transferAll(personalProjectToDelete.id, transfereeProject.id, trx);
                await this.credentialsService.transferAll(personalProjectToDelete.id, transfereeProject.id, trx);
                await this.folderService.transferAllFoldersToProject(personalProjectToDelete.id, transfereeProject.id, trx);
            });
            await this.projectService.clearCredentialCanUseExternalSecretsCache(transfereeProject.id);
        }
        const [ownedSharedWorkflows, ownedSharedCredentials] = await Promise.all([
            this.sharedWorkflowRepository.find({
                select: { workflowId: true },
                where: { projectId: personalProjectToDelete.id, role: 'workflow:owner' },
            }),
            this.sharedCredentialsRepository.find({
                relations: { credentials: true },
                where: { projectId: personalProjectToDelete.id, role: 'credential:owner' },
            }),
        ]);
        const ownedCredentials = ownedSharedCredentials.map(({ credentials }) => credentials);
        for (const { workflowId } of ownedSharedWorkflows) {
            await this.workflowService.delete(userToDelete, workflowId, true);
        }
        for (const credential of ownedCredentials) {
            await this.credentialsService.delete(userToDelete, credential.id);
        }
        await this.userService.getManager().transaction(async (trx) => {
            await trx.delete(db_1.AuthIdentity, { userId: userToDelete.id });
            await trx.delete(db_1.Project, { id: personalProjectToDelete.id });
            await trx.delete(db_1.User, { id: userToDelete.id });
        });
        this.eventService.emit('user-deleted', {
            user: req.user,
            publicApi: false,
            targetUserOldStatus: userToDelete.isPending ? 'invited' : 'active',
            targetUserId: idToDelete,
            migrationStrategy: transferId ? 'transfer_data' : 'delete_data',
            migrationUserId: transfereeId,
        });
        await this.externalHooks.run('user.deleted', [await this.userService.toPublic(userToDelete)]);
        return { success: true };
    }
    async changeGlobalRole(req, _, payload, id) {
        const { NO_ADMIN_ON_OWNER, NO_USER, NO_OWNER_ON_OWNER } = UsersController_1.ERROR_MESSAGES.CHANGE_ROLE;
        const targetUser = await this.userRepository.findOneBy({ id });
        if (targetUser === null) {
            throw new not_found_error_1.NotFoundError(NO_USER);
        }
        if (req.user.role === 'global:admin' && targetUser.role === 'global:owner') {
            throw new forbidden_error_1.ForbiddenError(NO_ADMIN_ON_OWNER);
        }
        if (req.user.role === 'global:owner' && targetUser.role === 'global:owner') {
            throw new forbidden_error_1.ForbiddenError(NO_OWNER_ON_OWNER);
        }
        await this.userService.changeUserRole(req.user, targetUser, payload);
        this.eventService.emit('user-changed-role', {
            userId: req.user.id,
            targetUserId: targetUser.id,
            targetUserNewRole: payload.newRoleName,
            publicApi: false,
        });
        const projects = await this.projectService.getUserOwnedOrAdminProjects(targetUser.id);
        await Promise.all(projects.map(async (p) => await this.projectService.clearCredentialCanUseExternalSecretsCache(p.id)));
        return { success: true };
    }
};
exports.UsersController = UsersController;
UsersController.ERROR_MESSAGES = {
    CHANGE_ROLE: {
        NO_USER: 'Target user not found',
        NO_ADMIN_ON_OWNER: 'Admin cannot change role on global owner',
        NO_OWNER_ON_OWNER: 'Owner cannot change role on global owner',
    },
};
__decorate([
    (0, decorators_1.Get)('/', { middlewares: middlewares_1.listQueryMiddleware }),
    (0, decorators_1.GlobalScope)('user:list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "listUsers", null);
__decorate([
    (0, decorators_1.Get)('/:id/password-reset-link'),
    (0, decorators_1.GlobalScope)('user:resetPassword'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserPasswordResetLink", null);
__decorate([
    (0, decorators_1.Patch)('/:id/settings'),
    (0, decorators_1.GlobalScope)('user:update'),
    __param(2, decorators_1.Body),
    __param(3, (0, decorators_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, api_types_1.SettingsUpdateRequestDto, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserSettings", null);
__decorate([
    (0, decorators_1.Delete)('/:id'),
    (0, decorators_1.GlobalScope)('user:delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, decorators_1.Patch)('/:id/role'),
    (0, decorators_1.GlobalScope)('user:changeRole'),
    (0, decorators_1.Licensed)('feat:advancedPermissions'),
    __param(2, decorators_1.Body),
    __param(3, (0, decorators_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, api_types_1.RoleChangeRequestDto, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changeGlobalRole", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, decorators_1.RestController)('/users'),
    __metadata("design:paramtypes", [n8n_core_1.Logger,
        external_hooks_1.ExternalHooks,
        db_1.SharedCredentialsRepository,
        db_1.SharedWorkflowRepository,
        db_1.UserRepository,
        auth_service_1.AuthService,
        user_service_1.UserService,
        db_1.ProjectRepository,
        workflow_service_1.WorkflowService,
        credentials_service_1.CredentialsService,
        project_service_ee_1.ProjectService,
        event_service_1.EventService,
        folder_service_1.FolderService])
], UsersController);
//# sourceMappingURL=users.controller.js.map