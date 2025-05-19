"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFolderDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const folder_schema_1 = require("../../schemas/folder.schema");
class UpdateFolderDto extends zod_class_1.Z.class({
    name: folder_schema_1.folderNameSchema.optional(),
    tagIds: zod_1.z.array(zod_1.z.string().max(24)).optional(),
    parentFolderId: folder_schema_1.folderIdSchema.optional(),
}) {
}
exports.UpdateFolderDto = UpdateFolderDto;
//# sourceMappingURL=update-folder.dto.js.map