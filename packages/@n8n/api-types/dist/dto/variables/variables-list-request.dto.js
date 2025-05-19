"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableListRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class VariableListRequestDto extends zod_class_1.Z.class({
    state: zod_1.z.literal('empty').optional(),
}) {
}
exports.VariableListRequestDto = VariableListRequestDto;
//# sourceMappingURL=variables-list-request.dto.js.map