"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveSignupTokenQueryDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class ResolveSignupTokenQueryDto extends zod_class_1.Z.class({
    inviterId: zod_1.z.string().uuid(),
    inviteeId: zod_1.z.string().uuid(),
}) {
}
exports.ResolveSignupTokenQueryDto = ResolveSignupTokenQueryDto;
//# sourceMappingURL=resolve-signup-token-query.dto.js.map