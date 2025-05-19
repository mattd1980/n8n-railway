"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopesSchema = void 0;
const zod_1 = require("zod");
exports.scopesSchema = zod_1.z
    .array(zod_1.z
    .string()
    .regex(/^[a-zA-Z]+:[a-zA-Z]+$/, "Each scope must follow the format '{resource}:{scope}' with only letters (e.g., 'workflow:create')"))
    .min(1)
    .transform((scopes) => {
    return scopes;
});
//# sourceMappingURL=scopes.schema.js.map