"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWorkflowHistoryTable1692967111175 = void 0;
const tableName = 'workflow_history';
class CreateWorkflowHistoryTable1692967111175 {
    async up({ schemaBuilder: { createTable, column } }) {
        await createTable(tableName)
            .withColumns(column('versionId').varchar(36).primary.notNull, column('workflowId').varchar(36).notNull, column('nodes').text.notNull, column('connections').text.notNull, column('authors').varchar(255).notNull)
            .withTimestamps.withIndexOn('workflowId')
            .withForeignKey('workflowId', {
            tableName: 'workflow_entity',
            columnName: 'id',
            onDelete: 'CASCADE',
        });
    }
    async down({ schemaBuilder: { dropTable } }) {
        await dropTable(tableName);
    }
}
exports.CreateWorkflowHistoryTable1692967111175 = CreateWorkflowHistoryTable1692967111175;
//# sourceMappingURL=1692967111175-CreateWorkflowHistoryTable.js.map