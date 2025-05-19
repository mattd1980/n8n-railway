"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveWorkflowDataLoadedFlag1671726148419 = void 0;
class RemoveWorkflowDataLoadedFlag1671726148419 {
    async up({ escape, dbType, runQuery }) {
        const workflowTableName = escape.tableName('workflow_entity');
        const statisticsTableName = escape.tableName('workflow_statistics');
        const columnName = escape.columnName('dataLoaded');
        const workflowIds = await runQuery(`SELECT id, ${columnName} FROM ${workflowTableName}`);
        const now = dbType === 'sqlite' ? "STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')" : 'CURRENT_TIMESTAMP(3)';
        await Promise.all(workflowIds.map(async ({ id, dataLoaded }) => await (dataLoaded &&
            runQuery(`INSERT INTO ${statisticsTableName}
						(${escape.columnName('workflowId')}, name, count, ${escape.columnName('latestEvent')})
						VALUES (:id, :name, 1, ${now})`, { id, name: "data_loaded" }))));
        await runQuery(`ALTER TABLE ${workflowTableName} DROP COLUMN ${columnName}`);
    }
    async down({ escape, runQuery }) {
        const workflowTableName = escape.tableName('workflow_entity');
        const statisticsTableName = escape.tableName('workflow_statistics');
        const columnName = escape.columnName('dataLoaded');
        await runQuery(`ALTER TABLE ${workflowTableName} ADD COLUMN ${columnName} BOOLEAN DEFAULT false`);
        const workflowsIds = await runQuery(`SELECT ${escape.columnName('workflowId')} FROM ${statisticsTableName} WHERE name = :name`, { name: "data_loaded" });
        await Promise.all(workflowsIds.map(async ({ workflowId }) => await runQuery(`UPDATE ${workflowTableName} SET ${columnName} = true WHERE id = :id`, {
            id: workflowId,
        })));
        await runQuery(`DELETE FROM ${statisticsTableName} WHERE name = :name`, {
            name: "data_loaded",
        });
    }
}
exports.RemoveWorkflowDataLoadedFlag1671726148419 = RemoveWorkflowDataLoadedFlag1671726148419;
//# sourceMappingURL=1671726148419-RemoveWorkflowDataLoadedFlag.js.map