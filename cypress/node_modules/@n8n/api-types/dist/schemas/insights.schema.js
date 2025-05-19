"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insightsDateRangeSchema = exports.INSIGHTS_DATE_RANGE_KEYS = exports.insightsByTimeSchema = exports.insightsByTimeDataSchemas = exports.insightsByWorkflowSchema = exports.insightsByWorkflowDataSchemas = exports.insightsSummarySchema = exports.insightsSummaryDataSchemas = exports.insightsSummaryUnitSchema = exports.insightsSummaryTypeSchema = void 0;
const zod_1 = require("zod");
exports.insightsSummaryTypeSchema = zod_1.z.enum([
    'total',
    'failed',
    'failureRate',
    'timeSaved',
    'averageRunTime',
]);
exports.insightsSummaryUnitSchema = zod_1.z.enum(['count', 'ratio', 'millisecond', 'minute']);
exports.insightsSummaryDataSchemas = {
    total: zod_1.z.object({
        value: zod_1.z.number(),
        deviation: zod_1.z.union([zod_1.z.null(), zod_1.z.number()]),
        unit: zod_1.z.literal('count'),
    }),
    failed: zod_1.z.object({
        value: zod_1.z.number(),
        deviation: zod_1.z.union([zod_1.z.null(), zod_1.z.number()]),
        unit: zod_1.z.literal('count'),
    }),
    failureRate: zod_1.z.object({
        value: zod_1.z.number(),
        deviation: zod_1.z.union([zod_1.z.null(), zod_1.z.number()]),
        unit: zod_1.z.literal('ratio'),
    }),
    timeSaved: zod_1.z.object({
        value: zod_1.z.number(),
        deviation: zod_1.z.union([zod_1.z.null(), zod_1.z.number()]),
        unit: zod_1.z.literal('minute'),
    }),
    averageRunTime: zod_1.z.object({
        value: zod_1.z.number(),
        deviation: zod_1.z.union([zod_1.z.null(), zod_1.z.number()]),
        unit: zod_1.z.literal('millisecond'),
    }),
};
exports.insightsSummarySchema = zod_1.z.object(exports.insightsSummaryDataSchemas).strict();
exports.insightsByWorkflowDataSchemas = {
    count: zod_1.z.number(),
    data: zod_1.z.array(zod_1.z
        .object({
        workflowId: zod_1.z.string(),
        workflowName: zod_1.z.string(),
        projectId: zod_1.z.string(),
        projectName: zod_1.z.string(),
        total: zod_1.z.number(),
        succeeded: zod_1.z.number(),
        failed: zod_1.z.number(),
        failureRate: zod_1.z.number(),
        runTime: zod_1.z.number(),
        averageRunTime: zod_1.z.number(),
        timeSaved: zod_1.z.number(),
    })
        .strict()),
};
exports.insightsByWorkflowSchema = zod_1.z.object(exports.insightsByWorkflowDataSchemas).strict();
exports.insightsByTimeDataSchemas = {
    date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)) && new Date(val).toISOString() === val, {
        message: 'Invalid date format, must be ISO 8601 format',
    }),
    values: zod_1.z
        .object({
        total: zod_1.z.number(),
        succeeded: zod_1.z.number(),
        failed: zod_1.z.number(),
        failureRate: zod_1.z.number(),
        averageRunTime: zod_1.z.number(),
        timeSaved: zod_1.z.number(),
    })
        .strict(),
};
exports.insightsByTimeSchema = zod_1.z.object(exports.insightsByTimeDataSchemas).strict();
exports.INSIGHTS_DATE_RANGE_KEYS = [
    'day',
    'week',
    '2weeks',
    'month',
    'quarter',
    '6months',
    'year',
];
exports.insightsDateRangeSchema = zod_1.z
    .object({
    key: zod_1.z.enum(exports.INSIGHTS_DATE_RANGE_KEYS),
    licensed: zod_1.z.boolean(),
    granularity: zod_1.z.enum(['hour', 'day', 'week']),
})
    .strict();
//# sourceMappingURL=insights.schema.js.map