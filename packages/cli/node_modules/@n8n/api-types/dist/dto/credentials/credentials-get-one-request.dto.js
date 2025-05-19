"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsGetOneRequestQuery = void 0;
const zod_class_1 = require("zod-class");
const booleanFromString_1 = require("../../schemas/booleanFromString");
class CredentialsGetOneRequestQuery extends zod_class_1.Z.class({
    includeData: booleanFromString_1.booleanFromString.optional().default('false'),
}) {
}
exports.CredentialsGetOneRequestQuery = CredentialsGetOneRequestQuery;
//# sourceMappingURL=credentials-get-one-request.dto.js.map