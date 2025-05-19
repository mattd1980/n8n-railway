"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class ForgotPasswordRequestDto extends zod_class_1.Z.class({
    email: zod_1.z.string().email(),
}) {
}
exports.ForgotPasswordRequestDto = ForgotPasswordRequestDto;
//# sourceMappingURL=forgot-password-request.dto.js.map