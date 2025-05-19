"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullWorkFolderRequestDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class PullWorkFolderRequestDto extends zod_class_1.Z.class({
    force: zod_1.z.boolean().optional(),
}) {
}
exports.PullWorkFolderRequestDto = PullWorkFolderRequestDto;
//# sourceMappingURL=pull-work-folder-request.dto.js.map