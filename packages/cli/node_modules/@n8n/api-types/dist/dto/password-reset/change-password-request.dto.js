"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const password_schema_1 = require("../../schemas/password.schema");
const passwordResetToken_schema_1 = require("../../schemas/passwordResetToken.schema");
class ChangePasswordRequestDto extends zod_class_1.Z.class({
    token: passwordResetToken_schema_1.passwordResetTokenSchema,
    password: password_schema_1.passwordSchema,
    mfaCode: zod_1.z.string().optional(),
}) {
}
exports.ChangePasswordRequestDto = ChangePasswordRequestDto;
//# sourceMappingURL=change-password-request.dto.js.map