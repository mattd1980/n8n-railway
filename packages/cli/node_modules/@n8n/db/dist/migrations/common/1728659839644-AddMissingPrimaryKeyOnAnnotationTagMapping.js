"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMissingPrimaryKeyOnAnnotationTagMapping1728659839644 = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
class AddMissingPrimaryKeyOnAnnotationTagMapping1728659839644 {
    async up({ queryRunner, tablePrefix }) {
        const table = await queryRunner.getTable(`${tablePrefix}execution_annotation_tags`);
        (0, node_assert_1.default)(table, 'execution_annotation_tags table not found');
        const hasPrimaryKey = table.primaryColumns.length > 0;
        if (!hasPrimaryKey) {
            await queryRunner.createPrimaryKey(`${tablePrefix}execution_annotation_tags`, [
                'annotationId',
                'tagId',
            ]);
        }
    }
}
exports.AddMissingPrimaryKeyOnAnnotationTagMapping1728659839644 = AddMissingPrimaryKeyOnAnnotationTagMapping1728659839644;
//# sourceMappingURL=1728659839644-AddMissingPrimaryKeyOnAnnotationTagMapping.js.map