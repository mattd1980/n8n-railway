"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWorkflowStatisticsRootCount1745587087521 = void 0;
const columnName = 'rootCount';
const tableName = 'workflow_statistics';
class AddWorkflowStatisticsRootCount1745587087521 {
    async up({ escape, runQuery }) {
        const escapedTableName = escape.tableName(tableName);
        const escapedColumnName = escape.columnName(columnName);
        await runQuery(`ALTER TABLE ${escapedTableName} ADD COLUMN ${escapedColumnName} INTEGER DEFAULT 0`);
    }
    async down({ escape, runQuery }) {
        const escapedTableName = escape.tableName(tableName);
        const escapedColumnName = escape.columnName(columnName);
        await runQuery(`ALTER TABLE ${escapedTableName} DROP COLUMN ${escapedColumnName}`);
    }
}
exports.AddWorkflowStatisticsRootCount1745587087521 = AddWorkflowStatisticsRootCount1745587087521;
//# sourceMappingURL=1745587087521-AddWorkflowStatisticsRootCount.js.map