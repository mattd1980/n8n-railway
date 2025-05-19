import { z } from 'zod';
import { Z } from 'zod-class';
declare const OwnerSetupRequestDto_base: Z.Class<{
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    password: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
}>;
export declare class OwnerSetupRequestDto extends OwnerSetupRequestDto_base {
}
export {};
