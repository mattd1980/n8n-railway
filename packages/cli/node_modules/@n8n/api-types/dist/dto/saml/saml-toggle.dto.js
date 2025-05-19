"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamlToggleDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class SamlToggleDto extends zod_class_1.Z.class({
    loginEnabled: zod_1.z.boolean(),
}) {
}
exports.SamlToggleDto = SamlToggleDto;
//# sourceMappingURL=saml-toggle.dto.js.map