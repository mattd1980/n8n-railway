"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrUpdateTagRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class CreateOrUpdateTagRequestDto extends zod_class_1.Z.class({
    name: zod_1.z.string().trim().min(1),
}) {
}
exports.CreateOrUpdateTagRequestDto = CreateOrUpdateTagRequestDto;
//# sourceMappingURL=create-or-update-tag-request.dto.js.map