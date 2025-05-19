"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DismissBannerRequestDto = void 0;
const zod_class_1 = require("zod-class");
const bannerName_schema_1 = require("../../schemas/bannerName.schema");
class DismissBannerRequestDto extends zod_class_1.Z.class({
    banner: bannerName_schema_1.bannerNameSchema.optional(),
}) {
}
exports.DismissBannerRequestDto = DismissBannerRequestDto;
//# sourceMappingURL=dismiss-banner-request.dto.js.map