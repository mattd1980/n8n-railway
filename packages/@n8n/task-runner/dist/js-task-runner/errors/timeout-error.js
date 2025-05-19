"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class TimeoutError extends n8n_workflow_1.ApplicationError {
    constructor(taskTimeout) {
        super(`Task execution timed out after ${taskTimeout} ${taskTimeout === 1 ? 'second' : 'seconds'}`);
        const subtitle = 'The task runner was taking too long on this task, so the task was aborted.';
        const fixes = {
            optimizeScript: 'Optimize your script to prevent long-running tasks, e.g. by processing data in smaller batches.',
            ensureTermination: 'Ensure that all paths in your script are able to terminate, i.e. no infinite loops.',
        };
        const suggestions = [fixes.optimizeScript, fixes.ensureTermination];
        const suggestionsText = suggestions
            .map((suggestion, index) => `${index + 1}. ${suggestion}`)
            .join('<br/>');
        const description = `${subtitle} You can try the following:<br/><br/>${suggestionsText}`;
        this.description = description;
    }
}
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=timeout-error.js.map