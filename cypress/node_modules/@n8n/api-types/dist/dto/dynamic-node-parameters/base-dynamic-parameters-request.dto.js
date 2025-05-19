"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDynamicParametersRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const nodeVersion_schema_1 = require("../../schemas/nodeVersion.schema");
class BaseDynamicParametersRequestDto extends zod_class_1.Z.class({
    path: zod_1.z.string(),
    nodeTypeAndVersion: zod_1.z.object({
        name: zod_1.z.string(),
        version: nodeVersion_schema_1.nodeVersionSchema,
    }),
    currentNodeParameters: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    methodName: zod_1.z.string().optional(),
    credentials: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
}) {
}
exports.BaseDynamicParametersRequestDto = BaseDynamicParametersRequestDto;
//# sourceMappingURL=base-dynamic-parameters-request.dto.js.map