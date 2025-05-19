"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamlAcsDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class SamlAcsDto extends zod_class_1.Z.class({
    RelayState: zod_1.z.string().optional(),
}) {
}
exports.SamlAcsDto = SamlAcsDto;
//# sourceMappingURL=saml-acs.dto.js.map