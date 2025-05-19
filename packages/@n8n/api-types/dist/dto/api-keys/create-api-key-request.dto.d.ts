import { z } from 'zod';
import { UpdateApiKeyRequestDto } from './update-api-key-request.dto';
declare const CreateApiKeyRequestDto_base: {
    ExpiresAt: z.ZodEffects<z.ZodNullable<z.ZodNumber>, number | null, number | null>;
} & {
    schema: <T>(this: {
        new (input: any): T;
        [key: string]: any;
    }) => z.ZodType<T>;
    prototype: UpdateApiKeyRequestDto;
    staticProps: {
        Label: z.ZodEffects<z.ZodString, string, string>;
        Scopes: z.ZodEffects<z.ZodArray<z.ZodString, "many">, import("@n8n/permissions").ApiKeyScope[], string[]>;
    };
    Label: z.ZodEffects<z.ZodString, string, string>;
    Scopes: z.ZodEffects<z.ZodArray<z.ZodString, "many">, import("@n8n/permissions").ApiKeyScope[], string[]>;
} & import("zod-class").ZodClass<{
    expiresAt: number | null;
} & {} & {
    label: string;
    scopes: string[];
} & {}, {
    expiresAt: number | null;
} & {} & UpdateApiKeyRequestDto, Omit<{
    label: z.ZodEffects<z.ZodString, string, string>;
    scopes: z.ZodEffects<z.ZodArray<z.ZodString, "many">, import("@n8n/permissions").ApiKeyScope[], string[]>;
}, "expiresAt"> & {
    expiresAt: z.ZodEffects<z.ZodNullable<z.ZodNumber>, number | null, number | null>;
}>;
export declare class CreateApiKeyRequestDto extends CreateApiKeyRequestDto_base {
}
export {};
