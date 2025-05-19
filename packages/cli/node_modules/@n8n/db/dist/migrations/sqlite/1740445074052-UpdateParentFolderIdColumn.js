"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParentFolderIdColumn1740445074052 = void 0;
class UpdateParentFolderIdColumn1740445074052 {
    constructor() {
        this.transaction = false;
    }
    async up({ queryRunner, copyTable, schemaBuilder: { createTable, column }, tablePrefix, }) {
        await createTable('temp_workflow_entity')
            .withColumns(column('id').varchar(36).primary.notNull, column('name').varchar(128).notNull, column('active').bool.notNull, column('nodes').json, column('connections').json, column('settings').json, column('staticData').json, column('pinData').json, column('versionId').varchar(36), column('triggerCount').int.default(0), column('meta').json, column('parentFolderId').varchar(36).default(null))
            .withForeignKey('parentFolderId', {
            tableName: 'folder',
            columnName: 'id',
            onDelete: 'CASCADE',
        })
            .withIndexOn(['name'], false).withTimestamps;
        const columns = [
            'id',
            'name',
            'active',
            'nodes',
            'connections',
            'settings',
            'staticData',
            'pinData',
            'versionId',
            'triggerCount',
            'meta',
            'parentFolderId',
            'createdAt',
            'updatedAt',
        ];
        await copyTable(`${tablePrefix}workflow_entity`, 'temp_workflow_entity', columns);
        await queryRunner.query(`DROP TABLE "${tablePrefix}workflow_entity";`);
        await queryRunner.query(`ALTER TABLE "temp_workflow_entity" RENAME TO "${tablePrefix}workflow_entity";`);
    }
}
exports.UpdateParentFolderIdColumn1740445074052 = UpdateParentFolderIdColumn1740445074052;
//# sourceMappingURL=1740445074052-UpdateParentFolderIdColumn.js.map