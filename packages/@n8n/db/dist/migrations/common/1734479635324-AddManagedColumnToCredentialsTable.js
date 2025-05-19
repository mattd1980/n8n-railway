"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddManagedColumnToCredentialsTable1734479635324 = void 0;
class AddManagedColumnToCredentialsTable1734479635324 {
    async up({ escape, runQuery, isSqlite }) {
        const tableName = escape.tableName('credentials_entity');
        const columnName = escape.columnName('isManaged');
        const defaultValue = isSqlite ? 0 : 'FALSE';
        await runQuery(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} BOOLEAN NOT NULL DEFAULT ${defaultValue}`);
    }
    async down({ escape, runQuery }) {
        const tableName = escape.tableName('credentials_entity');
        const columnName = escape.columnName('isManaged');
        await runQuery(`ALTER TABLE ${tableName} DROP COLUMN ${columnName}`);
    }
}
exports.AddManagedColumnToCredentialsTable1734479635324 = AddManagedColumnToCredentialsTable1734479635324;
//# sourceMappingURL=1734479635324-AddManagedColumnToCredentialsTable.js.map