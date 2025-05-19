"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddApiKeysTable1724951148974 = void 0;
const generators_1 = require("../../utils/generators");
class AddApiKeysTable1724951148974 {
    constructor() {
        this.transaction = false;
    }
    async up({ queryRunner, tablePrefix, runQuery }) {
        const tableName = `${tablePrefix}user_api_keys`;
        await queryRunner.query(`
			CREATE TABLE ${tableName} (
				id VARCHAR(36) PRIMARY KEY NOT NULL,
				"userId" VARCHAR NOT NULL,
				"label" VARCHAR(100) NOT NULL,
				"apiKey" VARCHAR NOT NULL,
				"createdAt" DATETIME(3) NOT NULL DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')),
				"updatedAt" DATETIME(3) NOT NULL DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')),
				FOREIGN KEY ("userId") REFERENCES user(id) ON DELETE CASCADE,
				UNIQUE ("userId", label),
				UNIQUE("apiKey")
			);
		`);
        const usersWithApiKeys = (await queryRunner.query(`SELECT id, "apiKey" FROM ${tablePrefix}user WHERE "apiKey" IS NOT NULL`));
        await Promise.all(usersWithApiKeys.map(async (user) => await runQuery(`INSERT INTO ${tableName} ("id", "userId", "apiKey", "label") VALUES (:id, :userId, :apiKey, :label)`, {
            id: (0, generators_1.generateNanoId)(),
            userId: user.id,
            apiKey: user.apiKey,
            label: 'My API Key',
        })));
        await queryRunner.query(`
				CREATE TABLE users_new (
					id varchar PRIMARY KEY,
					email VARCHAR(255) UNIQUE,
					"firstName" VARCHAR(32),
					"lastName" VARCHAR(32),
					password VARCHAR,
					"personalizationAnswers" TEXT,
					"createdAt" DATETIME(3) NOT NULL DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')),
					"updatedAt" DATETIME(3) NOT NULL DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')),
					settings TEXT,
					disabled BOOLEAN DEFAULT FALSE NOT NULL,
					"mfaEnabled" BOOLEAN DEFAULT FALSE NOT NULL,
					"mfaSecret" TEXT,
					"mfaRecoveryCodes" TEXT,
					role TEXT NOT NULL
			);
		`);
        await queryRunner.query(`
			INSERT INTO users_new ("id", "email", "firstName", "lastName", "password", "personalizationAnswers", "createdAt", "updatedAt", "settings", "disabled", "mfaEnabled", "mfaSecret", "mfaRecoveryCodes", "role")
			SELECT "id", "email", "firstName", "lastName", "password", "personalizationAnswers", "createdAt", "updatedAt", "settings", "disabled", "mfaEnabled", "mfaSecret", "mfaRecoveryCodes", "role"
			FROM ${tablePrefix}user;
		`);
        await queryRunner.query(`DROP TABLE ${tablePrefix}user;`);
        await queryRunner.query('ALTER TABLE users_new RENAME TO user;');
    }
    async down({ queryRunner, runQuery, tablePrefix, schemaBuilder: { dropTable, createIndex }, escape, }) {
        const userApiKeysTable = escape.tableName('user_api_keys');
        const apiKeyColumn = escape.columnName('apiKey');
        const userIdColumn = escape.columnName('userId');
        const idColumn = escape.columnName('id');
        const createdAtColumn = escape.columnName('createdAt');
        const queryToGetUsersApiKeys = `
		SELECT
			${userIdColumn},
			${apiKeyColumn},
			${createdAtColumn}
	FROM
		${userApiKeysTable}
	WHERE
		${createdAtColumn} IN(
			SELECT
				MIN(${createdAtColumn})
				FROM ${userApiKeysTable}
			GROUP BY ${userIdColumn});`;
        const oldestApiKeysPerUser = (await queryRunner.query(queryToGetUsersApiKeys));
        await queryRunner.query(`ALTER TABLE ${tablePrefix}user ADD COLUMN "apiKey" varchar;`);
        await createIndex('user', ['apiKey'], true);
        await Promise.all(oldestApiKeysPerUser.map(async (user) => await runQuery(`UPDATE ${tablePrefix}user SET ${apiKeyColumn} = :apiKey WHERE ${idColumn} = :userId`, user)));
        await dropTable('user_api_keys');
    }
}
exports.AddApiKeysTable1724951148974 = AddApiKeysTable1724951148974;
//# sourceMappingURL=1724951148974-AddApiKeysTable.js.map