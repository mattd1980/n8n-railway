import { z } from 'zod';
import { Z } from 'zod-class';
declare const CreateCredentialDto_base: Z.Class<{
    name: z.ZodString;
    type: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    projectId: z.ZodOptional<z.ZodString>;
}>;
export declare class CreateCredentialDto extends CreateCredentialDto_base {
}
export {};
