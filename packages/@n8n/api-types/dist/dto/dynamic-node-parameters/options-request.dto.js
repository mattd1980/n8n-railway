"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsRequestDto = void 0;
const zod_1 = require("zod");
const base_dynamic_parameters_request_dto_1 = require("./base-dynamic-parameters-request.dto");
class OptionsRequestDto extends base_dynamic_parameters_request_dto_1.BaseDynamicParametersRequestDto.extend({
    loadOptions: zod_1.z
        .object({
        routing: zod_1.z
            .object({
            operations: zod_1.z.any().optional(),
            output: zod_1.z.any().optional(),
            request: zod_1.z.any().optional(),
        })
            .optional(),
    })
        .optional(),
}) {
}
exports.OptionsRequestDto = OptionsRequestDto;
//# sourceMappingURL=options-request.dto.js.map