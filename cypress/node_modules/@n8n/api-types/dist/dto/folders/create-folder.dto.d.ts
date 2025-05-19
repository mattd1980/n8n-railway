import { Z } from 'zod-class';
declare const CreateFolderDto_base: Z.Class<{
    name: import("zod").ZodString;
    parentFolderId: import("zod").ZodOptional<import("zod").ZodString>;
}>;
export declare class CreateFolderDto extends CreateFolderDto_base {
}
export {};
