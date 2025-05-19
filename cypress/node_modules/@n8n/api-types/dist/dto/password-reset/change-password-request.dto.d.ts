import { z } from 'zod';
import { Z } from 'zod-class';
declare const ChangePasswordRequestDto_base: Z.Class<{
    token: z.ZodString;
    password: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    mfaCode: z.ZodOptional<z.ZodString>;
}>;
export declare class ChangePasswordRequestDto extends ChangePasswordRequestDto_base {
}
export {};
