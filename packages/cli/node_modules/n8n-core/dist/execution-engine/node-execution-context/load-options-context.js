"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadOptionsContext = void 0;
const lodash_1 = require("lodash");
const node_execution_context_1 = require("./node-execution-context");
const extract_value_1 = require("./utils/extract-value");
const request_helper_functions_1 = require("./utils/request-helper-functions");
const ssh_tunnel_helper_functions_1 = require("./utils/ssh-tunnel-helper-functions");
class LoadOptionsContext extends node_execution_context_1.NodeExecutionContext {
    constructor(workflow, node, additionalData, path) {
        super(workflow, node, additionalData, 'internal');
        this.path = path;
        this.helpers = {
            ...(0, ssh_tunnel_helper_functions_1.getSSHTunnelFunctions)(),
            ...(0, request_helper_functions_1.getRequestHelperFunctions)(workflow, node, additionalData),
        };
    }
    async getCredentials(type) {
        return await this._getCredentials(type);
    }
    getCurrentNodeParameter(parameterPath, options) {
        const nodeParameters = this.additionalData.currentNodeParameters;
        if (parameterPath.charAt(0) === '&') {
            parameterPath = `${this.path.split('.').slice(1, -1).join('.')}.${parameterPath.slice(1)}`;
        }
        let returnData = (0, lodash_1.get)(nodeParameters, parameterPath);
        if (options?.extractValue) {
            const nodeType = this.workflow.nodeTypes.getByNameAndVersion(this.node.type, this.node.typeVersion);
            returnData = (0, extract_value_1.extractValue)(returnData, parameterPath, this.node, nodeType);
        }
        return returnData;
    }
    getCurrentNodeParameters() {
        return this.additionalData.currentNodeParameters;
    }
}
exports.LoadOptionsContext = LoadOptionsContext;
//# sourceMappingURL=load-options-context.js.map