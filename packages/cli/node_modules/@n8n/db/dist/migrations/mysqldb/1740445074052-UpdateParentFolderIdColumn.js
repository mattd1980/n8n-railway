"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParentFolderIdColumn1740445074052 = void 0;
class UpdateParentFolderIdColumn1740445074052 {
    async up({ escape, queryRunner }) {
        const workflowTableName = escape.tableName('workflow_entity');
        const folderTableName = escape.tableName('folder');
        const parentFolderIdColumn = escape.columnName('parentFolderId');
        const idColumn = escape.columnName('id');
        await queryRunner.query(`ALTER TABLE ${workflowTableName} ADD CONSTRAINT fk_workflow_parent_folder FOREIGN KEY (${parentFolderIdColumn}) REFERENCES ${folderTableName}(${idColumn}) ON DELETE CASCADE`);
    }
}
exports.UpdateParentFolderIdColumn1740445074052 = UpdateParentFolderIdColumn1740445074052;
//# sourceMappingURL=1740445074052-UpdateParentFolderIdColumn.js.map