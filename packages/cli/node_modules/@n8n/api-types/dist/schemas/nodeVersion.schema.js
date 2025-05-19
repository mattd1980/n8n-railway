"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeVersionSchema = void 0;
const zod_1 = require("zod");
exports.nodeVersionSchema = zod_1.z
    .number()
    .min(1)
    .refine((val) => {
    const parts = String(val).split('.');
    return ((parts.length === 1 && !isNaN(Number(parts[0]))) ||
        (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))));
}, {
    message: 'Invalid node version. Must be in format: major.minor',
});
//# sourceMappingURL=nodeVersion.schema.js.map