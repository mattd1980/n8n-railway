"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionSoftDelete1693491613982 = void 0;
class ExecutionSoftDelete1693491613982 {
    async up({ schemaBuilder: { addColumns, column, createIndex } }) {
        await addColumns('execution_entity', [column('deletedAt').timestamp()]);
        await createIndex('execution_entity', ['deletedAt']);
        await createIndex('execution_entity', ['stoppedAt']);
    }
    async down({ schemaBuilder: { dropColumns, dropIndex } }) {
        await dropIndex('execution_entity', ['stoppedAt']);
        await dropIndex('execution_entity', ['deletedAt']);
        await dropColumns('execution_entity', ['deletedAt']);
    }
}
exports.ExecutionSoftDelete1693491613982 = ExecutionSoftDelete1693491613982;
//# sourceMappingURL=1693491613982-ExecutionSoftDelete.js.map