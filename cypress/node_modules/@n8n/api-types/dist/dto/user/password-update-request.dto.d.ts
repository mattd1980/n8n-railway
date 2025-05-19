import { z } from 'zod';
import { Z } from 'zod-class';
declare const PasswordUpdateRequestDto_base: Z.Class<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    mfaCode: z.ZodOptional<z.ZodString>;
}>;
export declare class PasswordUpdateRequestDto extends PasswordUpdateRequestDto_base {
}
export {};
