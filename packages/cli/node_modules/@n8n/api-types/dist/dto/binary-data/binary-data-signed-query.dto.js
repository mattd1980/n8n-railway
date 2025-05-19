"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryDataSignedQueryDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class BinaryDataSignedQueryDto extends zod_class_1.Z.class({
    token: zod_1.z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, {
        message: 'Token must be a valid JWT format',
    }),
}) {
}
exports.BinaryDataSignedQueryDto = BinaryDataSignedQueryDto;
//# sourceMappingURL=binary-data-signed-query.dto.js.map