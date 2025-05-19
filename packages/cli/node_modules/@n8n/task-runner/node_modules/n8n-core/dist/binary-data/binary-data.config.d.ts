import { z } from 'zod';
import { InstanceSettings } from '../instance-settings';
declare const binaryDataModesSchema: z.ZodEnum<["default", "filesystem", "s3"]>;
declare const availableModesSchema: z.ZodPipeline<z.ZodEffects<z.ZodString, string[], string>, z.ZodArray<z.ZodEnum<["default", "filesystem", "s3"]>, "many">>;
export declare class BinaryDataConfig {
    availableModes: z.infer<typeof availableModesSchema>;
    mode: z.infer<typeof binaryDataModesSchema>;
    localStoragePath: string;
    signingSecret: string;
    constructor({ encryptionKey, n8nFolder }: InstanceSettings);
}
export {};
