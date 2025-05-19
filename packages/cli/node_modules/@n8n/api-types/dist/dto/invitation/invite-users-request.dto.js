"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteUsersRequestDto = void 0;
const zod_1 = require("zod");
const roleSchema = zod_1.z.enum(['global:member', 'global:admin']);
const invitedUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    role: roleSchema.default('global:member'),
});
const invitationsSchema = zod_1.z.array(invitedUserSchema);
class InviteUsersRequestDto extends Array {
    static safeParse(data) {
        return invitationsSchema.safeParse(data);
    }
}
exports.InviteUsersRequestDto = InviteUsersRequestDto;
//# sourceMappingURL=invite-users-request.dto.js.map