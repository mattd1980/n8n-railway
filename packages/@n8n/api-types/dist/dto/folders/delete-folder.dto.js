"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFolderDto = void 0;
const zod_class_1 = require("zod-class");
const folder_schema_1 = require("../../schemas/folder.schema");
class DeleteFolderDto extends zod_class_1.Z.class({
    transferToFolderId: folder_schema_1.folderIdSchema.optional(),
}) {
}
exports.DeleteFolderDto = DeleteFolderDto;
//# sourceMappingURL=delete-folder.dto.js.map