"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordSchema = void 0;
const zod_1 = require("zod");
const minLength = 8;
const maxLength = 64;
exports.passwordSchema = zod_1.z
    .string()
    .min(minLength, `Password must be ${minLength} to ${maxLength} characters long.`)
    .max(maxLength, `Password must be ${minLength} to ${maxLength} characters long.`)
    .refine((password) => /\d/.test(password), {
    message: 'Password must contain at least 1 number.',
})
    .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least 1 uppercase letter.',
});
//# sourceMappingURL=password.schema.js.map