"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTool = isTool;
const n8n_workflow_1 = require("n8n-workflow");
function isTool(node, nodeTypes) {
    const type = nodeTypes.getByNameAndVersion(node.type, node.typeVersion);
    if (node.type.includes('vectorStore')) {
        const mode = node.parameters?.mode;
        return mode === 'retrieve-as-tool';
    }
    for (const output of type.description.outputs) {
        if (typeof output === 'string') {
            return output === n8n_workflow_1.NodeConnectionTypes.AiTool;
        }
        else if (output?.type && output.type === n8n_workflow_1.NodeConnectionTypes.AiTool) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=is-tool.js.map