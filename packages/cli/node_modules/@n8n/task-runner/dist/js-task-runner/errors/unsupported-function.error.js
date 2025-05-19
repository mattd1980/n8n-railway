"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedFunctionError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class UnsupportedFunctionError extends n8n_workflow_1.ApplicationError {
    constructor(functionName) {
        super(`The function "${functionName}" is not supported in the Code Node`, {
            level: 'info',
        });
    }
}
exports.UnsupportedFunctionError = UnsupportedFunctionError;
//# sourceMappingURL=unsupported-function.error.js.map