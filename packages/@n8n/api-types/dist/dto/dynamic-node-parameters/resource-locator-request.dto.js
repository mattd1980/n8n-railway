"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceLocatorRequestDto = void 0;
const zod_1 = require("zod");
const base_dynamic_parameters_request_dto_1 = require("./base-dynamic-parameters-request.dto");
class ResourceLocatorRequestDto extends base_dynamic_parameters_request_dto_1.BaseDynamicParametersRequestDto.extend({
    methodName: zod_1.z.string(),
    filter: zod_1.z.string().optional(),
    paginationToken: zod_1.z.string().optional(),
}) {
}
exports.ResourceLocatorRequestDto = ResourceLocatorRequestDto;
//# sourceMappingURL=resource-locator-request.dto.js.map