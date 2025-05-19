import { z } from 'zod';
import { Z } from 'zod-class';
declare const UserUpdateRequestDto_base: Z.Class<{
    email: z.ZodString;
    firstName: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>>;
    lastName: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>>;
    mfaCode: z.ZodOptional<z.ZodString>;
}>;
export declare class UserUpdateRequestDto extends UserUpdateRequestDto_base {
}
export {};
