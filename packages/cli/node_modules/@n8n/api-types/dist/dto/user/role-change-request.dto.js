"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleChangeRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class RoleChangeRequestDto extends zod_class_1.Z.class({
    newRoleName: zod_1.z.enum(['global:admin', 'global:member'], {
        required_error: 'New role is required',
    }),
}) {
}
exports.RoleChangeRequestDto = RoleChangeRequestDto;
//# sourceMappingURL=role-change-request.dto.js.map