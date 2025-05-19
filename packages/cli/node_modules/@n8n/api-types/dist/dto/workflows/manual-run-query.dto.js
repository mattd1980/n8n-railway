"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualRunQueryDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class ManualRunQueryDto extends zod_class_1.Z.class({
    partialExecutionVersion: zod_1.z
        .enum(['1', '2'])
        .default('1')
        .transform((version) => Number.parseInt(version)),
}) {
}
exports.ManualRunQueryDto = ManualRunQueryDto;
//# sourceMappingURL=manual-run-query.dto.js.map