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
exports.DbConnection = void 0;
const backend_common_1 = require("@n8n/backend-common");
const db_1 = require("@n8n/db");
const decorators_1 = require("@n8n/decorators");
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const db_connection_options_1 = require("./db-connection-options");
let DbConnection = class DbConnection {
    constructor(errorReporter, connectionOptions) {
        this.errorReporter = errorReporter;
        this.connectionOptions = connectionOptions;
        this.connectionState = {
            connected: false,
            migrated: false,
        };
        this.dataSource = new typeorm_1.DataSource(this.options);
        di_1.Container.set(typeorm_1.DataSource, this.dataSource);
    }
    get options() {
        return this.connectionOptions.getOptions();
    }
    async init() {
        const { connectionState, options } = this;
        if (connectionState.connected)
            return;
        try {
            await this.dataSource.initialize();
        }
        catch (e) {
            let error = (0, n8n_workflow_1.ensureError)(e);
            if (options.type === 'postgres' &&
                error.message === 'Connection terminated due to connection timeout') {
                error = new n8n_workflow_1.DbConnectionTimeoutError({
                    cause: error,
                    configuredTimeoutInMs: options.connectTimeoutMS,
                });
            }
            throw error;
        }
        connectionState.connected = true;
        if (!backend_common_1.inTest)
            this.scheduleNextPing();
    }
    async migrate() {
        const { dataSource, connectionState } = this;
        dataSource.options.migrations.forEach(db_1.wrapMigration);
        await dataSource.runMigrations({ transaction: 'each' });
        connectionState.migrated = true;
    }
    async close() {
        if (this.pingTimer) {
            clearTimeout(this.pingTimer);
            this.pingTimer = undefined;
        }
        if (this.dataSource.isInitialized) {
            await this.dataSource.destroy();
            this.connectionState.connected = false;
        }
    }
    scheduleNextPing() {
        this.pingTimer = setTimeout(async () => await this.ping(), 2000);
    }
    async ping() {
        if (!this.dataSource.isInitialized)
            return;
        try {
            await this.dataSource.query('SELECT 1');
            this.connectionState.connected = true;
            return;
        }
        catch (error) {
            this.connectionState.connected = false;
            this.errorReporter.error(error);
        }
        finally {
            this.scheduleNextPing();
        }
    }
};
exports.DbConnection = DbConnection;
__decorate([
    decorators_1.Memoized,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DbConnection.prototype, "options", null);
exports.DbConnection = DbConnection = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [n8n_core_1.ErrorReporter,
        db_connection_options_1.DbConnectionOptions])
], DbConnection);
//# sourceMappingURL=db-connection.js.map