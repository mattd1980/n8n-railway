"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflowSharingRoleSchema = exports.credentialSharingRoleSchema = exports.projectRoleSchema = exports.assignableGlobalRoleSchema = exports.globalRoleSchema = exports.roleNamespaceSchema = void 0;
const zod_1 = require("zod");
exports.roleNamespaceSchema = zod_1.z.enum(['global', 'project', 'credential', 'workflow']);
exports.globalRoleSchema = zod_1.z.enum(['global:owner', 'global:admin', 'global:member']);
exports.assignableGlobalRoleSchema = exports.globalRoleSchema.exclude([
    'global:owner',
]);
exports.projectRoleSchema = zod_1.z.enum([
    'project:personalOwner',
    'project:admin',
    'project:editor',
    'project:viewer',
]);
exports.credentialSharingRoleSchema = zod_1.z.enum(['credential:owner', 'credential:user']);
exports.workflowSharingRoleSchema = zod_1.z.enum(['workflow:owner', 'workflow:editor']);
//# sourceMappingURL=schemas.ee.js.map