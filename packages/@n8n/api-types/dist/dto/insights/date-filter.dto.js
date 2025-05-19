"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsDateFilterDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const insights_schema_1 = require("../../schemas/insights.schema");
const VALID_DATE_RANGE_OPTIONS = insights_schema_1.insightsDateRangeSchema.shape.key.options;
const dateRange = zod_1.z.enum(VALID_DATE_RANGE_OPTIONS).optional();
class InsightsDateFilterDto extends zod_class_1.Z.class({
    dateRange,
}) {
}
exports.InsightsDateFilterDto = InsightsDateFilterDto;
//# sourceMappingURL=date-filter.dto.js.map