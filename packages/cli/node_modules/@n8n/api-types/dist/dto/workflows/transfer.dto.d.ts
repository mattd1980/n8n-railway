import { z } from 'zod';
import { Z } from 'zod-class';
declare const TransferWorkflowBodyDto_base: Z.Class<{
    destinationProjectId: z.ZodString;
    shareCredentials: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    destinationParentFolderId: z.ZodOptional<z.ZodString>;
}>;
export declare class TransferWorkflowBodyDto extends TransferWorkflowBodyDto_base {
}
export {};
