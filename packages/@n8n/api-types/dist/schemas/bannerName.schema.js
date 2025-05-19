"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerNameSchema = void 0;
const zod_1 = require("zod");
exports.bannerNameSchema = zod_1.z.enum([
    'V1',
    'TRIAL_OVER',
    'TRIAL',
    'NON_PRODUCTION_LICENSE',
    'EMAIL_CONFIRMATION',
]);
//# sourceMappingURL=bannerName.schema.js.map