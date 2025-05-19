"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrateToTimestampTz1694091729095 = void 0;
const defaultTimestampColumns = ['createdAt', 'updatedAt'];
const tablesWithDefaultTimestamps = [
    'auth_identity',
    'credentials_entity',
    'event_destinations',
    'installed_packages',
    'role',
    'shared_credentials',
    'shared_workflow',
    'tag_entity',
    'user',
    'workflow_entity',
];
const additionalColumns = {
    auth_provider_sync_history: ['endedAt', 'startedAt'],
    execution_entity: ['startedAt', 'stoppedAt', 'waitTill'],
    workflow_statistics: ['latestEvent'],
};
class MigrateToTimestampTz1694091729095 {
    async up({ queryRunner, tablePrefix }) {
        const changeColumnType = async (tableName, columnName, setDefault) => {
            const alterColumnQuery = `ALTER TABLE "${tablePrefix}${tableName}" ALTER COLUMN "${columnName}"`;
            await queryRunner.query(`${alterColumnQuery} TYPE TIMESTAMP(3) WITH TIME ZONE`);
            if (setDefault)
                await queryRunner.query(`${alterColumnQuery} SET DEFAULT CURRENT_TIMESTAMP(3)`);
        };
        for (const tableName of tablesWithDefaultTimestamps) {
            for (const columnName of defaultTimestampColumns) {
                await changeColumnType(tableName, columnName, true);
            }
        }
        for (const [tableName, columnNames] of Object.entries(additionalColumns)) {
            for (const columnName of columnNames) {
                await changeColumnType(tableName, columnName, false);
            }
        }
    }
}
exports.MigrateToTimestampTz1694091729095 = MigrateToTimestampTz1694091729095;
//# sourceMappingURL=1694091729095-MigrateToTimestampTz.js.map