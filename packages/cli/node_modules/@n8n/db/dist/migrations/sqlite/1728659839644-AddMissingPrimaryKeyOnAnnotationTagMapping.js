"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMissingPrimaryKeyOnAnnotationTagMapping1728659839644 = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const annotationsTableName = 'execution_annotations';
const annotationTagsTableName = 'annotation_tag_entity';
const annotationTagMappingsTableName = 'execution_annotation_tags';
class AddMissingPrimaryKeyOnAnnotationTagMapping1728659839644 {
    async up({ queryRunner, tablePrefix, schemaBuilder: { createTable, column, dropIndex }, }) {
        const table = await queryRunner.getTable(`${tablePrefix}execution_annotation_tags`);
        (0, node_assert_1.default)(table, 'execution_annotation_tags table not found');
        const hasPrimaryKey = table.primaryColumns.length > 0;
        if (hasPrimaryKey) {
            return;
        }
        await queryRunner.query(`ALTER TABLE ${tablePrefix}${annotationTagMappingsTableName} RENAME TO ${tablePrefix}${annotationTagMappingsTableName}_tmp;`);
        await dropIndex(`${annotationTagMappingsTableName}_tmp`, ['tagId'], {
            customIndexName: 'IDX_a3697779b366e131b2bbdae297',
        });
        await dropIndex(`${annotationTagMappingsTableName}_tmp`, ['annotationId'], {
            customIndexName: 'IDX_c1519757391996eb06064f0e7c',
        });
        await createTable(annotationTagMappingsTableName)
            .withColumns(column('annotationId').int.notNull.primary, column('tagId').varchar(24).notNull.primary)
            .withForeignKey('annotationId', {
            tableName: annotationsTableName,
            columnName: 'id',
            onDelete: 'CASCADE',
        })
            .withIndexOn('tagId')
            .withIndexOn('annotationId')
            .withForeignKey('tagId', {
            tableName: annotationTagsTableName,
            columnName: 'id',
            onDelete: 'CASCADE',
        });
        await queryRunner.query(`INSERT INTO ${tablePrefix}${annotationTagMappingsTableName} SELECT * FROM ${tablePrefix}${annotationTagMappingsTableName}_tmp;`);
        await queryRunner.dropTable(`${tablePrefix}${annotationTagMappingsTableName}_tmp`, true);
    }
}
exports.AddMissingPrimaryKeyOnAnnotationTagMapping1728659839644 = AddMissingPrimaryKeyOnAnnotationTagMapping1728659839644;
//# sourceMappingURL=1728659839644-AddMissingPrimaryKeyOnAnnotationTagMapping.js.map