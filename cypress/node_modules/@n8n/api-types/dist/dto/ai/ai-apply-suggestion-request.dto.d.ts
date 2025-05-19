import { z } from 'zod';
import { Z } from 'zod-class';
declare const AiApplySuggestionRequestDto_base: Z.Class<{
    sessionId: z.ZodString;
    suggestionId: z.ZodString;
}>;
export declare class AiApplySuggestionRequestDto extends AiApplySuggestionRequestDto_base {
}
export {};
