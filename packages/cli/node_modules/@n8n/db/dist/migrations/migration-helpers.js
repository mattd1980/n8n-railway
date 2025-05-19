"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapMigration = void 0;
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const fs_1 = require("fs");
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const dsl_1 = require("./dsl");
const PERSONALIZATION_SURVEY_FILENAME = 'personalizationSurvey.json';
function loadSurveyFromDisk() {
    try {
        const filename = `${di_1.Container.get(n8n_core_1.InstanceSettings).n8nFolder}/${PERSONALIZATION_SURVEY_FILENAME}`;
        const surveyFile = (0, fs_1.readFileSync)(filename, 'utf-8');
        (0, fs_1.rmSync)(filename);
        const personalizationSurvey = JSON.parse(surveyFile);
        const kvPairs = Object.entries(personalizationSurvey);
        if (!kvPairs.length) {
            throw new n8n_workflow_1.UnexpectedError('personalizationSurvey is empty');
        }
        else {
            const emptyKeys = kvPairs.reduce((acc, [, value]) => {
                if (!value || (Array.isArray(value) && !value.length)) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            if (emptyKeys === kvPairs.length) {
                throw new n8n_workflow_1.UnexpectedError('incomplete personalizationSurvey');
            }
        }
        return surveyFile;
    }
    catch {
        return null;
    }
}
let runningMigrations = false;
function logMigrationStart(migrationName) {
    if (process.env.NODE_ENV === 'test')
        return;
    const logger = di_1.Container.get(n8n_core_1.Logger);
    if (!runningMigrations) {
        logger.warn('Migrations in progress, please do NOT stop the process.');
        runningMigrations = true;
    }
    logger.info(`Starting migration ${migrationName}`);
}
function logMigrationEnd(migrationName) {
    if (process.env.NODE_ENV === 'test')
        return;
    const logger = di_1.Container.get(n8n_core_1.Logger);
    logger.info(`Finished migration ${migrationName}`);
}
const runDisablingForeignKeys = async (migration, context, fn) => {
    const { dbType, queryRunner } = context;
    if (dbType !== 'sqlite')
        throw new n8n_workflow_1.UnexpectedError('Disabling transactions only available in sqlite');
    await queryRunner.query('PRAGMA foreign_keys=OFF');
    await queryRunner.startTransaction();
    try {
        await fn.call(migration, context);
        await queryRunner.commitTransaction();
    }
    catch (e) {
        try {
            await queryRunner.rollbackTransaction();
        }
        catch { }
        throw e;
    }
    finally {
        await queryRunner.query('PRAGMA foreign_keys=ON');
    }
};
function parseJson(data) {
    return typeof data === 'string' ? (0, n8n_workflow_1.jsonParse)(data) : data;
}
const globalConfig = di_1.Container.get(config_1.GlobalConfig);
const dbType = globalConfig.database.type;
const isMysql = ['mariadb', 'mysqldb'].includes(dbType);
const isSqlite = dbType === 'sqlite';
const isPostgres = dbType === 'postgresdb';
const dbName = globalConfig.database[dbType === 'mariadb' ? 'mysqldb' : dbType].database;
const tablePrefix = globalConfig.database.tablePrefix;
const createContext = (queryRunner, migration) => ({
    logger: di_1.Container.get(n8n_core_1.Logger),
    tablePrefix,
    dbType,
    isMysql,
    isSqlite,
    isPostgres,
    dbName,
    migrationName: migration.name,
    queryRunner,
    schemaBuilder: (0, dsl_1.createSchemaBuilder)(tablePrefix, queryRunner),
    loadSurveyFromDisk,
    parseJson,
    escape: {
        columnName: (name) => queryRunner.connection.driver.escape(name),
        tableName: (name) => queryRunner.connection.driver.escape(`${tablePrefix}${name}`),
        indexName: (name) => queryRunner.connection.driver.escape(`IDX_${tablePrefix}${name}`),
    },
    runQuery: async (sql, namedParameters) => {
        if (namedParameters) {
            const [query, parameters] = queryRunner.connection.driver.escapeQueryWithParameters(sql, namedParameters, {});
            return await queryRunner.query(query, parameters);
        }
        else {
            return await queryRunner.query(sql);
        }
    },
    runInBatches: async (query, operation, limit = 100) => {
        let offset = 0;
        let batchedQuery;
        let batchedQueryResults;
        if (query.trim().endsWith(';'))
            query = query.trim().slice(0, -1);
        do {
            batchedQuery = `${query} LIMIT ${limit} OFFSET ${offset}`;
            batchedQueryResults = (await queryRunner.query(batchedQuery));
            await operation([...batchedQueryResults]);
            offset += limit;
        } while (batchedQueryResults.length === limit);
    },
    copyTable: async (fromTable, toTable, fromFields, toFields, batchSize) => {
        const { driver } = queryRunner.connection;
        fromTable = driver.escape(`${tablePrefix}${fromTable}`);
        toTable = driver.escape(`${tablePrefix}${toTable}`);
        const fromFieldsStr = fromFields?.length
            ? fromFields.map((f) => driver.escape(f)).join(', ')
            : '*';
        const toFieldsStr = toFields?.length
            ? `(${toFields.map((f) => driver.escape(f)).join(', ')})`
            : '';
        const total = await queryRunner
            .query(`SELECT COUNT(*) AS count FROM ${fromTable}`)
            .then((rows) => rows[0].count);
        batchSize = batchSize ?? 10;
        let migrated = 0;
        while (migrated < total) {
            await queryRunner.query(`INSERT INTO ${toTable} ${toFieldsStr} SELECT ${fromFieldsStr} FROM ${fromTable} LIMIT ${migrated}, ${batchSize}`);
            migrated += batchSize;
        }
    },
});
const wrapMigration = (migration) => {
    const { up, down } = migration.prototype;
    if (up) {
        Object.assign(migration.prototype, {
            async up(queryRunner) {
                logMigrationStart(migration.name);
                const context = createContext(queryRunner, migration);
                if (this.transaction === false) {
                    await runDisablingForeignKeys(this, context, up);
                }
                else {
                    await up.call(this, context);
                }
                logMigrationEnd(migration.name);
            },
        });
    }
    else {
        throw new n8n_workflow_1.UnexpectedError(`Migration "${migration.name}" is missing the method \`up\`.`);
    }
    if (down) {
        Object.assign(migration.prototype, {
            async down(queryRunner) {
                const context = createContext(queryRunner, migration);
                if (this.transaction === false) {
                    await runDisablingForeignKeys(this, context, down);
                }
                else {
                    await down.call(this, context);
                }
            },
        });
    }
};
exports.wrapMigration = wrapMigration;
//# sourceMappingURL=migration-helpers.js.map