"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferWorkflowBodyDto = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
class TransferWorkflowBodyDto extends zod_class_1.Z.class({
    destinationProjectId: zod_1.z.string(),
    shareCredentials: zod_1.z.array(zod_1.z.string()).optional(),
    destinationParentFolderId: zod_1.z.string().optional(),
}) {
}
exports.TransferWorkflowBodyDto = TransferWorkflowBodyDto;
//# sourceMappingURL=transfer.dto.js.map