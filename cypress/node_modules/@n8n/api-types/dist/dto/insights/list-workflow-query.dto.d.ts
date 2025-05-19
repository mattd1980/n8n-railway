import { z } from 'zod';
import { Z } from 'zod-class';
declare const ListInsightsWorkflowQueryDto_base: Z.Class<{
    dateRange: z.ZodOptional<z.ZodEnum<["day", "week", "2weeks", "month", "quarter", "6months", "year"]>>;
    sortBy: z.ZodOptional<z.ZodEnum<["total:asc", "total:desc", "succeeded:asc", "succeeded:desc", "failed:asc", "failed:desc", "failureRate:asc", "failureRate:desc", "timeSaved:asc", "timeSaved:desc", "runTime:asc", "runTime:desc", "averageRunTime:asc", "averageRunTime:desc"]>>;
    skip: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, number, string | undefined>, number, string | undefined>;
    take: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, number, string | undefined>, number, string | undefined>, number, string | undefined>;
}>;
export declare class ListInsightsWorkflowQueryDto extends ListInsightsWorkflowQueryDto_base {
}
export {};
