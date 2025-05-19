"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiFreeCreditsRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class AiFreeCreditsRequestDto extends zod_class_1.Z.class({
    projectId: zod_1.z.string().min(1).optional(),
}) {
}
exports.AiFreeCreditsRequestDto = AiFreeCreditsRequestDto;
//# sourceMappingURL=ai-free-credits-request.dto.js.map