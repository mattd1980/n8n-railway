"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbRevertMigrationCommand = void 0;
exports.main = main;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const core_1 = require("@oclif/core");
const n8n_core_1 = require("n8n-core");
const db_connection_options_1 = require("../../databases/db-connection-options");
async function main(logger, connection, migrationExecutor) {
    const executedMigrations = await migrationExecutor.getExecutedMigrations();
    const lastExecutedMigration = executedMigrations.at(0);
    if (lastExecutedMigration === undefined) {
        logger.error("Cancelled command. The database was never migrated. Are you sure you're connected to the right database?.");
        return;
    }
    const lastMigrationInstance = connection.migrations.find((m) => {
        const name1 = m.name ?? m.constructor.name;
        const name2 = lastExecutedMigration.name;
        return name1 === name2;
    });
    if (lastMigrationInstance === undefined) {
        logger.error(`The last migration that was executed is "${lastExecutedMigration.name}", but I could not find that migration's code in the currently installed version of n8n.`);
        logger.error('This usually means that you downgraded n8n before running `n8n db:revert`. Please upgrade n8n again and run `n8n db:revert` and then downgrade again.');
        return;
    }
    if (!lastMigrationInstance.down) {
        const message = lastMigrationInstance.name
            ? `Cancelled command. The last migration "${lastMigrationInstance.name}" was irreversible.`
            : 'Cancelled command. The last migration was irreversible.';
        logger.error(message);
        return;
    }
    await connection.undoLastMigration({
        transaction: lastMigrationInstance.transaction === false ? 'none' : 'each',
    });
    await connection.destroy();
}
class DbRevertMigrationCommand extends core_1.Command {
    constructor() {
        super(...arguments);
        this.logger = di_1.Container.get(n8n_core_1.Logger);
    }
    async init() {
        await this.parse(DbRevertMigrationCommand);
    }
    async run() {
        const connectionOptions = {
            ...di_1.Container.get(db_connection_options_1.DbConnectionOptions).getOptions(),
            subscribers: [],
            synchronize: false,
            migrationsRun: false,
            dropSchema: false,
            logging: ['query', 'error', 'schema'],
        };
        const connection = new typeorm_1.DataSource(connectionOptions);
        await connection.initialize();
        const migrationExecutor = new typeorm_1.MigrationExecutor(connection);
        connectionOptions.migrations.forEach(db_1.wrapMigration);
        return await main(this.logger, connection, migrationExecutor);
    }
    async catch(error) {
        this.logger.error('Error reverting last migration. See log messages for details.');
        this.logger.error(error.message);
    }
    async finally(error) {
        if (this.connection?.isInitialized)
            await this.connection.destroy();
        this.exit(error ? 1 : 0);
    }
}
exports.DbRevertMigrationCommand = DbRevertMigrationCommand;
DbRevertMigrationCommand.description = 'Revert last database migration';
DbRevertMigrationCommand.examples = ['$ n8n db:revert'];
DbRevertMigrationCommand.flags = {
    help: core_1.Flags.help({ char: 'h' }),
};
//# sourceMappingURL=revert.js.map