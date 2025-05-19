"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityRegisteredRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class CommunityRegisteredRequestDto extends zod_class_1.Z.class({ email: zod_1.z.string().email() }) {
}
exports.CommunityRegisteredRequestDto = CommunityRegisteredRequestDto;
//# sourceMappingURL=community-registered-request.dto.js.map