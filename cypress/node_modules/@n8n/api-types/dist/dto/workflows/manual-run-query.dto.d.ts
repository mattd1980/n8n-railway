import { z } from 'zod';
import { Z } from 'zod-class';
declare const ManualRunQueryDto_base: Z.Class<{
    partialExecutionVersion: z.ZodEffects<z.ZodDefault<z.ZodEnum<["1", "2"]>>, 1 | 2, "1" | "2" | undefined>;
}>;
export declare class ManualRunQueryDto extends ManualRunQueryDto_base {
}
export {};
