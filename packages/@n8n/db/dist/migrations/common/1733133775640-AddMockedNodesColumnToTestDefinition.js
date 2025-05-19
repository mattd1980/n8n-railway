"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMockedNodesColumnToTestDefinition1733133775640 = void 0;
class AddMockedNodesColumnToTestDefinition1733133775640 {
    async up({ escape, runQuery }) {
        const tableName = escape.tableName('test_definition');
        const mockedNodesColumnName = escape.columnName('mockedNodes');
        await runQuery(`ALTER TABLE ${tableName} ADD COLUMN ${mockedNodesColumnName} JSON DEFAULT ('[]') NOT NULL`);
    }
    async down({ escape, runQuery }) {
        const tableName = escape.tableName('test_definition');
        const columnName = escape.columnName('mockedNodes');
        await runQuery(`ALTER TABLE ${tableName} DROP COLUMN ${columnName}`);
    }
}
exports.AddMockedNodesColumnToTestDefinition1733133775640 = AddMockedNodesColumnToTestDefinition1733133775640;
//# sourceMappingURL=1733133775640-AddMockedNodesColumnToTestDefinition.js.map