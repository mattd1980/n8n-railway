"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidExecutionMetadataError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class InvalidExecutionMetadataError extends n8n_workflow_1.ApplicationError {
    constructor(type, key, message, options) {
        super(message ?? `Custom data ${type}s must be a string (key "${key}")`, options);
        this.type = type;
    }
}
exports.InvalidExecutionMetadataError = InvalidExecutionMetadataError;
//# sourceMappingURL=invalid-execution-metadata.error.js.map