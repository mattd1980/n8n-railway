"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeExecutionStatusNonNullable1714133768521 = void 0;
class MakeExecutionStatusNonNullable1714133768521 {
    async up({ escape, runQuery, schemaBuilder }) {
        const executionEntity = escape.tableName('execution_entity');
        const status = escape.columnName('status');
        const finished = escape.columnName('finished');
        const query = `
			UPDATE ${executionEntity}
			SET ${status} = CASE
				WHEN ${finished} = true THEN 'success'
				WHEN ${finished} = false THEN 'error'
			END
			WHERE ${status} IS NULL;
		`;
        await runQuery(query);
        await schemaBuilder.addNotNull('execution_entity', 'status');
    }
}
exports.MakeExecutionStatusNonNullable1714133768521 = MakeExecutionStatusNonNullable1714133768521;
//# sourceMappingURL=1714133768521-MakeExecutionStatusNonNullable.js.map