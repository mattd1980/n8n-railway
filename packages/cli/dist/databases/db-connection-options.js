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
exports.DbConnectionOptions = void 0;
const config_1 = require("@n8n/config");
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const n8n_workflow_1 = require("n8n-workflow");
const path_1 = __importDefault(require("path"));
const insights_by_period_1 = require("../modules/insights/database/entities/insights-by-period");
const insights_metadata_1 = require("../modules/insights/database/entities/insights-metadata");
const insights_raw_1 = require("../modules/insights/database/entities/insights-raw");
let DbConnectionOptions = class DbConnectionOptions {
    constructor(config, instanceSettingsConfig) {
        this.config = config;
        this.instanceSettingsConfig = instanceSettingsConfig;
    }
    getOverrides(dbType) {
        const dbConfig = this.config[dbType];
        return {
            database: dbConfig.database,
            host: dbConfig.host,
            port: dbConfig.port,
            username: dbConfig.user,
            password: dbConfig.password,
        };
    }
    getOptions() {
        const { type: dbType } = this.config;
        switch (dbType) {
            case 'sqlite':
                return this.getSqliteConnectionOptions();
            case 'postgresdb':
                return this.getPostgresConnectionOptions();
            case 'mariadb':
            case 'mysqldb':
                return this.getMysqlConnectionOptions(dbType);
            default:
                throw new n8n_workflow_1.UserError('Database type currently not supported', { extra: { dbType } });
        }
    }
    getCommonOptions() {
        const { tablePrefix: entityPrefix, logging: loggingConfig } = this.config;
        let loggingOption = loggingConfig.enabled;
        if (loggingOption) {
            const optionsString = loggingConfig.options.replace(/\s+/g, '');
            if (optionsString === 'all') {
                loggingOption = optionsString;
            }
            else {
                loggingOption = optionsString.split(',');
            }
        }
        return {
            entityPrefix,
            entities: [...Object.values(db_1.entities), insights_raw_1.InsightsRaw, insights_by_period_1.InsightsByPeriod, insights_metadata_1.InsightsMetadata],
            subscribers: Object.values(db_1.subscribers),
            migrationsTableName: `${entityPrefix}migrations`,
            migrationsRun: false,
            synchronize: false,
            maxQueryExecutionTime: loggingConfig.maxQueryExecutionTime,
            logging: loggingOption,
        };
    }
    getSqliteConnectionOptions() {
        const { sqlite: sqliteConfig } = this.config;
        const { n8nFolder } = this.instanceSettingsConfig;
        const commonOptions = {
            ...this.getCommonOptions(),
            database: path_1.default.resolve(n8nFolder, sqliteConfig.database),
            migrations: db_1.sqliteMigrations,
        };
        if (sqliteConfig.poolSize > 0) {
            return {
                type: 'sqlite-pooled',
                poolSize: sqliteConfig.poolSize,
                enableWAL: true,
                acquireTimeout: 60_000,
                destroyTimeout: 5_000,
                ...commonOptions,
            };
        }
        else {
            return {
                type: 'sqlite',
                enableWAL: sqliteConfig.enableWAL,
                ...commonOptions,
            };
        }
    }
    getPostgresConnectionOptions() {
        const { postgresdb: postgresConfig } = this.config;
        const { ssl: { ca: sslCa, cert: sslCert, key: sslKey, rejectUnauthorized: sslRejectUnauthorized }, } = postgresConfig;
        let ssl = postgresConfig.ssl.enabled;
        if (sslCa !== '' || sslCert !== '' || sslKey !== '' || !sslRejectUnauthorized) {
            ssl = {
                ca: sslCa || undefined,
                cert: sslCert || undefined,
                key: sslKey || undefined,
                rejectUnauthorized: sslRejectUnauthorized,
            };
        }
        return {
            type: 'postgres',
            ...this.getCommonOptions(),
            ...this.getOverrides('postgresdb'),
            schema: postgresConfig.schema,
            poolSize: postgresConfig.poolSize,
            migrations: db_1.postgresMigrations,
            connectTimeoutMS: postgresConfig.connectionTimeoutMs,
            ssl,
        };
    }
    getMysqlConnectionOptions(dbType) {
        return {
            type: dbType === 'mysqldb' ? 'mysql' : 'mariadb',
            ...this.getCommonOptions(),
            ...this.getOverrides('mysqldb'),
            migrations: db_1.mysqlMigrations,
            timezone: 'Z',
        };
    }
};
exports.DbConnectionOptions = DbConnectionOptions;
exports.DbConnectionOptions = DbConnectionOptions = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [config_1.DatabaseConfig,
        config_1.InstanceSettingsConfig])
], DbConnectionOptions);
//# sourceMappingURL=db-connection-options.js.map