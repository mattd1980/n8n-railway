"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionResultRequestDto = void 0;
const zod_1 = require("zod");
const base_dynamic_parameters_request_dto_1 = require("./base-dynamic-parameters-request.dto");
class ActionResultRequestDto extends base_dynamic_parameters_request_dto_1.BaseDynamicParametersRequestDto.extend({
    handler: zod_1.z.string(),
    payload: zod_1.z
        .union([zod_1.z.object({}).catchall(zod_1.z.any()), zod_1.z.string()])
        .optional(),
}) {
}
exports.ActionResultRequestDto = ActionResultRequestDto;
//# sourceMappingURL=action-result-request.dto.js.map