"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetTokenSchema = void 0;
const zod_1 = require("zod");
exports.passwordResetTokenSchema = zod_1.z.string().min(10, 'Token too short');
//# sourceMappingURL=passwordResetToken.schema.js.map