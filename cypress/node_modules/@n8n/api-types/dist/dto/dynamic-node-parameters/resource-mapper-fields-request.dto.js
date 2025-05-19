"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceMapperFieldsRequestDto = void 0;
const zod_1 = require("zod");
const base_dynamic_parameters_request_dto_1 = require("./base-dynamic-parameters-request.dto");
class ResourceMapperFieldsRequestDto extends base_dynamic_parameters_request_dto_1.BaseDynamicParametersRequestDto.extend({
    methodName: zod_1.z.string(),
}) {
}
exports.ResourceMapperFieldsRequestDto = ResourceMapperFieldsRequestDto;
//# sourceMappingURL=resource-mapper-fields-request.dto.js.map