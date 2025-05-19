"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddConstraintToExecutionMetadata1720101653148 = void 0;
const nanoid_1 = require("nanoid");
class AddConstraintToExecutionMetadata1720101653148 {
    async up(context) {
        const { createTable, dropTable, column } = context.schemaBuilder;
        const { escape } = context;
        const executionMetadataTableRaw = 'execution_metadata';
        const executionMetadataTable = escape.tableName(executionMetadataTableRaw);
        const executionMetadataTableTempRaw = 'execution_metadata_temp';
        const executionMetadataTableTemp = escape.tableName(executionMetadataTableTempRaw);
        const id = escape.columnName('id');
        const executionId = escape.columnName('executionId');
        const key = escape.columnName('key');
        const value = escape.columnName('value');
        await createTable(executionMetadataTableTempRaw)
            .withColumns(column('id').int.notNull.primary.autoGenerate, column('executionId').int.notNull, column('key').varchar(255).notNull, column('value').text.notNull)
            .withForeignKey('executionId', {
            tableName: 'execution_entity',
            columnName: 'id',
            onDelete: 'CASCADE',
            name: context.isMysql ? (0, nanoid_1.nanoid)() : undefined,
        })
            .withIndexOn(['executionId', 'key'], true);
        if (context.isMysql) {
            await context.runQuery(`
				INSERT INTO ${executionMetadataTableTemp} (${id}, ${executionId}, ${key}, ${value})
				SELECT MAX(${id}) as ${id}, ${executionId}, ${key}, MAX(${value})
				FROM ${executionMetadataTable}
				GROUP BY ${executionId}, ${key}
				ON DUPLICATE KEY UPDATE
						id = IF(VALUES(${id}) > ${executionMetadataTableTemp}.${id}, VALUES(${id}), ${executionMetadataTableTemp}.${id}),
						value = IF(VALUES(${id}) > ${executionMetadataTableTemp}.${id}, VALUES(${value}), ${executionMetadataTableTemp}.${value});
				`);
        }
        else {
            await context.runQuery(`
			INSERT INTO ${executionMetadataTableTemp} (${id}, ${executionId}, ${key}, ${value})
			SELECT MAX(${id}) as ${id}, ${executionId}, ${key}, MAX(${value})
			FROM ${executionMetadataTable}
			GROUP BY ${executionId}, ${key}
			ON CONFLICT (${executionId}, ${key}) DO UPDATE SET
					id = EXCLUDED.id,
					value = EXCLUDED.value
			WHERE EXCLUDED.id > ${executionMetadataTableTemp}.id;
		`);
        }
        await dropTable(executionMetadataTableRaw);
        await context.runQuery(`ALTER TABLE ${executionMetadataTableTemp} RENAME TO ${executionMetadataTable};`);
    }
    async down(context) {
        const { createTable, dropTable, column } = context.schemaBuilder;
        const { escape } = context;
        const executionMetadataTableRaw = 'execution_metadata';
        const executionMetadataTable = escape.tableName(executionMetadataTableRaw);
        const executionMetadataTableTempRaw = 'execution_metadata_temp';
        const executionMetadataTableTemp = escape.tableName(executionMetadataTableTempRaw);
        const id = escape.columnName('id');
        const executionId = escape.columnName('executionId');
        const key = escape.columnName('key');
        const value = escape.columnName('value');
        await createTable(executionMetadataTableTempRaw)
            .withColumns(column('id').int.notNull.primaryWithName((0, nanoid_1.nanoid)()).autoGenerate, column('executionId').int.notNull, column('key').text.notNull, column('value').text.notNull)
            .withForeignKey('executionId', {
            tableName: 'execution_entity',
            columnName: 'id',
            onDelete: 'CASCADE',
            name: context.isMysql ? (0, nanoid_1.nanoid)() : undefined,
        });
        await context.runQuery(`
			INSERT INTO ${executionMetadataTableTemp} (${id}, ${executionId}, ${key}, ${value})
			SELECT ${id}, ${executionId}, ${key}, ${value} FROM ${executionMetadataTable};
		`);
        await dropTable(executionMetadataTableRaw);
        await context.runQuery(`ALTER TABLE ${executionMetadataTableTemp} RENAME TO ${executionMetadataTable};`);
        if (context.dbType === 'postgresdb') {
            const tableName = escape.tableName('execution_metadata');
            const sequenceName = escape.tableName('execution_metadata_temp_id_seq1');
            await context.runQuery(`SELECT setval('${sequenceName}', (SELECT MAX(id) FROM ${tableName}));`);
        }
    }
}
exports.AddConstraintToExecutionMetadata1720101653148 = AddConstraintToExecutionMetadata1720101653148;
//# sourceMappingURL=1720101653148-AddConstraintToExecutionMetadata.js.map