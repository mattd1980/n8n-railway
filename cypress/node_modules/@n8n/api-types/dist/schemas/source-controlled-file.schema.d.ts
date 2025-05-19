import { z } from 'zod';
export declare const SOURCE_CONTROL_FILE_TYPE: z.Values<["credential", "workflow", "tags", "variables", "file", "folders"]>;
export declare const SOURCE_CONTROL_FILE_STATUS: z.Values<["new", "modified", "deleted", "created", "renamed", "conflicted", "ignored", "staged", "unknown"]>;
export declare const SOURCE_CONTROL_FILE_LOCATION: z.Values<["local", "remote"]>;
export declare const SourceControlledFileSchema: z.ZodObject<{
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
}>;
export type SourceControlledFile = z.infer<typeof SourceControlledFileSchema>;
