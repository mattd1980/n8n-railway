"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParentFolderIdColumn1740445074052 = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class UpdateParentFolderIdColumn1740445074052 {
    async up({ escape, queryRunner, schemaBuilder: { dropForeignKey }, tablePrefix, }) {
        const workflowTableName = escape.tableName('workflow_entity');
        const folderTableName = escape.tableName('folder');
        const parentFolderIdColumn = escape.columnName('parentFolderId');
        const idColumn = escape.columnName('id');
        const workflowTable = await queryRunner.getTable(`${tablePrefix}workflow_entity`);
        if (!workflowTable)
            throw new n8n_workflow_1.UnexpectedError('Table workflow_entity not found');
        const foreignKey = workflowTable.foreignKeys.find((fk) => fk.columnNames.includes('parentFolderId') &&
            fk.referencedTableName === `${tablePrefix}folder`);
        if (!foreignKey)
            throw new n8n_workflow_1.UnexpectedError('Foreign key in column parentFolderId was not found');
        await dropForeignKey('workflow_entity', 'parentFolderId', ['folder', 'id'], foreignKey.name);
        await queryRunner.query(`ALTER TABLE ${workflowTableName} ADD CONSTRAINT fk_workflow_parent_folder FOREIGN KEY (${parentFolderIdColumn}) REFERENCES ${folderTableName}(${idColumn}) ON DELETE CASCADE`);
    }
}
exports.UpdateParentFolderIdColumn1740445074052 = UpdateParentFolderIdColumn1740445074052;
//# sourceMappingURL=1740445074052-UpdateParentFolderIdColumn.js.map