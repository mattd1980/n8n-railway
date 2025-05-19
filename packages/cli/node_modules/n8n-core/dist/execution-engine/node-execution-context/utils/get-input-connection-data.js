"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHandleToolInvocation = makeHandleToolInvocation;
exports.getInputConnectionData = getInputConnectionData;
const n8n_workflow_1 = require("n8n-workflow");
const create_node_as_tool_1 = require("./create-node-as-tool");
const supply_data_context_1 = require("../../node-execution-context/supply-data-context");
function getNextRunIndex(runExecutionData, nodeName) {
    return runExecutionData.resultData.runData[nodeName]?.length ?? 0;
}
function makeHandleToolInvocation(contextFactory, node, nodeType, runExecutionData) {
    let runIndex = getNextRunIndex(runExecutionData, node.name);
    return async (toolArgs) => {
        const localRunIndex = runIndex++;
        const context = contextFactory(localRunIndex);
        context.addInputData(n8n_workflow_1.NodeConnectionTypes.AiTool, [[{ json: toolArgs }]]);
        try {
            const result = await nodeType.execute?.call(context);
            const mappedResults = result?.[0]?.flatMap((item) => item.json);
            let response = mappedResults;
            if (result?.some((x) => x.some((y) => y.binary))) {
                if (!mappedResults || mappedResults.flatMap((x) => Object.keys(x ?? {})).length === 0) {
                    response =
                        'Error: The Tool attempted to return binary data, which is not supported in Agents';
                }
                else {
                    context.logger.warn(`Response from Tool '${node.name}' included binary data, which is not supported in Agents. The binary data was omitted from the response.`);
                }
            }
            context.addOutputData(n8n_workflow_1.NodeConnectionTypes.AiTool, localRunIndex, [[{ json: { response } }]]);
            return JSON.stringify(response);
        }
        catch (error) {
            const nodeError = new n8n_workflow_1.NodeOperationError(node, error);
            context.addOutputData(n8n_workflow_1.NodeConnectionTypes.AiTool, localRunIndex, nodeError);
            return 'Error during node execution: ' + (nodeError.description ?? nodeError.message);
        }
    };
}
async function getInputConnectionData(workflow, runExecutionData, parentRunIndex, connectionInputData, parentInputData, additionalData, executeData, mode, closeFunctions, connectionType, itemIndex, abortSignal) {
    const parentNode = this.getNode();
    const inputConfiguration = this.nodeInputs.find((input) => input.type === connectionType);
    if (inputConfiguration === undefined) {
        throw new n8n_workflow_1.ApplicationError('Node does not have input of type', {
            extra: { nodeName: parentNode.name, connectionType },
        });
    }
    const connectedNodes = this.getConnectedNodes(connectionType);
    if (connectedNodes.length === 0) {
        if (inputConfiguration.required) {
            throw new n8n_workflow_1.NodeOperationError(parentNode, `A ${inputConfiguration?.displayName ?? connectionType} sub-node must be connected and enabled`);
        }
        return inputConfiguration.maxConnections === 1 ? undefined : [];
    }
    if (inputConfiguration.maxConnections !== undefined &&
        connectedNodes.length > inputConfiguration.maxConnections) {
        throw new n8n_workflow_1.NodeOperationError(parentNode, `Only ${inputConfiguration.maxConnections} ${connectionType} sub-nodes are/is allowed to be connected`);
    }
    const nodes = [];
    for (const connectedNode of connectedNodes) {
        const connectedNodeType = workflow.nodeTypes.getByNameAndVersion(connectedNode.type, connectedNode.typeVersion);
        const contextFactory = (runIndex, inputData) => new supply_data_context_1.SupplyDataContext(workflow, connectedNode, additionalData, mode, runExecutionData, runIndex, connectionInputData, inputData, connectionType, executeData, closeFunctions, abortSignal, parentNode);
        if (!connectedNodeType.supplyData) {
            if (connectedNodeType.description.outputs.includes(n8n_workflow_1.NodeConnectionTypes.AiTool)) {
                const supplyData = (0, create_node_as_tool_1.createNodeAsTool)({
                    node: connectedNode,
                    nodeType: connectedNodeType,
                    handleToolInvocation: makeHandleToolInvocation((i) => contextFactory(i, {}), connectedNode, connectedNodeType, runExecutionData),
                });
                nodes.push(supplyData);
            }
            else {
                throw new n8n_workflow_1.ApplicationError('Node does not have a `supplyData` method defined', {
                    extra: { nodeName: connectedNode.name },
                });
            }
        }
        else {
            const context = contextFactory(parentRunIndex, parentInputData);
            try {
                const supplyData = await connectedNodeType.supplyData.call(context, itemIndex);
                if (supplyData.closeFunction) {
                    closeFunctions.push(supplyData.closeFunction);
                }
                nodes.push(supplyData);
            }
            catch (error) {
                if (error instanceof n8n_workflow_1.ExecutionBaseError) {
                    if (error.functionality === 'configuration-node')
                        throw error;
                }
                else {
                    error = new n8n_workflow_1.NodeOperationError(connectedNode, error, {
                        itemIndex,
                    });
                }
                let currentNodeRunIndex = 0;
                if (runExecutionData.resultData.runData.hasOwnProperty(parentNode.name)) {
                    currentNodeRunIndex = runExecutionData.resultData.runData[parentNode.name].length;
                }
                await context.addExecutionDataFunctions('input', error, connectionType, parentNode.name, currentNodeRunIndex);
                throw new n8n_workflow_1.NodeOperationError(connectedNode, `Error in sub-node ${connectedNode.name}`, {
                    itemIndex,
                    functionality: 'configuration-node',
                    description: error.message,
                });
            }
        }
    }
    return inputConfiguration.maxConnections === 1
        ? (nodes || [])[0]?.response
        : nodes.map((node) => node.response);
}
//# sourceMappingURL=get-input-connection-data.js.map