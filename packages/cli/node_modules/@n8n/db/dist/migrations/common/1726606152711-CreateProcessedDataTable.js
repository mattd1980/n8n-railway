"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProcessedDataTable1726606152711 = void 0;
const processedDataTableName = 'processed_data';
class CreateProcessedDataTable1726606152711 {
    async up({ schemaBuilder: { createTable, column } }) {
        await createTable(processedDataTableName)
            .withColumns(column('workflowId').varchar(36).notNull.primary, column('value').varchar(255).notNull, column('context').varchar(255).notNull.primary)
            .withForeignKey('workflowId', {
            tableName: 'workflow_entity',
            columnName: 'id',
            onDelete: 'CASCADE',
        }).withTimestamps;
    }
    async down({ schemaBuilder: { dropTable } }) {
        await dropTable(processedDataTableName);
    }
}
exports.CreateProcessedDataTable1726606152711 = CreateProcessedDataTable1726606152711;
//# sourceMappingURL=1726606152711-CreateProcessedDataTable.js.map