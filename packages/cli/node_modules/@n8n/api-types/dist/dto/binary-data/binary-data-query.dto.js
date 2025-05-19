"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryDataQueryDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class BinaryDataQueryDto extends zod_class_1.Z.class({
    id: zod_1.z
        .string()
        .refine((id) => id.includes(':'), {
        message: 'Missing binary data mode',
    })
        .refine((id) => {
        const [mode] = id.split(':');
        return ['filesystem', 'filesystem-v2', 's3'].includes(mode);
    }, {
        message: 'Invalid binary data mode',
    }),
    action: zod_1.z.enum(['view', 'download']),
    fileName: zod_1.z.string().optional(),
    mimeType: zod_1.z.string().optional(),
}) {
}
exports.BinaryDataQueryDto = BinaryDataQueryDto;
//# sourceMappingURL=binary-data-query.dto.js.map