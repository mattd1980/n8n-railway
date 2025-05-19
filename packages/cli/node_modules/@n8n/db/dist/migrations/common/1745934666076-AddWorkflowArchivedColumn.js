"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWorkflowArchivedColumn1745934666076 = void 0;
const columnName = 'isArchived';
const tableName = 'workflow_entity';
class AddWorkflowArchivedColumn1745934666076 {
    async up({ escape, runQuery }) {
        const escapedTableName = escape.tableName(tableName);
        const escapedColumnName = escape.columnName(columnName);
        await runQuery(`ALTER TABLE ${escapedTableName} ADD COLUMN ${escapedColumnName} BOOLEAN NOT NULL DEFAULT FALSE`);
    }
    async down({ escape, runQuery }) {
        const escapedTableName = escape.tableName(tableName);
        const escapedColumnName = escape.columnName(columnName);
        await runQuery(`ALTER TABLE ${escapedTableName} DROP COLUMN ${escapedColumnName}`);
    }
}
exports.AddWorkflowArchivedColumn1745934666076 = AddWorkflowArchivedColumn1745934666076;
//# sourceMappingURL=1745934666076-AddWorkflowArchivedColumn.js.map