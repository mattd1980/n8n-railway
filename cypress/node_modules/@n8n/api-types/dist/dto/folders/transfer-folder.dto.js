"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferFolderBodyDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const folder_schema_1 = require("../../schemas/folder.schema");
class TransferFolderBodyDto extends zod_class_1.Z.class({
    destinationProjectId: zod_1.z.string(),
    shareCredentials: zod_1.z.array(zod_1.z.string()).optional(),
    destinationParentFolderId: folder_schema_1.folderIdSchema,
}) {
}
exports.TransferFolderBodyDto = TransferFolderBodyDto;
//# sourceMappingURL=transfer-folder.dto.js.map