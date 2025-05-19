"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestMetricTable1732271325258 = void 0;
const testMetricEntityTableName = 'test_metric';
class CreateTestMetricTable1732271325258 {
    async up({ schemaBuilder: { createTable, column } }) {
        await createTable(testMetricEntityTableName)
            .withColumns(column('id').varchar(36).primary.notNull, column('name').varchar(255).notNull, column('testDefinitionId').varchar(36).notNull)
            .withIndexOn('testDefinitionId')
            .withForeignKey('testDefinitionId', {
            tableName: 'test_definition',
            columnName: 'id',
            onDelete: 'CASCADE',
        }).withTimestamps;
    }
    async down({ schemaBuilder: { dropTable } }) {
        await dropTable(testMetricEntityTableName);
    }
}
exports.CreateTestMetricTable1732271325258 = CreateTestMetricTable1732271325258;
//# sourceMappingURL=1732271325258-CreateTestMetricTable.js.map