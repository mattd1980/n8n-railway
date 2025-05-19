"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRelationSchema = exports.projectIconSchema = exports.projectTypeSchema = exports.projectNameSchema = void 0;
const permissions_1 = require("@n8n/permissions");
const zod_1 = require("zod");
exports.projectNameSchema = zod_1.z.string().min(1).max(255);
exports.projectTypeSchema = zod_1.z.enum(['personal', 'team']);
exports.projectIconSchema = zod_1.z.object({
    type: zod_1.z.enum(['emoji', 'icon']),
    value: zod_1.z.string().min(1),
});
exports.projectRelationSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    role: permissions_1.projectRoleSchema,
});
//# sourceMappingURL=project.schema.js.map