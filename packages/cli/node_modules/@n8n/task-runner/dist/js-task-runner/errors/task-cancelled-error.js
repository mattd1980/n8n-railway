"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCancelledError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class TaskCancelledError extends n8n_workflow_1.ApplicationError {
    constructor(reason) {
        super(`Task cancelled: ${reason}`, { level: 'warning' });
    }
}
exports.TaskCancelledError = TaskCancelledError;
//# sourceMappingURL=task-cancelled-error.js.map