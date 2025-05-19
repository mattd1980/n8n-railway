"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiApplySuggestionRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class AiApplySuggestionRequestDto extends zod_class_1.Z.class({
    sessionId: zod_1.z.string(),
    suggestionId: zod_1.z.string(),
}) {
}
exports.AiApplySuggestionRequestDto = AiApplySuggestionRequestDto;
//# sourceMappingURL=ai-apply-suggestion-request.dto.js.map