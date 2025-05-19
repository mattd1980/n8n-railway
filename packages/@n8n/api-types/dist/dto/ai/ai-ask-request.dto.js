"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAskRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const schemaValidator = zod_1.z.lazy(() => zod_1.z.object({
    type: zod_1.z.enum([
        'string',
        'number',
        'boolean',
        'bigint',
        'symbol',
        'array',
        'object',
        'function',
        'null',
        'undefined',
    ]),
    key: zod_1.z.string().optional(),
    value: zod_1.z.union([zod_1.z.string(), zod_1.z.lazy(() => schemaValidator.array())]),
    path: zod_1.z.string(),
}));
class AiAskRequestDto extends zod_class_1.Z.class({
    question: zod_1.z.string(),
    context: zod_1.z.object({
        schema: zod_1.z.array(zod_1.z.object({
            nodeName: zod_1.z.string(),
            schema: schemaValidator,
        })),
        inputSchema: zod_1.z.object({
            nodeName: zod_1.z.string(),
            schema: schemaValidator,
        }),
        pushRef: zod_1.z.string(),
        ndvPushRef: zod_1.z.string(),
    }),
    forNode: zod_1.z.string(),
}) {
}
exports.AiAskRequestDto = AiAskRequestDto;
//# sourceMappingURL=ai-ask-request.dto.js.map