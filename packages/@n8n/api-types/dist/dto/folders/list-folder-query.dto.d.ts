import { z } from 'zod';
import { Z } from 'zod-class';
export declare const filterSchema: z.ZodObject<{
    parentFolderId: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    excludeFolderIdAndDescendants: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    tags?: string[] | undefined;
    parentFolderId?: string | undefined;
    excludeFolderIdAndDescendants?: string | undefined;
}, {
    name?: string | undefined;
    tags?: string[] | undefined;
    parentFolderId?: string | undefined;
    excludeFolderIdAndDescendants?: string | undefined;
}>;
declare const ListFolderQueryDto_base: Z.Class<{
    filter: z.ZodEffects<z.ZodOptional<z.ZodString>, {
        name?: string | undefined;
        tags?: string[] | undefined;
        parentFolderId?: string | undefined;
        excludeFolderIdAndDescendants?: string | undefined;
    } | undefined, string | undefined>;
    skip: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, number, string | undefined>;
    take: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, number, string | undefined>;
    select: z.ZodEffects<z.ZodOptional<z.ZodString>, Record<"project" | "path" | "id" | "name" | "tags" | "updatedAt" | "createdAt" | "parentFolder" | "workflowCount" | "subFolderCount", true> | undefined, string | undefined>;
    sortBy: z.ZodOptional<z.ZodEnum<["name:asc", "name:desc", "createdAt:asc", "createdAt:desc", "updatedAt:asc", "updatedAt:desc"]>>;
}>;
export declare class ListFolderQueryDto extends ListFolderQueryDto_base {
}
export {};
