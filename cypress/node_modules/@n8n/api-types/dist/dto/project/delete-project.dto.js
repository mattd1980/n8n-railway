"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProjectDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class DeleteProjectDto extends zod_class_1.Z.class({
    transferId: zod_1.z.string().optional(),
}) {
}
exports.DeleteProjectDto = DeleteProjectDto;
//# sourceMappingURL=delete-project.dto.js.map