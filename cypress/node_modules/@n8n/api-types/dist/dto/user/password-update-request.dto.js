"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordUpdateRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class PasswordUpdateRequestDto extends zod_class_1.Z.class({
    currentPassword: zod_1.z.string(),
    newPassword: zod_1.z.string(),
    mfaCode: zod_1.z.string().optional(),
}) {
}
exports.PasswordUpdateRequestDto = PasswordUpdateRequestDto;
//# sourceMappingURL=password-update-request.dto.js.map