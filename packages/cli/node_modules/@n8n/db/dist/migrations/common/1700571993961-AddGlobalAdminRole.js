"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddGlobalAdminRole1700571993961 = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class AddGlobalAdminRole1700571993961 {
    async up({ escape, runQuery }) {
        const tableName = escape.tableName('role');
        await runQuery(`INSERT INTO ${tableName} (name, scope) VALUES (:name, :scope)`, {
            name: 'admin',
            scope: 'global',
        });
    }
    async down({ escape, runQuery }) {
        const roleTableName = escape.tableName('role');
        const userTableName = escape.tableName('user');
        const adminRoleIdResult = await runQuery(`SELECT id FROM ${roleTableName} WHERE name = :name AND scope = :scope`, {
            name: 'admin',
            scope: 'global',
        });
        const memberRoleIdResult = await runQuery(`SELECT id FROM ${roleTableName} WHERE name = :name AND scope = :scope`, {
            name: 'member',
            scope: 'global',
        });
        const adminRoleId = adminRoleIdResult[0]?.id;
        if (adminRoleId === undefined) {
            return;
        }
        const memberRoleId = memberRoleIdResult[0]?.id;
        if (!memberRoleId) {
            throw new n8n_workflow_1.UnexpectedError('Could not find global member role!');
        }
        await runQuery(`UPDATE ${userTableName} SET globalRoleId = :memberRoleId WHERE globalRoleId = :adminRoleId`, {
            memberRoleId,
            adminRoleId,
        });
        await runQuery(`DELETE FROM ${roleTableName} WHERE name = :name AND scope = :scope`, {
            name: 'admin',
            scope: 'global',
        });
    }
}
exports.AddGlobalAdminRole1700571993961 = AddGlobalAdminRole1700571993961;
//# sourceMappingURL=1700571993961-AddGlobalAdminRole.js.map