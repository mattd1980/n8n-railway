"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateCredentialNameRequestQuery = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class GenerateCredentialNameRequestQuery extends zod_class_1.Z.class({
    name: zod_1.z.string().optional(),
}) {
}
exports.GenerateCredentialNameRequestQuery = GenerateCredentialNameRequestQuery;
//# sourceMappingURL=generate-credential-name.dto.js.map