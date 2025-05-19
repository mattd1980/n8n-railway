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
exports.LdapService = void 0;
const constants_1 = require("@n8n/constants");
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const ldapts_1 = require("ldapts");
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const config_1 = __importDefault(require("../config"));
const bad_request_error_1 = require("../errors/response-errors/bad-request.error");
const internal_server_error_1 = require("../errors/response-errors/internal-server.error");
const event_service_1 = require("../events/event.service");
const sso_helpers_1 = require("../sso.ee/sso-helpers");
const constants_2 = require("./constants");
const helpers_ee_1 = require("./helpers.ee");
let LdapService = class LdapService {
    constructor(logger, settingsRepository, cipher, eventService) {
        this.logger = logger;
        this.settingsRepository = settingsRepository;
        this.cipher = cipher;
        this.eventService = eventService;
        this.syncTimer = undefined;
    }
    async init() {
        const ldapConfig = await this.loadConfig();
        try {
            await this.setGlobalLdapConfigVariables(ldapConfig);
        }
        catch (error) {
            this.logger.warn(`Cannot set LDAP login enabled state when an authentication method other than email or ldap is active (current: ${(0, sso_helpers_1.getCurrentAuthenticationMethod)()})`, error);
        }
        this.setConfig(ldapConfig);
    }
    async loadConfig() {
        const { value } = await this.settingsRepository.findOneByOrFail({
            key: constants_1.LDAP_FEATURE_NAME,
        });
        const ldapConfig = (0, n8n_workflow_1.jsonParse)(value);
        ldapConfig.bindingAdminPassword = this.cipher.decrypt(ldapConfig.bindingAdminPassword);
        return ldapConfig;
    }
    async updateConfig(ldapConfig) {
        const { valid, message } = (0, helpers_ee_1.validateLdapConfigurationSchema)(ldapConfig);
        if (!valid) {
            throw new n8n_workflow_1.UnexpectedError(message);
        }
        if (ldapConfig.loginEnabled && (0, sso_helpers_1.getCurrentAuthenticationMethod)() === 'saml') {
            throw new bad_request_error_1.BadRequestError('LDAP cannot be enabled if SSO in enabled');
        }
        this.setConfig({ ...ldapConfig });
        ldapConfig.bindingAdminPassword = this.cipher.encrypt(ldapConfig.bindingAdminPassword);
        if (!ldapConfig.loginEnabled) {
            ldapConfig.synchronizationEnabled = false;
            const ldapUsers = await (0, helpers_ee_1.getLdapUsers)();
            if (ldapUsers.length) {
                await (0, helpers_ee_1.deleteAllLdapIdentities)();
            }
        }
        await this.settingsRepository.update({ key: constants_1.LDAP_FEATURE_NAME }, { value: JSON.stringify(ldapConfig), loadOnStartup: true });
        await this.setGlobalLdapConfigVariables(ldapConfig);
    }
    setConfig(ldapConfig) {
        this.config = ldapConfig;
        this.client = undefined;
        if (this.syncTimer && !this.config.synchronizationEnabled) {
            this.stopSync();
        }
        else if (!this.syncTimer && this.config.synchronizationEnabled) {
            this.scheduleSync();
        }
        else if (this.syncTimer && this.config.synchronizationEnabled) {
            this.stopSync();
            this.scheduleSync();
        }
    }
    async setGlobalLdapConfigVariables(ldapConfig) {
        await this.setLdapLoginEnabled(ldapConfig.loginEnabled);
        config_1.default.set(constants_2.LDAP_LOGIN_LABEL, ldapConfig.loginLabel);
    }
    async setLdapLoginEnabled(enabled) {
        if ((0, sso_helpers_1.isEmailCurrentAuthenticationMethod)() || (0, sso_helpers_1.isLdapCurrentAuthenticationMethod)()) {
            if (enabled) {
                config_1.default.set(constants_2.LDAP_LOGIN_ENABLED, true);
                await (0, sso_helpers_1.setCurrentAuthenticationMethod)('ldap');
            }
            else if (!enabled) {
                config_1.default.set(constants_2.LDAP_LOGIN_ENABLED, false);
                await (0, sso_helpers_1.setCurrentAuthenticationMethod)('email');
            }
        }
        else {
            throw new internal_server_error_1.InternalServerError(`Cannot switch LDAP login enabled state when an authentication method other than email or ldap is active (current: ${(0, sso_helpers_1.getCurrentAuthenticationMethod)()})`);
        }
    }
    async getClient() {
        if (this.config === undefined) {
            throw new n8n_workflow_1.UnexpectedError('Service cannot be used without setting the property config');
        }
        if (this.client === undefined) {
            const url = (0, helpers_ee_1.formatUrl)(this.config.connectionUrl, this.config.connectionPort, this.config.connectionSecurity);
            const ldapOptions = { url };
            const tlsOptions = {};
            if (this.config.connectionSecurity !== 'none') {
                Object.assign(tlsOptions, {
                    rejectUnauthorized: !this.config.allowUnauthorizedCerts,
                });
                if (this.config.connectionSecurity === 'tls') {
                    ldapOptions.tlsOptions = tlsOptions;
                }
            }
            this.client = new ldapts_1.Client(ldapOptions);
            if (this.config.connectionSecurity === 'startTls') {
                await this.client.startTLS(tlsOptions);
            }
        }
    }
    async bindAdmin() {
        await this.getClient();
        if (this.client) {
            await this.client.bind(this.config.bindingAdminDn, this.config.bindingAdminPassword);
        }
    }
    async searchWithAdminBinding(filter) {
        await this.bindAdmin();
        if (this.client) {
            const { searchEntries } = await this.client.search(this.config.baseDn, {
                attributes: (0, helpers_ee_1.getMappingAttributes)(this.config),
                explicitBufferAttributes: constants_2.BINARY_AD_ATTRIBUTES,
                filter,
                timeLimit: this.config.searchTimeout,
                paged: { pageSize: this.config.searchPageSize },
                ...(this.config.searchPageSize === 0 && { paged: true }),
            });
            await this.client.unbind();
            return searchEntries;
        }
        return [];
    }
    async validUser(dn, password) {
        await this.getClient();
        if (this.client) {
            await this.client.bind(dn, password);
            await this.client.unbind();
        }
    }
    async findAndAuthenticateLdapUser(loginId, password, loginIdAttribute, userFilter) {
        let searchResult = [];
        try {
            searchResult = await this.searchWithAdminBinding((0, helpers_ee_1.createFilter)(`(${loginIdAttribute}=${(0, helpers_ee_1.escapeFilter)(loginId)})`, userFilter));
        }
        catch (e) {
            if (e instanceof Error) {
                this.eventService.emit('ldap-login-sync-failed', { error: e.message });
                this.logger.error('LDAP - Error during search', { message: e.message });
            }
            return undefined;
        }
        if (!searchResult.length) {
            return undefined;
        }
        let user = searchResult.pop();
        if (user === undefined) {
            user = { dn: '' };
        }
        try {
            await this.validUser(user.dn, password);
        }
        catch (e) {
            if (e instanceof Error) {
                this.logger.error('LDAP - Error validating user against LDAP server', {
                    message: e.message,
                });
            }
            return undefined;
        }
        (0, helpers_ee_1.resolveEntryBinaryAttributes)(user);
        return user;
    }
    async testConnection() {
        await this.bindAdmin();
    }
    scheduleSync() {
        if (!this.config.synchronizationInterval) {
            throw new n8n_workflow_1.UnexpectedError('Interval variable has to be defined');
        }
        this.syncTimer = setInterval(async () => {
            await this.runSync('live');
        }, this.config.synchronizationInterval * 60000);
    }
    async runSync(mode) {
        this.logger.debug(`LDAP - Starting a synchronization run in ${mode} mode`);
        let adUsers = [];
        try {
            adUsers = await this.searchWithAdminBinding((0, helpers_ee_1.createFilter)(`(${this.config.loginIdAttribute}=*)`, this.config.userFilter));
            this.logger.debug('LDAP - Users return by the query', {
                users: adUsers,
            });
            (0, helpers_ee_1.resolveBinaryAttributes)(adUsers);
        }
        catch (e) {
            if (e instanceof Error) {
                this.logger.error(`LDAP - ${e.message}`);
                throw e;
            }
        }
        const startedAt = new Date();
        const localAdUsers = await (0, helpers_ee_1.getLdapIds)();
        const { usersToCreate, usersToUpdate, usersToDisable } = this.getUsersToProcess(adUsers, localAdUsers);
        this.logger.debug('LDAP - Users to process', {
            created: usersToCreate.length,
            updated: usersToUpdate.length,
            disabled: usersToDisable.length,
        });
        const endedAt = new Date();
        let status = 'success';
        let errorMessage = '';
        try {
            if (mode === 'live') {
                await (0, helpers_ee_1.processUsers)(usersToCreate, usersToUpdate, usersToDisable);
            }
        }
        catch (error) {
            if (error instanceof typeorm_1.QueryFailedError) {
                status = 'error';
                errorMessage = `${error.message}`;
            }
        }
        await (0, helpers_ee_1.saveLdapSynchronization)({
            startedAt,
            endedAt,
            created: usersToCreate.length,
            updated: usersToUpdate.length,
            disabled: usersToDisable.length,
            scanned: adUsers.length,
            runMode: mode,
            status,
            error: errorMessage,
        });
        this.eventService.emit('ldap-general-sync-finished', {
            type: !this.syncTimer ? 'scheduled' : `manual_${mode}`,
            succeeded: true,
            usersSynced: usersToCreate.length + usersToUpdate.length + usersToDisable.length,
            error: errorMessage,
        });
        this.logger.debug('LDAP - Synchronization finished successfully');
    }
    stopSync() {
        clearInterval(this.syncTimer);
        this.syncTimer = undefined;
    }
    getUsersToProcess(adUsers, localAdUsers) {
        return {
            usersToCreate: this.getUsersToCreate(adUsers, localAdUsers),
            usersToUpdate: this.getUsersToUpdate(adUsers, localAdUsers),
            usersToDisable: this.getUsersToDisable(adUsers, localAdUsers),
        };
    }
    getUsersToCreate(remoteAdUsers, localLdapIds) {
        return remoteAdUsers
            .filter((adUser) => !localLdapIds.includes(adUser[this.config.ldapIdAttribute]))
            .map((adUser) => (0, helpers_ee_1.mapLdapUserToDbUser)(adUser, this.config, true));
    }
    getUsersToUpdate(remoteAdUsers, localLdapIds) {
        return remoteAdUsers
            .filter((adUser) => localLdapIds.includes(adUser[this.config.ldapIdAttribute]))
            .map((adUser) => (0, helpers_ee_1.mapLdapUserToDbUser)(adUser, this.config));
    }
    getUsersToDisable(remoteAdUsers, localLdapIds) {
        const remoteAdUserIds = remoteAdUsers.map((adUser) => adUser[this.config.ldapIdAttribute]);
        return localLdapIds.filter((user) => !remoteAdUserIds.includes(user));
    }
};
exports.LdapService = LdapService;
exports.LdapService = LdapService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [n8n_core_1.Logger,
        db_1.SettingsRepository,
        n8n_core_1.Cipher,
        event_service_1.EventService])
], LdapService);
//# sourceMappingURL=ldap.service.ee.js.map