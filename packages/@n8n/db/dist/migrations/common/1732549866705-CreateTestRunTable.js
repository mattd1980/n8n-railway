"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestRun1732549866705 = void 0;
const testRunTableName = 'test_run';
class CreateTestRun1732549866705 {
    async up({ schemaBuilder: { createTable, column } }) {
        await createTable(testRunTableName)
            .withColumns(column('id').varchar(36).primary.notNull, column('testDefinitionId').varchar(36).notNull, column('status').varchar().notNull, column('runAt').timestamp(), column('completedAt').timestamp(), column('metrics').json)
            .withIndexOn('testDefinitionId')
            .withForeignKey('testDefinitionId', {
            tableName: 'test_definition',
            columnName: 'id',
            onDelete: 'CASCADE',
        }).withTimestamps;
    }
    async down({ schemaBuilder: { dropTable } }) {
        await dropTable(testRunTableName);
    }
}
exports.CreateTestRun1732549866705 = CreateTestRun1732549866705;
//# sourceMappingURL=1732549866705-CreateTestRunTable.js.map