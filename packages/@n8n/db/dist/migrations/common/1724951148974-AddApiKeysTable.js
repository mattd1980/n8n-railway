"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddApiKeysTable1724951148974 = void 0;
const generators_1 = require("../../utils/generators");
class AddApiKeysTable1724951148974 {
    async up({ queryRunner, escape, runQuery, schemaBuilder: { createTable, column }, }) {
        const userTable = escape.tableName('user');
        const userApiKeysTable = escape.tableName('user_api_keys');
        const userIdColumn = escape.columnName('userId');
        const apiKeyColumn = escape.columnName('apiKey');
        const labelColumn = escape.columnName('label');
        const idColumn = escape.columnName('id');
        await createTable('user_api_keys')
            .withColumns(column('id').varchar(36).primary, column('userId').uuid.notNull, column('label').varchar(100).notNull, column('apiKey').varchar().notNull)
            .withForeignKey('userId', {
            tableName: 'user',
            columnName: 'id',
            onDelete: 'CASCADE',
        })
            .withIndexOn(['userId', 'label'], true)
            .withIndexOn(['apiKey'], true).withTimestamps;
        const usersWithApiKeys = (await queryRunner.query(`SELECT ${idColumn}, ${apiKeyColumn} FROM ${userTable} WHERE ${apiKeyColumn} IS NOT NULL`));
        await Promise.all(usersWithApiKeys.map(async (user) => await runQuery(`INSERT INTO ${userApiKeysTable} (${idColumn}, ${userIdColumn}, ${apiKeyColumn}, ${labelColumn}) VALUES (:id, :userId, :apiKey, :label)`, {
            id: (0, generators_1.generateNanoId)(),
            userId: user.id,
            apiKey: user.apiKey,
            label: 'My API Key',
        })));
        await queryRunner.query(`ALTER TABLE ${userTable} DROP COLUMN ${apiKeyColumn};`);
    }
    async down({ queryRunner, runQuery, schemaBuilder: { dropTable, addColumns, createIndex, column }, escape, isMysql, }) {
        const userTable = escape.tableName('user');
        const userApiKeysTable = escape.tableName('user_api_keys');
        const apiKeyColumn = escape.columnName('apiKey');
        const userIdColumn = escape.columnName('userId');
        const idColumn = escape.columnName('id');
        const createdAtColumn = escape.columnName('createdAt');
        await addColumns('user', [column('apiKey').varchar()]);
        await createIndex('user', ['apiKey'], true);
        const queryToGetUsersApiKeys = isMysql
            ? `
			SELECT ${userIdColumn},
				${apiKeyColumn},
				${createdAtColumn}
			FROM ${userApiKeysTable} u
			WHERE ${createdAtColumn} = (SELECT Min(${createdAtColumn})
																	FROM   ${userApiKeysTable}
																	WHERE  ${userIdColumn} = u.${userIdColumn});`
            : `
				SELECT DISTINCT ON
					(${userIdColumn}) ${userIdColumn},
					${apiKeyColumn}, ${createdAtColumn}
				FROM ${userApiKeysTable}
				ORDER BY ${userIdColumn}, ${createdAtColumn} ASC;`;
        const oldestApiKeysPerUser = (await queryRunner.query(queryToGetUsersApiKeys));
        await Promise.all(oldestApiKeysPerUser.map(async (user) => await runQuery(`UPDATE ${userTable} SET ${apiKeyColumn} = :apiKey WHERE ${idColumn} = :userId`, user)));
        await dropTable('user_api_keys');
    }
}
exports.AddApiKeysTable1724951148974 = AddApiKeysTable1724951148974;
//# sourceMappingURL=1724951148974-AddApiKeysTable.js.map