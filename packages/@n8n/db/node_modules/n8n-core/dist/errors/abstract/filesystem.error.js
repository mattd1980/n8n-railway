"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class FileSystemError extends n8n_workflow_1.ApplicationError {
    constructor(message, filePath) {
        super(message, { extra: { filePath } });
    }
}
exports.FileSystemError = FileSystemError;
//# sourceMappingURL=filesystem.error.js.map