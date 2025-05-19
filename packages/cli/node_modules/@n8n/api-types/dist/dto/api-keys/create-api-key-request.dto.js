"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApiKeyRequestDto = void 0;
const zod_1 = require("zod");
const update_api_key_request_dto_1 = require("./update-api-key-request.dto");
const isTimeNullOrInFuture = (value) => {
    if (!value)
        return true;
    return value > Date.now() / 1000;
};
class CreateApiKeyRequestDto extends update_api_key_request_dto_1.UpdateApiKeyRequestDto.extend({
    expiresAt: zod_1.z
        .number()
        .nullable()
        .refine(isTimeNullOrInFuture, { message: 'Expiration date must be in the future or null' }),
}) {
}
exports.CreateApiKeyRequestDto = CreateApiKeyRequestDto;
//# sourceMappingURL=create-api-key-request.dto.js.map