import { z } from 'zod';
import { Z } from 'zod-class';
declare const AiBuilderChatRequestDto_base: Z.Class<{
    payload: z.ZodObject<{
        question: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        question: string;
    }, {
        question: string;
    }>;
}>;
export declare class AiBuilderChatRequestDto extends AiBuilderChatRequestDto_base {
}
export {};
