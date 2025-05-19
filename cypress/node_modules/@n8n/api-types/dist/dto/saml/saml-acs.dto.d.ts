import { z } from 'zod';
import { Z } from 'zod-class';
declare const SamlAcsDto_base: Z.Class<{
    RelayState: z.ZodOptional<z.ZodString>;
}>;
export declare class SamlAcsDto extends SamlAcsDto_base {
}
export {};
