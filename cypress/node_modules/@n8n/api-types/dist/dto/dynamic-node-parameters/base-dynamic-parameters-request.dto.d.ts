import { z } from 'zod';
import { Z } from 'zod-class';
declare const BaseDynamicParametersRequestDto_base: Z.Class<{
    path: z.ZodString;
    nodeTypeAndVersion: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodEffects<z.ZodNumber, number, number>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        version: number;
    }, {
        name: string;
        version: number;
    }>;
    currentNodeParameters: z.ZodRecord<z.ZodString, z.ZodAny>;
    methodName: z.ZodOptional<z.ZodString>;
    credentials: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}>;
export declare class BaseDynamicParametersRequestDto extends BaseDynamicParametersRequestDto_base {
}
export {};
