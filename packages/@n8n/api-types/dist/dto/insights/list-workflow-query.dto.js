"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListInsightsWorkflowQueryDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const date_filter_dto_1 = require("./date-filter.dto");
const pagination_dto_1 = require("../pagination/pagination.dto");
const VALID_SORT_OPTIONS = [
    'total:asc',
    'total:desc',
    'succeeded:asc',
    'succeeded:desc',
    'failed:asc',
    'failed:desc',
    'failureRate:asc',
    'failureRate:desc',
    'timeSaved:asc',
    'timeSaved:desc',
    'runTime:asc',
    'runTime:desc',
    'averageRunTime:asc',
    'averageRunTime:desc',
];
const sortByValidator = zod_1.z
    .enum(VALID_SORT_OPTIONS, { message: `sortBy must be one of: ${VALID_SORT_OPTIONS.join(', ')}` })
    .optional();
class ListInsightsWorkflowQueryDto extends zod_class_1.Z.class({
    ...pagination_dto_1.paginationSchema,
    dateRange: date_filter_dto_1.InsightsDateFilterDto.shape.dateRange,
    sortBy: sortByValidator,
}) {
}
exports.ListInsightsWorkflowQueryDto = ListInsightsWorkflowQueryDto;
//# sourceMappingURL=list-workflow-query.dto.js.map