"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const project_schema_1 = require("../../schemas/project.schema");
class UpdateProjectDto extends zod_class_1.Z.class({
    name: project_schema_1.projectNameSchema.optional(),
    icon: project_schema_1.projectIconSchema.optional(),
    relations: zod_1.z.array(project_schema_1.projectRelationSchema).optional(),
}) {
}
exports.UpdateProjectDto = UpdateProjectDto;
//# sourceMappingURL=update-project.dto.js.map