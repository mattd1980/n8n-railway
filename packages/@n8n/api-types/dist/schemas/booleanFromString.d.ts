import { z } from 'zod';
export declare const booleanFromString: z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">;
