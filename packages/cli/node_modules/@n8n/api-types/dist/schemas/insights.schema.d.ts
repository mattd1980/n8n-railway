import { z } from 'zod';
export declare const insightsSummaryTypeSchema: z.ZodEnum<["total", "failed", "failureRate", "timeSaved", "averageRunTime"]>;
export type InsightsSummaryType = z.infer<typeof insightsSummaryTypeSchema>;
export declare const insightsSummaryUnitSchema: z.ZodEnum<["count", "ratio", "millisecond", "minute"]>;
export type InsightsSummaryUnit = z.infer<typeof insightsSummaryUnitSchema>;
export declare const insightsSummaryDataSchemas: {
    readonly total: z.ZodObject<{
        value: z.ZodNumber;
        deviation: z.ZodUnion<[z.ZodNull, z.ZodNumber]>;
        unit: z.ZodLiteral<"count">;
    }, "strip", z.ZodTypeAny, {
        value: number;
        deviation: number | null;
        unit: "count";
    }, {
        value: number;
        deviation: number | null;
        unit: "count";
    }>;
    readonly failed: z.ZodObject<{
        value: z.ZodNumber;
        deviation: z.ZodUnion<[z.ZodNull, z.ZodNumber]>;
        unit: z.ZodLiteral<"count">;
    }, "strip", z.ZodTypeAny, {
        value: number;
        deviation: number | null;
        unit: "count";
    }, {
        value: number;
        deviation: number | null;
        unit: "count";
    }>;
    readonly failureRate: z.ZodObject<{
        value: z.ZodNumber;
        deviation: z.ZodUnion<[z.ZodNull, z.ZodNumber]>;
        unit: z.ZodLiteral<"ratio">;
    }, "strip", z.ZodTypeAny, {
        value: number;
        deviation: number | null;
        unit: "ratio";
    }, {
        value: number;
        deviation: number | null;
        unit: "ratio";
    }>;
    readonly timeSaved: z.ZodObject<{
        value: z.ZodNumber;
        deviation: z.ZodUnion<[z.ZodNull, z.ZodNumber]>;
        unit: z.ZodLiteral<"minute">;
    }, "strip", z.ZodTypeAny, {
        value: number;
        deviation: number | null;
        unit: "minute";
    }, {
        value: number;
        deviation: number | null;
        unit: "minute";
    }>;
    readonly averageRunTime: z.ZodObject<{
        value: z.ZodNumber;
        deviation: z.ZodUnion<[z.ZodNull, z.ZodNumber]>;
        unit: z.ZodLiteral<"millisecond">;
    }, "strip", z.ZodTypeAny, {
        value: number;
        deviation: number | null;
        unit: "millisecond";
    }, {
        value: number;
        deviation: number | null;
        unit: "millisecond";
    }>;
};
export declare const insightsSummarySchema: z.ZodObject<{
    readonly total: z.ZodObject<{
        value: z.ZodNumber;
        deviation: z.ZodUnion<[z.ZodNull, z.ZodNumber]>;
        unit: z.ZodLiteral<"count">;
    }, "strip", z.ZodTypeAny, {
        value: number;
        deviation: number | null;
        unit: "count";
    }, {
        value: number;
        deviation: number | null;
        unit: "count";
    }>;
    readonly failed: z.ZodObject<{
        value: z.ZodNumber;
        deviation: z.ZodUnion<[z.ZodNull, z.ZodNumber]>;
        unit: z.ZodLiteral<"count">;
    }, "strip", z.ZodTypeAny, {
        value: number;
        deviation: number | null;
        unit: "count";
    }, {
        value: number;
        deviation: number | null;
        unit: "count";
    }>;
    readonly failureRate: z.ZodObject<{
        value: z.ZodNumber;
        deviation: z.ZodUnion<[z.ZodNull, z.ZodNumber]>;
        unit: z.ZodLiteral<"ratio">;
    }, "strip", z.ZodTypeAny, {
        value: number;
        deviation: number | null;
        unit: "ratio";
    }, {
        value: number;
        deviation: number | null;
        unit: "ratio";
    }>;
    readonly timeSaved: z.ZodObject<{
        value: z.ZodNumber;
        deviation: z.ZodUnion<[z.ZodNull, z.ZodNumber]>;
        unit: z.ZodLiteral<"minute">;
    }, "strip", z.ZodTypeAny, {
        value: number;
        deviation: number | null;
        unit: "minute";
    }, {
        value: number;
        deviation: number | null;
        unit: "minute";
    }>;
    readonly averageRunTime: z.ZodObject<{
        value: z.ZodNumber;
        deviation: z.ZodUnion<[z.ZodNull, z.ZodNumber]>;
        unit: z.ZodLiteral<"millisecond">;
    }, "strip", z.ZodTypeAny, {
        value: number;
        deviation: number | null;
        unit: "millisecond";
    }, {
        value: number;
        deviation: number | null;
        unit: "millisecond";
    }>;
}, "strict", z.ZodTypeAny, {
    total: {
        value: number;
        deviation: number | null;
        unit: "count";
    };
    failed: {
        value: number;
        deviation: number | null;
        unit: "count";
    };
    failureRate: {
        value: number;
        deviation: number | null;
        unit: "ratio";
    };
    timeSaved: {
        value: number;
        deviation: number | null;
        unit: "minute";
    };
    averageRunTime: {
        value: number;
        deviation: number | null;
        unit: "millisecond";
    };
}, {
    total: {
        value: number;
        deviation: number | null;
        unit: "count";
    };
    failed: {
        value: number;
        deviation: number | null;
        unit: "count";
    };
    failureRate: {
        value: number;
        deviation: number | null;
        unit: "ratio";
    };
    timeSaved: {
        value: number;
        deviation: number | null;
        unit: "minute";
    };
    averageRunTime: {
        value: number;
        deviation: number | null;
        unit: "millisecond";
    };
}>;
export type InsightsSummary = z.infer<typeof insightsSummarySchema>;
export declare const insightsByWorkflowDataSchemas: {
    readonly count: z.ZodNumber;
    readonly data: z.ZodArray<z.ZodObject<{
        workflowId: z.ZodString;
        workflowName: z.ZodString;
        projectId: z.ZodString;
        projectName: z.ZodString;
        total: z.ZodNumber;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        failureRate: z.ZodNumber;
        runTime: z.ZodNumber;
        averageRunTime: z.ZodNumber;
        timeSaved: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        workflowId: string;
        workflowName: string;
        projectId: string;
        projectName: string;
        succeeded: number;
        runTime: number;
    }, {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        workflowId: string;
        workflowName: string;
        projectId: string;
        projectName: string;
        succeeded: number;
        runTime: number;
    }>, "many">;
};
export declare const insightsByWorkflowSchema: z.ZodObject<{
    readonly count: z.ZodNumber;
    readonly data: z.ZodArray<z.ZodObject<{
        workflowId: z.ZodString;
        workflowName: z.ZodString;
        projectId: z.ZodString;
        projectName: z.ZodString;
        total: z.ZodNumber;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        failureRate: z.ZodNumber;
        runTime: z.ZodNumber;
        averageRunTime: z.ZodNumber;
        timeSaved: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        workflowId: string;
        workflowName: string;
        projectId: string;
        projectName: string;
        succeeded: number;
        runTime: number;
    }, {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        workflowId: string;
        workflowName: string;
        projectId: string;
        projectName: string;
        succeeded: number;
        runTime: number;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    count: number;
    data: {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        workflowId: string;
        workflowName: string;
        projectId: string;
        projectName: string;
        succeeded: number;
        runTime: number;
    }[];
}, {
    count: number;
    data: {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        workflowId: string;
        workflowName: string;
        projectId: string;
        projectName: string;
        succeeded: number;
        runTime: number;
    }[];
}>;
export type InsightsByWorkflow = z.infer<typeof insightsByWorkflowSchema>;
export declare const insightsByTimeDataSchemas: {
    readonly date: z.ZodEffects<z.ZodString, string, string>;
    readonly values: z.ZodObject<{
        total: z.ZodNumber;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        failureRate: z.ZodNumber;
        averageRunTime: z.ZodNumber;
        timeSaved: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        succeeded: number;
    }, {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        succeeded: number;
    }>;
};
export declare const insightsByTimeSchema: z.ZodObject<{
    readonly date: z.ZodEffects<z.ZodString, string, string>;
    readonly values: z.ZodObject<{
        total: z.ZodNumber;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        failureRate: z.ZodNumber;
        averageRunTime: z.ZodNumber;
        timeSaved: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        succeeded: number;
    }, {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        succeeded: number;
    }>;
}, "strict", z.ZodTypeAny, {
    values: {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        succeeded: number;
    };
    date: string;
}, {
    values: {
        total: number;
        failed: number;
        failureRate: number;
        timeSaved: number;
        averageRunTime: number;
        succeeded: number;
    };
    date: string;
}>;
export type InsightsByTime = z.infer<typeof insightsByTimeSchema>;
export declare const INSIGHTS_DATE_RANGE_KEYS: readonly ["day", "week", "2weeks", "month", "quarter", "6months", "year"];
export declare const insightsDateRangeSchema: z.ZodObject<{
    key: z.ZodEnum<["day", "week", "2weeks", "month", "quarter", "6months", "year"]>;
    licensed: z.ZodBoolean;
    granularity: z.ZodEnum<["hour", "day", "week"]>;
}, "strict", z.ZodTypeAny, {
    key: "day" | "week" | "2weeks" | "month" | "quarter" | "6months" | "year";
    licensed: boolean;
    granularity: "day" | "week" | "hour";
}, {
    key: "day" | "week" | "2weeks" | "month" | "quarter" | "6months" | "year";
    licensed: boolean;
    granularity: "day" | "week" | "hour";
}>;
export type InsightsDateRange = z.infer<typeof insightsDateRangeSchema>;
