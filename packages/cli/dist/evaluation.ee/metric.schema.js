"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMetricPatchRequestBodySchema = exports.testMetricCreateRequestBodySchema = void 0;
const zod_1 = require("zod");
exports.testMetricCreateRequestBodySchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1).max(255),
})
    .strict();
exports.testMetricPatchRequestBodySchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1).max(255),
})
    .strict();
//# sourceMappingURL=metric.schema.js.map