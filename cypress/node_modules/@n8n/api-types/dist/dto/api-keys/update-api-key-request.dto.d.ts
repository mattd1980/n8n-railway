import { z } from 'zod';
import { Z } from 'zod-class';
declare const UpdateApiKeyRequestDto_base: Z.Class<{
    label: z.ZodEffects<z.ZodString, string, string>;
    scopes: z.ZodEffects<z.ZodArray<z.ZodString, "many">, import("@n8n/permissions").ApiKeyScope[], string[]>;
}>;
export declare class UpdateApiKeyRequestDto extends UpdateApiKeyRequestDto_base {
}
export {};
