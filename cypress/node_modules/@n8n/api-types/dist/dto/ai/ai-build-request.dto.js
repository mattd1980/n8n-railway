"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiBuilderChatRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class AiBuilderChatRequestDto extends zod_class_1.Z.class({
    payload: zod_1.z.object({
        question: zod_1.z.string(),
    }),
}) {
}
exports.AiBuilderChatRequestDto = AiBuilderChatRequestDto;
//# sourceMappingURL=ai-build-request.dto.js.map