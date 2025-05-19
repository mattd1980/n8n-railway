"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProjectIcons1729607673469 = void 0;
class AddProjectIcons1729607673469 {
    async up({ schemaBuilder: { addColumns, column } }) {
        await addColumns('project', [column('icon').json]);
    }
    async down({ schemaBuilder: { dropColumns } }) {
        await dropColumns('project', ['icon']);
    }
}
exports.AddProjectIcons1729607673469 = AddProjectIcons1729607673469;
//# sourceMappingURL=1729607673469-AddProjectIcons.js.map