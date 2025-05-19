"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushWorkFolderRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const source_controlled_file_schema_1 = require("../../schemas/source-controlled-file.schema");
class PushWorkFolderRequestDto extends zod_class_1.Z.class({
    force: zod_1.z.boolean().optional(),
    commitMessage: zod_1.z.string().optional(),
    fileNames: zod_1.z.array(source_controlled_file_schema_1.SourceControlledFileSchema),
}) {
}
exports.PushWorkFolderRequestDto = PushWorkFolderRequestDto;
//# sourceMappingURL=push-work-folder-request.dto.js.map