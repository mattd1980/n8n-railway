"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class LoginRequestDto extends zod_class_1.Z.class({
    emailOrLdapLoginId: zod_1.z.string().trim(),
    password: zod_1.z.string().min(1),
    mfaCode: zod_1.z.string().optional(),
    mfaRecoveryCode: zod_1.z.string().optional(),
}) {
}
exports.LoginRequestDto = LoginRequestDto;
//# sourceMappingURL=login-request.dto.js.map