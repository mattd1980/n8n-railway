"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceControlledFileSchema = exports.SOURCE_CONTROL_FILE_LOCATION = exports.SOURCE_CONTROL_FILE_STATUS = exports.SOURCE_CONTROL_FILE_TYPE = void 0;
const zod_1 = require("zod");
const FileTypeSchema = zod_1.z.enum(['credential', 'workflow', 'tags', 'variables', 'file', 'folders']);
exports.SOURCE_CONTROL_FILE_TYPE = FileTypeSchema.Values;
const FileStatusSchema = zod_1.z.enum([
    'new',
    'modified',
    'deleted',
    'created',
    'renamed',
    'conflicted',
    'ignored',
    'staged',
    'unknown',
]);
exports.SOURCE_CONTROL_FILE_STATUS = FileStatusSchema.Values;
const FileLocationSchema = zod_1.z.enum(['local', 'remote']);
exports.SOURCE_CONTROL_FILE_LOCATION = FileLocationSchema.Values;
exports.SourceControlledFileSchema = zod_1.z.object({
    file: zod_1.z.string(),
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    type: FileTypeSchema,
    status: FileStatusSchema,
    location: FileLocationSchema,
    conflict: zod_1.z.boolean(),
    updatedAt: zod_1.z.string(),
    pushed: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=source-controlled-file.schema.js.map