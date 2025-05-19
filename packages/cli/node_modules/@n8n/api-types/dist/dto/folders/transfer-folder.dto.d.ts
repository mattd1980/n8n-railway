import { z } from 'zod';
import { Z } from 'zod-class';
declare const TransferFolderBodyDto_base: Z.Class<{
    destinationProjectId: z.ZodString;
    shareCredentials: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    destinationParentFolderId: z.ZodString;
}>;
export declare class TransferFolderBodyDto extends TransferFolderBodyDto_base {
}
export {};
