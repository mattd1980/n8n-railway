"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectDto = void 0;
const zod_class_1 = require("zod-class");
const project_schema_1 = require("../../schemas/project.schema");
class CreateProjectDto extends zod_class_1.Z.class({
    name: project_schema_1.projectNameSchema,
    icon: project_schema_1.projectIconSchema.optional(),
}) {
}
exports.CreateProjectDto = CreateProjectDto;
//# sourceMappingURL=create-project.dto.js.map