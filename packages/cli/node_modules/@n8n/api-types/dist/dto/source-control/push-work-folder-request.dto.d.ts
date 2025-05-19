import { z } from 'zod';
import { Z } from 'zod-class';
declare const PushWorkFolderRequestDto_base: Z.Class<{
    force: z.ZodOptional<z.ZodBoolean>;
    commitMessage: z.ZodOptional<z.ZodString>;
    fileNames: z.ZodArray<z.ZodObject<{
        file: z.ZodString;
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["credential", "workflow", "tags", "variables", "file", "folders"]>;
        status: z.ZodEnum<["new", "modified", "deleted", "created", "renamed", "conflicted", "ignored", "staged", "unknown"]>;
        location: z.ZodEnum<["local", "remote"]>;
        conflict: z.ZodBoolean;
        updatedAt: z.ZodString;
        pushed: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "workflow" | "credential" | "file" | "tags" | "variables" | "folders";
        status: "unknown" | "new" | "modified" | "deleted" | "created" | "renamed" | "conflicted" | "ignored" | "staged";
        id: string;
        file: string;
        name: string;
        location: "local" | "remote";
        conflict: boolean;
        updatedAt: string;
        pushed?: boolean | undefined;
    }, {
        type: "workflow" | "credential" | "file" | "tags" | "variables" | "folders";
        status: "unknown" | "new" | "modified" | "deleted" | "created" | "renamed" | "conflicted" | "ignored" | "staged";
        id: string;
        file: string;
        name: string;
        location: "local" | "remote";
        conflict: boolean;
        updatedAt: string;
        pushed?: boolean | undefined;
    }>, "many">;
}>;
export declare class PushWorkFolderRequestDto extends PushWorkFolderRequestDto_base {
}
export {};
