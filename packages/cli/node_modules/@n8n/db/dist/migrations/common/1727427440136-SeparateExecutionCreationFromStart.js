"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparateExecutionCreationFromStart1727427440136 = void 0;
class SeparateExecutionCreationFromStart1727427440136 {
    async up({ schemaBuilder: { addColumns, column, dropNotNull }, runQuery, escape, }) {
        await addColumns('execution_entity', [
            column('createdAt').notNull.timestamp().default('NOW()'),
        ]);
        await dropNotNull('execution_entity', 'startedAt');
        const executionEntity = escape.tableName('execution_entity');
        const createdAt = escape.columnName('createdAt');
        const startedAt = escape.columnName('startedAt');
        await runQuery(`UPDATE ${executionEntity} SET ${createdAt} = ${startedAt};`);
    }
    async down({ schemaBuilder: { dropColumns, addNotNull } }) {
        await dropColumns('execution_entity', ['createdAt']);
        await addNotNull('execution_entity', 'startedAt');
    }
}
exports.SeparateExecutionCreationFromStart1727427440136 = SeparateExecutionCreationFromStart1727427440136;
//# sourceMappingURL=1727427440136-SeparateExecutionCreationFromStart.js.map