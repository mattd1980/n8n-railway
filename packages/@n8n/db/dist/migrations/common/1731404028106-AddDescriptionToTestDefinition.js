"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDescriptionToTestDefinition1731404028106 = void 0;
class AddDescriptionToTestDefinition1731404028106 {
    async up({ schemaBuilder: { addColumns, column } }) {
        await addColumns('test_definition', [column('description').text]);
    }
    async down({ schemaBuilder: { dropColumns } }) {
        await dropColumns('test_definition', ['description']);
    }
}
exports.AddDescriptionToTestDefinition1731404028106 = AddDescriptionToTestDefinition1731404028106;
//# sourceMappingURL=1731404028106-AddDescriptionToTestDefinition.js.map