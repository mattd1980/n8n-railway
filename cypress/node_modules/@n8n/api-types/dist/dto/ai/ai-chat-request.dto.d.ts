import type { AiAssistantSDK } from '@n8n_io/ai-assistant-sdk';
import { z } from 'zod';
import { Z } from 'zod-class';
declare const AiChatRequestDto_base: Z.Class<{
    payload: z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>;
    sessionId: z.ZodOptional<z.ZodString>;
}>;
export declare class AiChatRequestDto extends AiChatRequestDto_base implements AiAssistantSDK.ChatRequestPayload {
}
export {};
