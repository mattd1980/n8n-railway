"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWorkflowVersionIdColumn1669739707124 = void 0;
const uuid_1 = require("uuid");
class AddWorkflowVersionIdColumn1669739707124 {
    async up({ escape, runQuery }) {
        const tableName = escape.tableName('workflow_entity');
        const columnName = escape.columnName('versionId');
        await runQuery(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} CHAR(36)`);
        const workflowIds = await runQuery(`SELECT id FROM ${tableName}`);
        for (const { id } of workflowIds) {
            await runQuery(`UPDATE ${tableName} SET ${columnName} = :versionId WHERE id = :id`, {
                versionId: (0, uuid_1.v4)(),
                id,
            });
        }
    }
    async down({ escape, runQuery }) {
        const tableName = escape.tableName('workflow_entity');
        const columnName = escape.columnName('versionId');
        await runQuery(`ALTER TABLE ${tableName} DROP COLUMN ${columnName}`);
    }
}
exports.AddWorkflowVersionIdColumn1669739707124 = AddWorkflowVersionIdColumn1669739707124;
//# sourceMappingURL=1669739707124-AddWorkflowVersionIdColumn.js.map