import { z } from 'zod';
import { Z } from 'zod-class';
declare const ForgotPasswordRequestDto_base: Z.Class<{
    email: z.ZodString;
}>;
export declare class ForgotPasswordRequestDto extends ForgotPasswordRequestDto_base {
}
export {};
