"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsGetManyRequestQuery = void 0;
const zod_class_1 = require("zod-class");
const booleanFromString_1 = require("../../schemas/booleanFromString");
class CredentialsGetManyRequestQuery extends zod_class_1.Z.class({
    includeScopes: booleanFromString_1.booleanFromString.optional(),
    includeData: booleanFromString_1.booleanFromString.optional(),
    onlySharedWithMe: booleanFromString_1.booleanFromString.optional(),
}) {
}
exports.CredentialsGetManyRequestQuery = CredentialsGetManyRequestQuery;
//# sourceMappingURL=credentials-get-many-request.dto.js.map