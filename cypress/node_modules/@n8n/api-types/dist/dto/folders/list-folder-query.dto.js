"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFolderQueryDto = exports.filterSchema = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const VALID_SELECT_FIELDS = [
    'id',
    'name',
    'createdAt',
    'updatedAt',
    'project',
    'tags',
    'parentFolder',
    'workflowCount',
    'subFolderCount',
    'path',
];
const VALID_SORT_OPTIONS = [
    'name:asc',
    'name:desc',
    'createdAt:asc',
    'createdAt:desc',
    'updatedAt:asc',
    'updatedAt:desc',
];
exports.filterSchema = zod_1.z
    .object({
    parentFolderId: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    excludeFolderIdAndDescendants: zod_1.z.string().optional(),
})
    .strict();
const filterValidator = zod_1.z
    .string()
    .optional()
    .transform((val, ctx) => {
    if (!val)
        return undefined;
    try {
        const parsed = (0, n8n_workflow_1.jsonParse)(val);
        try {
            return exports.filterSchema.parse(parsed);
        }
        catch (e) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'Invalid filter fields',
                path: ['filter'],
            });
            return zod_1.z.NEVER;
        }
    }
    catch (e) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Invalid filter format',
            path: ['filter'],
        });
        return zod_1.z.NEVER;
    }
});
const skipValidator = zod_1.z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 0))
    .refine((val) => !isNaN(val), {
    message: 'Skip must be a valid number',
});
const takeValidator = zod_1.z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => !isNaN(val), {
    message: 'Take must be a valid number',
});
const selectFieldsValidator = zod_1.z.array(zod_1.z.enum(VALID_SELECT_FIELDS));
const selectValidator = zod_1.z
    .string()
    .optional()
    .transform((val, ctx) => {
    if (!val)
        return undefined;
    try {
        const parsed = JSON.parse(val);
        try {
            const selectFields = selectFieldsValidator.parse(parsed);
            if (selectFields.length === 0)
                return undefined;
            return selectFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
        }
        catch (e) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: `Invalid select fields. Valid fields are: ${VALID_SELECT_FIELDS.join(', ')}`,
                path: ['select'],
            });
            return zod_1.z.NEVER;
        }
    }
    catch (e) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Invalid select format',
            path: ['select'],
        });
        return zod_1.z.NEVER;
    }
});
const sortByValidator = zod_1.z
    .enum(VALID_SORT_OPTIONS, { message: `sortBy must be one of: ${VALID_SORT_OPTIONS.join(', ')}` })
    .optional();
class ListFolderQueryDto extends zod_class_1.Z.class({
    filter: filterValidator,
    skip: skipValidator,
    take: takeValidator,
    select: selectValidator,
    sortBy: sortByValidator,
}) {
}
exports.ListFolderQueryDto = ListFolderQueryDto;
//# sourceMappingURL=list-folder-query.dto.js.map