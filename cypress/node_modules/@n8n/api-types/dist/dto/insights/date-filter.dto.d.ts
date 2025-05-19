import { z } from 'zod';
import { Z } from 'zod-class';
declare const InsightsDateFilterDto_base: Z.Class<{
    dateRange: z.ZodOptional<z.ZodEnum<["day", "week", "2weeks", "month", "quarter", "6months", "year"]>>;
}>;
export declare class InsightsDateFilterDto extends InsightsDateFilterDto_base {
}
export {};
