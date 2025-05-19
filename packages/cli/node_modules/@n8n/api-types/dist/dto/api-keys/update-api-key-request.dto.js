"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApiKeyRequestDto = void 0;
const xss_1 = __importDefault(require("xss"));
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const scopes_schema_1 = require("../../schemas/scopes.schema");
const xssCheck = (value) => value ===
    (0, xss_1.default)(value, {
        whiteList: {},
    });
class UpdateApiKeyRequestDto extends zod_class_1.Z.class({
    label: zod_1.z.string().max(50).min(1).refine(xssCheck),
    scopes: scopes_schema_1.scopesSchema,
}) {
}
exports.UpdateApiKeyRequestDto = UpdateApiKeyRequestDto;
//# sourceMappingURL=update-api-key-request.dto.js.map