import { z } from 'zod';
import { Z } from 'zod-class';
declare const SettingsUpdateRequestDto_base: Z.Class<{
    userActivated: z.ZodOptional<z.ZodBoolean>;
    allowSSOManualLogin: z.ZodOptional<z.ZodBoolean>;
    easyAIWorkflowOnboarded: z.ZodOptional<z.ZodBoolean>;
}>;
export declare class SettingsUpdateRequestDto extends SettingsUpdateRequestDto_base {
}
export {};
