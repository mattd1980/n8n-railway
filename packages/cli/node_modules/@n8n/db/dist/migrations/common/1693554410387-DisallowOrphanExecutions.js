"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisallowOrphanExecutions1693554410387 = void 0;
class DisallowOrphanExecutions1693554410387 {
    async up({ escape, schemaBuilder: { addNotNull }, runQuery }) {
        const executionEntity = escape.tableName('execution_entity');
        const workflowId = escape.columnName('workflowId');
        await runQuery(`DELETE FROM ${executionEntity} WHERE ${workflowId} IS NULL;`);
        await addNotNull('execution_entity', 'workflowId');
    }
    async down({ schemaBuilder: { dropNotNull } }) {
        await dropNotNull('execution_entity', 'workflowId');
    }
}
exports.DisallowOrphanExecutions1693554410387 = DisallowOrphanExecutions1693554410387;
//# sourceMappingURL=1693554410387-DisallowOrphanExecutions.js.map