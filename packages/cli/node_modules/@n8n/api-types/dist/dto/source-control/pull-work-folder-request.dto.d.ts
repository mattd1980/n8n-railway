import { z } from 'zod';
import { Z } from 'zod-class';
declare const PullWorkFolderRequestDto_base: Z.Class<{
    force: z.ZodOptional<z.ZodBoolean>;
}>;
export declare class PullWorkFolderRequestDto extends PullWorkFolderRequestDto_base {
}
export {};
