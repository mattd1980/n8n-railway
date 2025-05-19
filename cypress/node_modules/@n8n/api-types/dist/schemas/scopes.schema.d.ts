import type { ApiKeyScope } from '@n8n/permissions';
import { z } from 'zod';
export declare const scopesSchema: z.ZodEffects<z.ZodArray<z.ZodString, "many">, ApiKeyScope[], string[]>;
