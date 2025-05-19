import { z } from 'zod';
import { Z } from 'zod-class';
declare const BinaryDataQueryDto_base: Z.Class<{
    id: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    action: z.ZodEnum<["view", "download"]>;
    fileName: z.ZodOptional<z.ZodString>;
    mimeType: z.ZodOptional<z.ZodString>;
}>;
export declare class BinaryDataQueryDto extends BinaryDataQueryDto_base {
}
export {};
