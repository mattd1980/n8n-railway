"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCredentialDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class CreateCredentialDto extends zod_class_1.Z.class({
    name: zod_1.z.string().min(1).max(128),
    type: zod_1.z.string().min(1).max(128),
    data: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()),
    projectId: zod_1.z.string().optional(),
}) {
}
exports.CreateCredentialDto = CreateCredentialDto;
//# sourceMappingURL=create-credential.dto.js.map