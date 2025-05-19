"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAnnotationTables1724753530828 = void 0;
const annotationsTableName = 'execution_annotations';
const annotationTagsTableName = 'annotation_tag_entity';
const annotationTagMappingsTableName = 'execution_annotation_tags';
class CreateAnnotationTables1724753530828 {
    async up({ schemaBuilder: { createTable, column } }) {
        await createTable(annotationsTableName)
            .withColumns(column('id').int.notNull.primary.autoGenerate, column('executionId').int.notNull, column('vote').varchar(6), column('note').text)
            .withIndexOn('executionId', true)
            .withForeignKey('executionId', {
            tableName: 'execution_entity',
            columnName: 'id',
            onDelete: 'CASCADE',
        }).withTimestamps;
        await createTable(annotationTagsTableName)
            .withColumns(column('id').varchar(16).primary.notNull, column('name').varchar(24).notNull)
            .withIndexOn('name', true).withTimestamps;
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
    }
    async down({ schemaBuilder: { dropTable } }) {
        await dropTable(annotationTagMappingsTableName);
        await dropTable(annotationTagsTableName);
        await dropTable(annotationsTableName);
    }
}
exports.CreateAnnotationTables1724753530828 = CreateAnnotationTables1724753530828;
//# sourceMappingURL=1724753530828-CreateExecutionAnnotationTables.js.map