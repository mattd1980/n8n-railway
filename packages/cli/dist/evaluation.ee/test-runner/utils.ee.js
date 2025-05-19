"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPinData = createPinData;
exports.getPastExecutionTriggerNode = getPastExecutionTriggerNode;
exports.formatTestCaseExecutionInputData = formatTestCaseExecutionInputData;
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const errors_ee_1 = require("../../evaluation.ee/test-runner/errors.ee");
function createPinData(workflow, mockedNodes, executionData, pastWorkflowData) {
    const pinData = {};
    const workflowNodeIds = new Map(workflow.nodes.map((node) => [node.id, node.name]));
    const pastWorkflowNodeIds = new Map();
    if (pastWorkflowData) {
        for (const node of pastWorkflowData.nodes) {
            pastWorkflowNodeIds.set(node.id, node.name);
        }
    }
    for (const mockedNode of mockedNodes) {
        (0, assert_1.default)(mockedNode.id, 'Mocked node ID is missing');
        const nodeName = workflowNodeIds.get(mockedNode.id);
        if (nodeName) {
            const pastNodeName = pastWorkflowNodeIds.get(mockedNode.id) ?? nodeName;
            const nodeData = executionData.resultData.runData[pastNodeName];
            if (nodeData?.[0]?.data?.main?.[0]) {
                pinData[nodeName] = nodeData[0]?.data?.main?.[0];
            }
            else {
                throw new errors_ee_1.TestCaseExecutionError('MOCKED_NODE_DOES_NOT_EXIST');
            }
        }
    }
    return pinData;
}
function getPastExecutionTriggerNode(executionData) {
    return Object.keys(executionData.resultData.runData).find((nodeName) => {
        const data = executionData.resultData.runData[nodeName];
        return !data[0].source || data[0].source.length === 0 || data[0].source[0] === null;
    });
}
function isSubNode(node, nodeData) {
    return (!node.type.endsWith('stopAndError') &&
        nodeData.some((nodeRunData) => !(nodeRunData.data && 'main' in nodeRunData.data)));
}
function formatExecutionData(data, workflow) {
    const formattedData = {};
    for (const [nodeName, nodeData] of Object.entries(data)) {
        const node = workflow.nodes.find((n) => n.name === nodeName);
        (0, assert_1.default)(node, `Node "${nodeName}" not found in the workflow`);
        const rootNode = !isSubNode(node, nodeData);
        const runs = nodeData.map((nodeRunData) => ({
            executionTime: nodeRunData.executionTime,
            rootNode,
            output: nodeRunData.data
                ? (0, lodash_1.mapValues)(nodeRunData.data, (connections) => connections.map((singleOutputData) => singleOutputData?.map((item) => item.json) ?? []))
                : null,
        }));
        formattedData[node.id] = { nodeName, runs };
    }
    return formattedData;
}
function formatTestCaseExecutionInputData(originalExecutionData, _originalWorkflowData, newExecutionData, _newWorkflowData, metadata) {
    const annotations = {
        vote: metadata.annotation?.vote,
        tags: metadata.annotation?.tags?.map((tag) => (0, lodash_1.pick)(tag, ['id', 'name'])),
        highlightedData: Object.fromEntries(metadata.highlightedData?.map(({ key, value }) => [key, value])),
    };
    return {
        json: {
            annotations,
            originalExecution: formatExecutionData(originalExecutionData, _originalWorkflowData),
            newExecution: formatExecutionData(newExecutionData, _newWorkflowData),
        },
    };
}
//# sourceMappingURL=utils.ee.js.map