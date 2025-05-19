"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWorkflowMetadata1695128658538 = void 0;
class AddWorkflowMetadata1695128658538 {
    async up({ schemaBuilder: { addColumns, column } }) {
        await addColumns('workflow_entity', [column('meta').json]);
    }
    async down({ schemaBuilder: { dropColumns } }) {
        await dropColumns('workflow_entity', ['meta']);
    }
}
exports.AddWorkflowMetadata1695128658538 = AddWorkflowMetadata1695128658538;
//# sourceMappingURL=1695128658538-AddWorkflowMetadata.js.map