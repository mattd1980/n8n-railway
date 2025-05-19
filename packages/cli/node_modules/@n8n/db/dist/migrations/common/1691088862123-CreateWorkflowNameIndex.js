"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWorkflowNameIndex1691088862123 = void 0;
class CreateWorkflowNameIndex1691088862123 {
    async up({ schemaBuilder: { createIndex } }) {
        await createIndex('workflow_entity', ['name']);
    }
    async down({ schemaBuilder: { dropIndex } }) {
        await dropIndex('workflow_entity', ['name']);
    }
}
exports.CreateWorkflowNameIndex1691088862123 = CreateWorkflowNameIndex1691088862123;
//# sourceMappingURL=1691088862123-CreateWorkflowNameIndex.js.map