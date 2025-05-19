"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestCaseExecutionTable1736947513045 = void 0;
const testCaseExecutionTableName = 'test_case_execution';
class CreateTestCaseExecutionTable1736947513045 {
    async up({ schemaBuilder: { createTable, column } }) {
        await createTable(testCaseExecutionTableName)
            .withColumns(column('id').varchar(36).primary.notNull, column('testRunId').varchar(36).notNull, column('pastExecutionId').int, column('executionId').int, column('evaluationExecutionId').int, column('status').varchar().notNull, column('runAt').timestamp(), column('completedAt').timestamp(), column('errorCode').varchar(), column('errorDetails').json, column('metrics').json)
            .withIndexOn('testRunId')
            .withForeignKey('testRunId', {
            tableName: 'test_run',
            columnName: 'id',
            onDelete: 'CASCADE',
        })
            .withForeignKey('pastExecutionId', {
            tableName: 'execution_entity',
            columnName: 'id',
            onDelete: 'SET NULL',
        })
            .withForeignKey('executionId', {
            tableName: 'execution_entity',
            columnName: 'id',
            onDelete: 'SET NULL',
        })
            .withForeignKey('evaluationExecutionId', {
            tableName: 'execution_entity',
            columnName: 'id',
            onDelete: 'SET NULL',
        }).withTimestamps;
    }
    async down({ schemaBuilder: { dropTable } }) {
        await dropTable(testCaseExecutionTableName);
    }
}
exports.CreateTestCaseExecutionTable1736947513045 = CreateTestCaseExecutionTable1736947513045;
//# sourceMappingURL=1736947513045-CreateTestCaseExecutionTable.js.map