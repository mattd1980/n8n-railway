"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateRequestDto = void 0;
const xss_1 = __importDefault(require("xss"));
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const xssCheck = (value) => value ===
    (0, xss_1.default)(value, {
        whiteList: {},
    });
const URL_REGEX = /^(https?:\/\/|www\.)|(\.[\p{L}\d-]+)/iu;
const urlCheck = (value) => !URL_REGEX.test(value);
const nameSchema = () => zod_1.z
    .string()
    .min(1)
    .max(32)
    .refine(xssCheck, {
    message: 'Potentially malicious string',
})
    .refine(urlCheck, {
    message: 'Potentially malicious string',
});
class UserUpdateRequestDto extends zod_class_1.Z.class({
    email: zod_1.z.string().email(),
    firstName: nameSchema().optional(),
    lastName: nameSchema().optional(),
    mfaCode: zod_1.z.string().optional(),
}) {
}
exports.UserUpdateRequestDto = UserUpdateRequestDto;
//# sourceMappingURL=user-update-request.dto.js.map