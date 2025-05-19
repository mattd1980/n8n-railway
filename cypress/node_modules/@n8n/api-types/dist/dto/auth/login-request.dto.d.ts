import { z } from 'zod';
import { Z } from 'zod-class';
declare const LoginRequestDto_base: Z.Class<{
    emailOrLdapLoginId: z.ZodString;
    password: z.ZodString;
    mfaCode: z.ZodOptional<z.ZodString>;
    mfaRecoveryCode: z.ZodOptional<z.ZodString>;
}>;
export declare class LoginRequestDto extends LoginRequestDto_base {
}
export {};
