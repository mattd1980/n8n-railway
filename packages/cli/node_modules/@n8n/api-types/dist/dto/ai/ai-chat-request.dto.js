"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiChatRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class AiChatRequestDto extends zod_class_1.Z.class({
    payload: zod_1.z.object({}).passthrough(),
    sessionId: zod_1.z.string().optional(),
}) {
}
exports.AiChatRequestDto = AiChatRequestDto;
//# sourceMappingURL=ai-chat-request.dto.js.map