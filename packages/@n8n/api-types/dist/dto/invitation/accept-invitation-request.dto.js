"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptInvitationRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const password_schema_1 = require("../../schemas/password.schema");
class AcceptInvitationRequestDto extends zod_class_1.Z.class({
    inviterId: zod_1.z.string().uuid(),
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    password: password_schema_1.passwordSchema,
}) {
}
exports.AcceptInvitationRequestDto = AcceptInvitationRequestDto;
//# sourceMappingURL=accept-invitation-request.dto.js.map