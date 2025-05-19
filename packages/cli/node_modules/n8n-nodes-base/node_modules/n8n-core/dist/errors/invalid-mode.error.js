"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidModeError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const utils_1 = require("../binary-data/utils");
class InvalidModeError extends n8n_workflow_1.ApplicationError {
    constructor() {
        super(`Invalid binary data mode. Valid modes: ${utils_1.CONFIG_MODES.join(', ')}`);
    }
}
exports.InvalidModeError = InvalidModeError;
//# sourceMappingURL=invalid-mode.error.js.map