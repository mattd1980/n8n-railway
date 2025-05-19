import type { AiAssistantSDK, SchemaType } from '@n8n_io/ai-assistant-sdk';
import { z } from 'zod';
import { Z } from 'zod-class';
type Schema = {
    type: SchemaType;
    key?: string;
    value: string | Schema[];
    path: string;
};
declare const AiAskRequestDto_base: Z.Class<{
    question: z.ZodString;
    context: z.ZodObject<{
        schema: z.ZodArray<z.ZodObject<{
            nodeName: z.ZodString;
            schema: z.ZodType<Schema, z.ZodTypeDef, Schema>;
        }, "strip", z.ZodTypeAny, {
            schema: Schema;
            nodeName: string;
        }, {
            schema: Schema;
            nodeName: string;
        }>, "many">;
        inputSchema: z.ZodObject<{
            nodeName: z.ZodString;
            schema: z.ZodType<Schema, z.ZodTypeDef, Schema>;
        }, "strip", z.ZodTypeAny, {
            schema: Schema;
            nodeName: string;
        }, {
            schema: Schema;
            nodeName: string;
        }>;
        pushRef: z.ZodString;
        ndvPushRef: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        schema: {
            schema: Schema;
            nodeName: string;
        }[];
        inputSchema: {
            schema: Schema;
            nodeName: string;
        };
        pushRef: string;
        ndvPushRef: string;
    }, {
        schema: {
            schema: Schema;
            nodeName: string;
        }[];
        inputSchema: {
            schema: Schema;
            nodeName: string;
        };
        pushRef: string;
        ndvPushRef: string;
    }>;
    forNode: z.ZodString;
}>;
export declare class AiAskRequestDto extends AiAskRequestDto_base implements AiAssistantSDK.AskAiRequestPayload {
}
export {};
