"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvePasswordTokenQueryDto = void 0;
const zod_class_1 = require("zod-class");
const passwordResetToken_schema_1 = require("../../schemas/passwordResetToken.schema");
class ResolvePasswordTokenQueryDto extends zod_class_1.Z.class({
    token: passwordResetToken_schema_1.passwordResetTokenSchema,
}) {
}
exports.ResolvePasswordTokenQueryDto = ResolvePasswordTokenQueryDto;
//# sourceMappingURL=resolve-password-token-query.dto.js.map