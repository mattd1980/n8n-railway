"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvalidAuthTokenTable1723627610222 = void 0;
const tableName = 'invalid_auth_token';
class CreateInvalidAuthTokenTable1723627610222 {
    async up({ schemaBuilder: { createTable, column } }) {
        await createTable(tableName).withColumns(column('token').varchar(512).primary, column('expiresAt').timestamp().notNull);
    }
    async down({ schemaBuilder: { dropTable } }) {
        await dropTable(tableName);
    }
}
exports.CreateInvalidAuthTokenTable1723627610222 = CreateInvalidAuthTokenTable1723627610222;
//# sourceMappingURL=1723627610222-CreateInvalidAuthTokenTable.js.map