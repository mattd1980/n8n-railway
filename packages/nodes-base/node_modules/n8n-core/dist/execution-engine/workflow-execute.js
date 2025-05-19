"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowExecute = void 0;
const di_1 = require("@n8n/di");
const assert = __importStar(require("assert/strict"));
const events_1 = require("events");
const get_1 = __importDefault(require("lodash/get"));
const n8n_workflow_1 = require("n8n-workflow");
const p_cancelable_1 = __importDefault(require("p-cancelable"));
const error_reporter_1 = require("../errors/error-reporter");
const workflow_has_issues_error_1 = require("../errors/workflow-has-issues.error");
const NodeExecuteFunctions = __importStar(require("../node-execute-functions"));
const node_execution_context_1 = require("./node-execution-context");
const partial_execution_utils_1 = require("./partial-execution-utils");
const rewire_graph_1 = require("./partial-execution-utils/rewire-graph");
const routing_node_1 = require("./routing-node");
const triggers_and_pollers_1 = require("./triggers-and-pollers");
class WorkflowExecute {
    constructor(additionalData, mode, runExecutionData = {
        startData: {},
        resultData: {
            runData: {},
            pinData: {},
        },
        executionData: {
            contextData: {},
            nodeExecutionStack: [],
            metadata: {},
            waitingExecution: {},
            waitingExecutionSource: {},
        },
    }) {
        this.additionalData = additionalData;
        this.mode = mode;
        this.runExecutionData = runExecutionData;
        this.status = 'new';
        this.abortController = new AbortController();
    }
    run(workflow, startNode, destinationNode, pinData, triggerToStartFrom) {
        this.status = 'running';
        startNode = startNode || workflow.getStartNode(destinationNode);
        if (startNode === undefined) {
            throw new n8n_workflow_1.ApplicationError('No node to start the workflow from could be found');
        }
        let runNodeFilter;
        if (destinationNode) {
            runNodeFilter = workflow.getParentNodes(destinationNode);
            runNodeFilter.push(destinationNode);
        }
        const nodeExecutionStack = [
            {
                node: startNode,
                data: triggerToStartFrom?.data?.data ?? {
                    main: [
                        [
                            {
                                json: {},
                            },
                        ],
                    ],
                },
                source: null,
            },
        ];
        this.runExecutionData = {
            startData: {
                destinationNode,
                runNodeFilter,
            },
            resultData: {
                runData: {},
                pinData,
            },
            executionData: {
                contextData: {},
                nodeExecutionStack,
                metadata: {},
                waitingExecution: {},
                waitingExecutionSource: {},
            },
        };
        return this.processRunExecutionData(workflow);
    }
    forceInputNodeExecution(workflow) {
        return workflow.settings.executionOrder !== 'v1';
    }
    runPartialWorkflow(workflow, runData, startNodes, destinationNode, pinData) {
        let incomingNodeConnections;
        let connection;
        this.additionalData.currentNodeExecutionIndex = (0, partial_execution_utils_1.getNextExecutionIndex)(runData);
        this.status = 'running';
        const runIndex = 0;
        let runNodeFilter;
        const nodeExecutionStack = [];
        const waitingExecution = {};
        const waitingExecutionSource = {};
        for (const startNode of startNodes) {
            incomingNodeConnections = workflow.connectionsByDestinationNode[startNode.name];
            const incomingData = [];
            let incomingSourceData = null;
            if (incomingNodeConnections === undefined) {
                incomingData.push([
                    {
                        json: {},
                    },
                ]);
            }
            else {
                incomingSourceData = { main: [] };
                for (const connections of incomingNodeConnections.main) {
                    if (!connections) {
                        continue;
                    }
                    for (let inputIndex = 0; inputIndex < connections.length; inputIndex++) {
                        connection = connections[inputIndex];
                        const node = workflow.getNode(connection.node);
                        if (node?.disabled)
                            continue;
                        if (node && pinData && pinData[node.name]) {
                            incomingData.push(pinData[node.name]);
                        }
                        else {
                            if (!runData[connection.node]) {
                                continue;
                            }
                            const nodeIncomingData = runData[connection.node]?.[runIndex]?.data?.[connection.type]?.[connection.index];
                            if (nodeIncomingData) {
                                incomingData.push(nodeIncomingData);
                            }
                        }
                        incomingSourceData.main.push(startNode.sourceData ?? { previousNode: connection.node });
                    }
                }
            }
            const executeData = {
                node: workflow.getNode(startNode.name),
                data: {
                    main: incomingData,
                },
                source: incomingSourceData,
            };
            nodeExecutionStack.push(executeData);
            if (destinationNode) {
                incomingNodeConnections = workflow.connectionsByDestinationNode[destinationNode];
                if (incomingNodeConnections !== undefined) {
                    for (const connections of incomingNodeConnections.main) {
                        if (!connections) {
                            continue;
                        }
                        for (let inputIndex = 0; inputIndex < connections.length; inputIndex++) {
                            connection = connections[inputIndex];
                            if (waitingExecution[destinationNode] === undefined) {
                                waitingExecution[destinationNode] = {};
                                waitingExecutionSource[destinationNode] = {};
                            }
                            if (waitingExecution[destinationNode][runIndex] === undefined) {
                                waitingExecution[destinationNode][runIndex] = {};
                                waitingExecutionSource[destinationNode][runIndex] = {};
                            }
                            if (waitingExecution[destinationNode][runIndex][connection.type] === undefined) {
                                waitingExecution[destinationNode][runIndex][connection.type] = [];
                                waitingExecutionSource[destinationNode][runIndex][connection.type] = [];
                            }
                            if (runData[connection.node] !== undefined) {
                                waitingExecution[destinationNode][runIndex][connection.type].push(runData[connection.node][runIndex].data[connection.type][connection.index]);
                                waitingExecutionSource[destinationNode][runIndex][connection.type].push({
                                    previousNode: connection.node,
                                    previousNodeOutput: connection.index || undefined,
                                    previousNodeRun: runIndex || undefined,
                                });
                            }
                            else {
                                waitingExecution[destinationNode][runIndex][connection.type].push(null);
                                waitingExecutionSource[destinationNode][runIndex][connection.type].push(null);
                            }
                        }
                    }
                }
                runNodeFilter = workflow
                    .getParentNodes(destinationNode)
                    .filter((parentNodeName) => !workflow.getNode(parentNodeName)?.disabled);
                runNodeFilter.push(destinationNode);
            }
        }
        this.runExecutionData = {
            startData: {
                destinationNode,
                runNodeFilter,
            },
            resultData: {
                runData,
                pinData,
            },
            executionData: {
                contextData: {},
                nodeExecutionStack,
                metadata: {},
                waitingExecution,
                waitingExecutionSource,
            },
        };
        return this.processRunExecutionData(workflow);
    }
    runPartialWorkflow2(workflow, runData, pinData = {}, dirtyNodeNames = [], destinationNodeName, agentRequest) {
        assert.ok(destinationNodeName, 'a destinationNodeName is required for the new partial execution flow');
        let destination = workflow.getNode(destinationNodeName);
        assert.ok(destination, `Could not find a node with the name ${destinationNodeName} in the workflow.`);
        let graph = partial_execution_utils_1.DirectedGraph.fromWorkflow(workflow);
        if ((0, partial_execution_utils_1.isTool)(destination, workflow.nodeTypes)) {
            graph = (0, partial_execution_utils_1.rewireGraph)(destination, graph, agentRequest);
            workflow = graph.toWorkflow({ ...workflow });
            const toolExecutorNode = workflow.getNode(rewire_graph_1.TOOL_EXECUTOR_NODE_NAME);
            if (!toolExecutorNode) {
                throw new n8n_workflow_1.OperationalError('ToolExecutor can not be found');
            }
            destination = toolExecutorNode;
            destinationNodeName = toolExecutorNode.name;
        }
        else {
            const destinationHasNoParents = graph.getDirectParentConnections(destination).length === 0;
            if (destinationHasNoParents) {
                graph = (0, partial_execution_utils_1.findSubgraph)({
                    graph: (0, partial_execution_utils_1.filterDisabledNodes)(graph),
                    destination,
                    trigger: destination,
                });
                const filteredNodes = graph.getNodes();
                runData = (0, partial_execution_utils_1.cleanRunData)(runData, graph, new Set([destination]));
                const { nodeExecutionStack, waitingExecution, waitingExecutionSource } = (0, partial_execution_utils_1.recreateNodeExecutionStack)(graph, new Set([destination]), runData, pinData ?? {});
                this.status = 'running';
                this.runExecutionData = {
                    startData: {
                        destinationNode: destinationNodeName,
                        runNodeFilter: Array.from(filteredNodes.values()).map((node) => node.name),
                    },
                    resultData: {
                        runData,
                        pinData,
                    },
                    executionData: {
                        contextData: {},
                        nodeExecutionStack,
                        metadata: {},
                        waitingExecution,
                        waitingExecutionSource,
                    },
                };
                return this.processRunExecutionData(graph.toWorkflow({ ...workflow }));
            }
        }
        const trigger = (0, partial_execution_utils_1.findTriggerForPartialExecution)(workflow, destinationNodeName, runData);
        if (trigger === undefined) {
            throw new n8n_workflow_1.UserError('Connect a trigger to run this node');
        }
        graph = (0, partial_execution_utils_1.findSubgraph)({ graph: (0, partial_execution_utils_1.filterDisabledNodes)(graph), destination, trigger });
        const filteredNodes = graph.getNodes();
        const dirtyNodes = graph.getNodesByNames(dirtyNodeNames);
        runData = (0, partial_execution_utils_1.cleanRunData)(runData, graph, dirtyNodes);
        let startNodes = (0, partial_execution_utils_1.findStartNodes)({ graph, trigger, destination, runData, pinData });
        startNodes = (0, partial_execution_utils_1.handleCycles)(graph, startNodes, trigger);
        runData = (0, partial_execution_utils_1.cleanRunData)(runData, graph, startNodes);
        const { nodeExecutionStack, waitingExecution, waitingExecutionSource } = (0, partial_execution_utils_1.recreateNodeExecutionStack)(graph, startNodes, runData, pinData ?? {});
        this.additionalData.currentNodeExecutionIndex = (0, partial_execution_utils_1.getNextExecutionIndex)(runData);
        this.status = 'running';
        this.runExecutionData = {
            startData: {
                destinationNode: destinationNodeName,
                runNodeFilter: Array.from(filteredNodes.values()).map((node) => node.name),
            },
            resultData: {
                runData,
                pinData,
            },
            executionData: {
                contextData: {},
                nodeExecutionStack,
                metadata: {},
                waitingExecution,
                waitingExecutionSource,
            },
        };
        return this.processRunExecutionData(graph.toWorkflow({ ...workflow }));
    }
    moveNodeMetadata() {
        const metadata = (0, get_1.default)(this.runExecutionData, 'executionData.metadata');
        if (metadata) {
            const runData = (0, get_1.default)(this.runExecutionData, 'resultData.runData');
            let index;
            let metaRunData;
            for (const nodeName of Object.keys(metadata)) {
                for ([index, metaRunData] of metadata[nodeName].entries()) {
                    const taskData = runData[nodeName]?.[index];
                    if (taskData) {
                        taskData.metadata = { ...taskData.metadata, ...metaRunData };
                    }
                    else {
                        di_1.Container.get(error_reporter_1.ErrorReporter).error(new n8n_workflow_1.UnexpectedError('Taskdata missing at the end of an execution'), { extra: { nodeName, index } });
                    }
                }
            }
        }
    }
    incomingConnectionIsEmpty(runData, inputConnections, runIndex) {
        for (const inputConnection of inputConnections) {
            const nodeIncomingData = (0, get_1.default)(runData, [
                inputConnection.node,
                runIndex,
                'data',
                'main',
                inputConnection.index,
            ]);
            if (nodeIncomingData !== undefined && nodeIncomingData.length !== 0) {
                return false;
            }
        }
        return true;
    }
    prepareWaitingToExecution(nodeName, numberOfConnections, runIndex) {
        const executionData = this.runExecutionData.executionData;
        executionData.waitingExecution ??= {};
        executionData.waitingExecutionSource ??= {};
        const nodeWaiting = (executionData.waitingExecution[nodeName] ??= []);
        const nodeWaitingSource = (executionData.waitingExecutionSource[nodeName] ??= []);
        nodeWaiting[runIndex] = { main: [] };
        nodeWaitingSource[runIndex] = { main: [] };
        for (let i = 0; i < numberOfConnections; i++) {
            nodeWaiting[runIndex].main.push(null);
            nodeWaitingSource[runIndex].main.push(null);
        }
    }
    addNodeToBeExecuted(workflow, connectionData, outputIndex, parentNodeName, nodeSuccessData, runIndex) {
        let stillDataMissing = false;
        const enqueueFn = workflow.settings.executionOrder === 'v1' ? 'unshift' : 'push';
        let waitingNodeIndex;
        if (workflow.connectionsByDestinationNode[connectionData.node].main.length > 1) {
            let nodeWasWaiting = true;
            if (!this.runExecutionData.executionData.waitingExecutionSource) {
                this.runExecutionData.executionData.waitingExecutionSource = {};
            }
            if (this.runExecutionData.executionData.waitingExecution[connectionData.node] === undefined) {
                this.runExecutionData.executionData.waitingExecution[connectionData.node] = {};
                this.runExecutionData.executionData.waitingExecutionSource[connectionData.node] = {};
                nodeWasWaiting = false;
            }
            let createNewWaitingEntry = true;
            if (Object.keys(this.runExecutionData.executionData.waitingExecution[connectionData.node])
                .length > 0) {
                for (const index of Object.keys(this.runExecutionData.executionData.waitingExecution[connectionData.node])) {
                    if (!this.runExecutionData.executionData.waitingExecution[connectionData.node][parseInt(index)].main[connectionData.index]) {
                        createNewWaitingEntry = false;
                        waitingNodeIndex = parseInt(index);
                        break;
                    }
                }
            }
            if (waitingNodeIndex === undefined) {
                waitingNodeIndex = Object.values(this.runExecutionData.executionData.waitingExecution[connectionData.node]).length;
            }
            if (createNewWaitingEntry) {
                this.prepareWaitingToExecution(connectionData.node, workflow.connectionsByDestinationNode[connectionData.node].main.length, waitingNodeIndex);
            }
            if (nodeSuccessData === null) {
                this.runExecutionData.executionData.waitingExecution[connectionData.node][waitingNodeIndex].main[connectionData.index] = null;
                this.runExecutionData.executionData.waitingExecutionSource[connectionData.node][waitingNodeIndex].main[connectionData.index] = null;
            }
            else {
                this.runExecutionData.executionData.waitingExecution[connectionData.node][waitingNodeIndex].main[connectionData.index] = nodeSuccessData[outputIndex];
                this.runExecutionData.executionData.waitingExecutionSource[connectionData.node][waitingNodeIndex].main[connectionData.index] = {
                    previousNode: parentNodeName,
                    previousNodeOutput: outputIndex || undefined,
                    previousNodeRun: runIndex || undefined,
                };
            }
            let thisExecutionData;
            let allDataFound = true;
            for (let i = 0; i <
                this.runExecutionData.executionData.waitingExecution[connectionData.node][waitingNodeIndex]
                    .main.length; i++) {
                thisExecutionData =
                    this.runExecutionData.executionData.waitingExecution[connectionData.node][waitingNodeIndex].main[i];
                if (thisExecutionData === null) {
                    allDataFound = false;
                    break;
                }
            }
            if (allDataFound) {
                const executionStackItem = {
                    node: workflow.nodes[connectionData.node],
                    data: this.runExecutionData.executionData.waitingExecution[connectionData.node][waitingNodeIndex],
                    source: this.runExecutionData.executionData.waitingExecutionSource[connectionData.node][waitingNodeIndex],
                };
                if (this.runExecutionData.executionData.waitingExecutionSource !== null &&
                    this.runExecutionData.executionData.waitingExecutionSource !== undefined) {
                    executionStackItem.source =
                        this.runExecutionData.executionData.waitingExecutionSource[connectionData.node][waitingNodeIndex];
                }
                this.runExecutionData.executionData.nodeExecutionStack[enqueueFn](executionStackItem);
                delete this.runExecutionData.executionData.waitingExecution[connectionData.node][waitingNodeIndex];
                delete this.runExecutionData.executionData.waitingExecutionSource[connectionData.node][waitingNodeIndex];
                if (Object.keys(this.runExecutionData.executionData.waitingExecution[connectionData.node])
                    .length === 0) {
                    delete this.runExecutionData.executionData.waitingExecution[connectionData.node];
                    delete this.runExecutionData.executionData.waitingExecutionSource[connectionData.node];
                }
                return;
            }
            stillDataMissing = true;
            if (!nodeWasWaiting) {
                const checkOutputNodes = [];
                for (const outputIndexParent in workflow.connectionsBySourceNode[parentNodeName].main) {
                    if (!workflow.connectionsBySourceNode[parentNodeName].main.hasOwnProperty(outputIndexParent)) {
                        continue;
                    }
                    for (const connectionDataCheck of workflow.connectionsBySourceNode[parentNodeName].main[outputIndexParent] ?? []) {
                        checkOutputNodes.push(connectionDataCheck.node);
                    }
                }
                const forceInputNodeExecution = this.forceInputNodeExecution(workflow);
                for (let inputIndex = 0; inputIndex < workflow.connectionsByDestinationNode[connectionData.node].main.length; inputIndex++) {
                    for (const inputData of workflow.connectionsByDestinationNode[connectionData.node].main[inputIndex] ?? []) {
                        if (inputData.node === parentNodeName) {
                            continue;
                        }
                        const executionStackNodes = this.runExecutionData.executionData.nodeExecutionStack.map((stackData) => stackData.node.name);
                        if (inputData.node !== parentNodeName && checkOutputNodes.includes(inputData.node)) {
                            if (!this.incomingConnectionIsEmpty(this.runExecutionData.resultData.runData, workflow.connectionsByDestinationNode[inputData.node].main[0] ?? [], runIndex)) {
                                continue;
                            }
                        }
                        if (executionStackNodes.includes(inputData.node)) {
                            continue;
                        }
                        if (this.runExecutionData.resultData.runData[inputData.node] !== undefined) {
                            continue;
                        }
                        if (!forceInputNodeExecution) {
                            continue;
                        }
                        const parentNodes = workflow.getParentNodes(inputData.node, n8n_workflow_1.NodeConnectionTypes.Main, -1);
                        let nodeToAdd = inputData.node;
                        parentNodes.push(inputData.node);
                        parentNodes.reverse();
                        for (const parentNode of parentNodes) {
                            if (inputData.node !== parentNode && checkOutputNodes.includes(parentNode)) {
                                nodeToAdd = undefined;
                                break;
                            }
                            if (executionStackNodes.includes(parentNode)) {
                                nodeToAdd = undefined;
                                break;
                            }
                            if (this.runExecutionData.resultData.runData[parentNode] !== undefined) {
                                break;
                            }
                            nodeToAdd = parentNode;
                        }
                        const parentNodesNodeToAdd = workflow.getParentNodes(nodeToAdd);
                        if (parentNodesNodeToAdd.includes(parentNodeName) &&
                            nodeSuccessData[outputIndex].length === 0) {
                            nodeToAdd = undefined;
                        }
                        if (nodeToAdd === undefined) {
                            continue;
                        }
                        let addEmptyItem = false;
                        if (workflow.connectionsByDestinationNode[nodeToAdd] === undefined) {
                            addEmptyItem = true;
                        }
                        else if (this.incomingConnectionIsEmpty(this.runExecutionData.resultData.runData, workflow.connectionsByDestinationNode[nodeToAdd].main[0] ?? [], runIndex)) {
                            addEmptyItem = true;
                        }
                        if (addEmptyItem) {
                            this.runExecutionData.executionData.nodeExecutionStack[enqueueFn]({
                                node: workflow.getNode(nodeToAdd),
                                data: {
                                    main: [
                                        [
                                            {
                                                json: {},
                                            },
                                        ],
                                    ],
                                },
                                source: {
                                    main: [
                                        {
                                            previousNode: parentNodeName,
                                            previousNodeOutput: outputIndex || undefined,
                                            previousNodeRun: runIndex || undefined,
                                        },
                                    ],
                                },
                            });
                        }
                    }
                }
            }
        }
        let connectionDataArray = (0, get_1.default)(this.runExecutionData, [
            'executionData',
            'waitingExecution',
            connectionData.node,
            waitingNodeIndex,
            n8n_workflow_1.NodeConnectionTypes.Main,
        ], null);
        if (connectionDataArray === null) {
            connectionDataArray = [];
            for (let i = connectionData.index; i >= 0; i--) {
                connectionDataArray[i] = null;
            }
        }
        if (nodeSuccessData === null) {
            connectionDataArray[connectionData.index] = null;
        }
        else {
            connectionDataArray[connectionData.index] = nodeSuccessData[outputIndex];
        }
        if (stillDataMissing) {
            waitingNodeIndex = waitingNodeIndex;
            const waitingExecutionSource = this.runExecutionData.executionData.waitingExecutionSource[connectionData.node][waitingNodeIndex].main;
            this.prepareWaitingToExecution(connectionData.node, workflow.connectionsByDestinationNode[connectionData.node].main.length, waitingNodeIndex);
            this.runExecutionData.executionData.waitingExecution[connectionData.node][waitingNodeIndex] =
                {
                    main: connectionDataArray,
                };
            this.runExecutionData.executionData.waitingExecutionSource[connectionData.node][waitingNodeIndex].main = waitingExecutionSource;
        }
        else {
            this.runExecutionData.executionData.nodeExecutionStack[enqueueFn]({
                node: workflow.nodes[connectionData.node],
                data: {
                    main: connectionDataArray,
                },
                source: {
                    main: [
                        {
                            previousNode: parentNodeName,
                            previousNodeOutput: outputIndex || undefined,
                            previousNodeRun: runIndex || undefined,
                        },
                    ],
                },
            });
        }
    }
    checkReadyForExecution(workflow, inputData = {}) {
        const workflowIssues = {};
        let checkNodes = [];
        if (inputData.destinationNode) {
            checkNodes = workflow.getParentNodes(inputData.destinationNode);
            checkNodes.push(inputData.destinationNode);
        }
        else if (inputData.startNode) {
            checkNodes = workflow.getChildNodes(inputData.startNode);
            checkNodes.push(inputData.startNode);
        }
        for (const nodeName of checkNodes) {
            let nodeIssues = null;
            const node = workflow.nodes[nodeName];
            if (node.disabled === true) {
                continue;
            }
            const nodeType = workflow.nodeTypes.getByNameAndVersion(node.type, node.typeVersion);
            if (nodeType === undefined) {
                nodeIssues = {
                    typeUnknown: true,
                };
            }
            else {
                nodeIssues = n8n_workflow_1.NodeHelpers.getNodeParametersIssues(nodeType.description.properties, node, nodeType.description, inputData.pinDataNodeNames);
            }
            if (nodeIssues !== null) {
                workflowIssues[node.name] = nodeIssues;
            }
        }
        if (Object.keys(workflowIssues).length === 0) {
            return null;
        }
        return workflowIssues;
    }
    getCustomOperation(node, type) {
        if (!type.customOperations)
            return undefined;
        if (!node.parameters)
            return undefined;
        const { customOperations } = type;
        const { resource, operation } = node.parameters;
        if (typeof resource !== 'string' || typeof operation !== 'string')
            return undefined;
        if (!customOperations[resource] || !customOperations[resource][operation])
            return undefined;
        const customOperation = customOperations[resource][operation];
        return customOperation;
    }
    async runNode(workflow, executionData, runExecutionData, runIndex, additionalData, mode, abortSignal) {
        const { node } = executionData;
        let inputData = executionData.data;
        if (node.disabled === true) {
            if (inputData.hasOwnProperty('main') && inputData.main.length > 0) {
                if (inputData.main[0] === null) {
                    return { data: undefined };
                }
                return { data: [inputData.main[0]] };
            }
            return { data: undefined };
        }
        const nodeType = workflow.nodeTypes.getByNameAndVersion(node.type, node.typeVersion);
        const isDeclarativeNode = nodeType.description.requestDefaults !== undefined;
        const customOperation = this.getCustomOperation(node, nodeType);
        let connectionInputData = [];
        if (nodeType.execute ||
            customOperation ||
            (!nodeType.poll && !nodeType.trigger && !nodeType.webhook)) {
            if (inputData.main?.length > 0) {
                connectionInputData = inputData.main[0];
            }
            const forceInputNodeExecution = workflow.settings.executionOrder !== 'v1';
            if (!forceInputNodeExecution) {
                for (const mainData of inputData.main) {
                    if (mainData?.length) {
                        connectionInputData = mainData;
                        break;
                    }
                }
            }
            if (connectionInputData.length === 0) {
                return { data: undefined };
            }
        }
        if (runExecutionData.resultData.lastNodeExecuted === node.name &&
            runExecutionData.resultData.error !== undefined) {
            if (runExecutionData.resultData.error.name === 'NodeOperationError' ||
                runExecutionData.resultData.error.name === 'NodeApiError') {
                throw runExecutionData.resultData.error;
            }
            const error = new Error(runExecutionData.resultData.error.message);
            error.stack = runExecutionData.resultData.error.stack;
            throw error;
        }
        if (node.executeOnce === true) {
            const newInputData = {};
            for (const connectionType of Object.keys(inputData)) {
                newInputData[connectionType] = inputData[connectionType].map((input) => {
                    return input && input.slice(0, 1);
                });
            }
            inputData = newInputData;
        }
        if (nodeType.execute || customOperation) {
            const closeFunctions = [];
            const context = new node_execution_context_1.ExecuteContext(workflow, node, additionalData, mode, runExecutionData, runIndex, connectionInputData, inputData, executionData, closeFunctions, abortSignal);
            let data;
            if (customOperation) {
                data = await customOperation.call(context);
            }
            else if (nodeType.execute) {
                data =
                    nodeType instanceof n8n_workflow_1.Node
                        ? await nodeType.execute(context)
                        : await nodeType.execute.call(context);
            }
            const closeFunctionsResults = await Promise.allSettled(closeFunctions.map(async (fn) => await fn()));
            const closingErrors = closeFunctionsResults
                .filter((result) => result.status === 'rejected')
                .map((result) => result.reason);
            if (closingErrors.length > 0) {
                if (closingErrors[0] instanceof Error)
                    throw closingErrors[0];
                throw new n8n_workflow_1.ApplicationError("Error on execution node's close function(s)", {
                    extra: { nodeName: node.name },
                    tags: { nodeType: node.type },
                    cause: closingErrors,
                });
            }
            return { data, hints: context.hints };
        }
        else if (nodeType.poll) {
            if (mode === 'manual') {
                const context = new node_execution_context_1.PollContext(workflow, node, additionalData, mode, 'manual');
                return { data: await nodeType.poll.call(context) };
            }
            return { data: inputData.main };
        }
        else if (nodeType.trigger) {
            if (mode === 'manual') {
                const triggerResponse = await di_1.Container.get(triggers_and_pollers_1.TriggersAndPollers).runTrigger(workflow, node, NodeExecuteFunctions.getExecuteTriggerFunctions, additionalData, mode, 'manual');
                if (triggerResponse === undefined) {
                    return { data: null };
                }
                let closeFunction;
                if (triggerResponse.closeFunction) {
                    closeFunction = triggerResponse.closeFunction;
                    abortSignal?.addEventListener('abort', closeFunction);
                }
                if (triggerResponse.manualTriggerFunction !== undefined) {
                    await triggerResponse.manualTriggerFunction();
                }
                const response = await triggerResponse.manualTriggerResponse;
                if (response.length === 0) {
                    return { data: null, closeFunction };
                }
                return { data: response, closeFunction };
            }
            return { data: inputData.main };
        }
        else if (nodeType.webhook && !isDeclarativeNode) {
            return { data: inputData.main };
        }
        else {
            const context = new node_execution_context_1.ExecuteContext(workflow, node, additionalData, mode, runExecutionData, runIndex, connectionInputData, inputData, executionData, []);
            const routingNode = new routing_node_1.RoutingNode(context, nodeType);
            const data = await routingNode.runNode();
            return { data };
        }
    }
    processRunExecutionData(workflow) {
        n8n_workflow_1.LoggerProxy.debug('Workflow execution started', { workflowId: workflow.id });
        const startedAt = new Date();
        const forceInputNodeExecution = this.forceInputNodeExecution(workflow);
        this.status = 'running';
        const { hooks, executionId } = this.additionalData;
        assert.ok(hooks, 'Failed to run workflow due to missing execution lifecycle hooks');
        if (!this.runExecutionData.executionData) {
            throw new n8n_workflow_1.ApplicationError('Failed to run workflow due to missing execution data', {
                extra: {
                    workflowId: workflow.id,
                    executionId,
                    mode: this.mode,
                },
            });
        }
        const startNode = this.runExecutionData.executionData.nodeExecutionStack.at(0)?.node.name;
        let destinationNode;
        if (this.runExecutionData.startData && this.runExecutionData.startData.destinationNode) {
            destinationNode = this.runExecutionData.startData.destinationNode;
        }
        const pinDataNodeNames = Object.keys(this.runExecutionData.resultData.pinData ?? {});
        const workflowIssues = this.checkReadyForExecution(workflow, {
            startNode,
            destinationNode,
            pinDataNodeNames,
        });
        if (workflowIssues !== null) {
            throw new workflow_has_issues_error_1.WorkflowHasIssuesError();
        }
        let executionData;
        let executionError;
        let executionNode;
        let runIndex;
        if (this.runExecutionData.startData === undefined) {
            this.runExecutionData.startData = {};
        }
        if (this.runExecutionData.waitTill) {
            const lastNodeExecuted = this.runExecutionData.resultData.lastNodeExecuted;
            this.runExecutionData.executionData.nodeExecutionStack[0].node.disabled = true;
            this.runExecutionData.waitTill = undefined;
            this.runExecutionData.resultData.runData[lastNodeExecuted].pop();
        }
        let currentExecutionTry = '';
        let lastExecutionTry = '';
        let closeFunction;
        return new p_cancelable_1.default(async (resolve, _reject, onCancel) => {
            (0, events_1.setMaxListeners)(Infinity, this.abortController.signal);
            onCancel.shouldReject = false;
            onCancel(() => {
                this.status = 'canceled';
                this.abortController.abort();
                const fullRunData = this.getFullRunData(startedAt);
                void hooks.runHook('workflowExecuteAfter', [fullRunData]);
            });
            const returnPromise = (async () => {
                try {
                    if (!this.additionalData.restartExecutionId) {
                        await hooks.runHook('workflowExecuteBefore', [workflow, this.runExecutionData]);
                    }
                }
                catch (error) {
                    const e = error;
                    executionError = {
                        ...e,
                        message: e.message,
                        stack: e.stack,
                    };
                    executionData = this.runExecutionData.executionData.nodeExecutionStack[0];
                    const taskData = {
                        startTime: Date.now(),
                        executionIndex: 0,
                        executionTime: 0,
                        data: {
                            main: executionData.data.main,
                        },
                        source: [],
                        executionStatus: 'error',
                        hints: [],
                    };
                    this.runExecutionData.resultData = {
                        runData: {
                            [executionData.node.name]: [taskData],
                        },
                        lastNodeExecuted: executionData.node.name,
                        error: executionError,
                    };
                    throw error;
                }
                executionLoop: while (this.runExecutionData.executionData.nodeExecutionStack.length !== 0) {
                    if (this.additionalData.executionTimeoutTimestamp !== undefined &&
                        Date.now() >= this.additionalData.executionTimeoutTimestamp) {
                        this.status = 'canceled';
                    }
                    if (this.status === 'canceled') {
                        return;
                    }
                    let nodeSuccessData = null;
                    executionError = undefined;
                    executionData =
                        this.runExecutionData.executionData.nodeExecutionStack.shift();
                    executionNode = executionData.node;
                    const taskStartedData = {
                        startTime: Date.now(),
                        executionIndex: this.additionalData.currentNodeExecutionIndex++,
                        source: !executionData.source ? [] : executionData.source.main,
                        hints: [],
                    };
                    const newTaskDataConnections = {};
                    for (const connectionType of Object.keys(executionData.data)) {
                        newTaskDataConnections[connectionType] = executionData.data[connectionType].map((input, inputIndex) => {
                            if (input === null) {
                                return input;
                            }
                            return input.map((item, itemIndex) => {
                                return {
                                    ...item,
                                    pairedItem: {
                                        item: itemIndex,
                                        input: inputIndex || undefined,
                                    },
                                };
                            });
                        });
                    }
                    executionData.data = newTaskDataConnections;
                    runIndex = 0;
                    if (this.runExecutionData.resultData.runData.hasOwnProperty(executionNode.name)) {
                        runIndex = this.runExecutionData.resultData.runData[executionNode.name].length;
                    }
                    currentExecutionTry = `${executionNode.name}:${runIndex}`;
                    if (currentExecutionTry === lastExecutionTry) {
                        throw new n8n_workflow_1.ApplicationError('Stopped execution because it seems to be in an endless loop');
                    }
                    if (this.runExecutionData.startData.runNodeFilter !== undefined &&
                        this.runExecutionData.startData.runNodeFilter.indexOf(executionNode.name) === -1) {
                        continue;
                    }
                    const hasInputData = this.ensureInputData(workflow, executionNode, executionData);
                    if (!hasInputData) {
                        lastExecutionTry = currentExecutionTry;
                        continue executionLoop;
                    }
                    n8n_workflow_1.LoggerProxy.debug(`Start executing node "${executionNode.name}"`, {
                        node: executionNode.name,
                        workflowId: workflow.id,
                    });
                    await hooks.runHook('nodeExecuteBefore', [executionNode.name, taskStartedData]);
                    let maxTries = 1;
                    if (executionData.node.retryOnFail === true) {
                        maxTries = Math.min(5, Math.max(2, executionData.node.maxTries || 3));
                    }
                    let waitBetweenTries = 0;
                    if (executionData.node.retryOnFail === true) {
                        waitBetweenTries = Math.min(5000, Math.max(0, executionData.node.waitBetweenTries || 1000));
                    }
                    for (let tryIndex = 0; tryIndex < maxTries; tryIndex++) {
                        try {
                            if (tryIndex !== 0) {
                                executionError = undefined;
                                if (waitBetweenTries !== 0) {
                                    await new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve(undefined);
                                        }, waitBetweenTries);
                                    });
                                }
                            }
                            const { pinData } = this.runExecutionData.resultData;
                            if (pinData && !executionNode.disabled && pinData[executionNode.name] !== undefined) {
                                const nodePinData = pinData[executionNode.name];
                                nodeSuccessData = [nodePinData];
                            }
                            else {
                                n8n_workflow_1.LoggerProxy.debug(`Running node "${executionNode.name}" started`, {
                                    node: executionNode.name,
                                    workflowId: workflow.id,
                                });
                                let runNodeData = await this.runNode(workflow, executionData, this.runExecutionData, runIndex, this.additionalData, this.mode, this.abortController.signal);
                                nodeSuccessData = runNodeData.data;
                                const didContinueOnFail = nodeSuccessData?.[0]?.[0]?.json?.error !== undefined;
                                while (didContinueOnFail && tryIndex !== maxTries - 1) {
                                    await (0, n8n_workflow_1.sleep)(waitBetweenTries);
                                    runNodeData = await this.runNode(workflow, executionData, this.runExecutionData, runIndex, this.additionalData, this.mode, this.abortController.signal);
                                    tryIndex++;
                                }
                                if (runNodeData.hints?.length) {
                                    taskStartedData.hints.push(...runNodeData.hints);
                                }
                                if (nodeSuccessData && executionData.node.onError === 'continueErrorOutput') {
                                    this.handleNodeErrorOutput(workflow, executionData, nodeSuccessData, runIndex);
                                }
                                if (runNodeData.closeFunction) {
                                    closeFunction = runNodeData.closeFunction();
                                }
                            }
                            n8n_workflow_1.LoggerProxy.debug(`Running node "${executionNode.name}" finished successfully`, {
                                node: executionNode.name,
                                workflowId: workflow.id,
                            });
                            nodeSuccessData = this.assignPairedItems(nodeSuccessData, executionData);
                            if (!nodeSuccessData?.[0]?.[0]) {
                                if (executionData.node.alwaysOutputData === true) {
                                    const pairedItem = [];
                                    executionData.data.main.forEach((inputData, inputIndex) => {
                                        if (!inputData) {
                                            return;
                                        }
                                        inputData.forEach((_item, itemIndex) => {
                                            pairedItem.push({
                                                item: itemIndex,
                                                input: inputIndex,
                                            });
                                        });
                                    });
                                    nodeSuccessData ??= [];
                                    nodeSuccessData[0] = [
                                        {
                                            json: {},
                                            pairedItem,
                                        },
                                    ];
                                }
                            }
                            if (nodeSuccessData === null && !this.runExecutionData.waitTill) {
                                continue executionLoop;
                            }
                            break;
                        }
                        catch (error) {
                            this.runExecutionData.resultData.lastNodeExecuted = executionData.node.name;
                            let toReport;
                            if (error instanceof n8n_workflow_1.ApplicationError) {
                                if (error.cause instanceof Error)
                                    toReport = error.cause;
                            }
                            else {
                                toReport = error;
                            }
                            if (toReport) {
                                di_1.Container.get(error_reporter_1.ErrorReporter).error(toReport, {
                                    extra: {
                                        nodeName: executionNode.name,
                                        nodeType: executionNode.type,
                                        nodeVersion: executionNode.typeVersion,
                                        workflowId: workflow.id,
                                    },
                                });
                            }
                            const e = error;
                            executionError = { ...e, message: e.message, stack: e.stack };
                            n8n_workflow_1.LoggerProxy.debug(`Running node "${executionNode.name}" finished with error`, {
                                node: executionNode.name,
                                workflowId: workflow.id,
                            });
                        }
                    }
                    if (!this.runExecutionData.resultData.runData.hasOwnProperty(executionNode.name)) {
                        this.runExecutionData.resultData.runData[executionNode.name] = [];
                    }
                    const taskData = {
                        ...taskStartedData,
                        executionTime: Date.now() - taskStartedData.startTime,
                        metadata: executionData.metadata,
                        executionStatus: this.runExecutionData.waitTill ? 'waiting' : 'success',
                    };
                    if (executionError !== undefined) {
                        taskData.error = executionError;
                        taskData.executionStatus = 'error';
                        if (executionData.node.continueOnFail === true ||
                            ['continueRegularOutput', 'continueErrorOutput'].includes(executionData.node.onError || '')) {
                            if (executionData.data.hasOwnProperty('main') && executionData.data.main.length > 0) {
                                if (executionData.data.main[0] !== null) {
                                    nodeSuccessData = [executionData.data.main[0]];
                                }
                            }
                        }
                        else {
                            this.runExecutionData.resultData.runData[executionNode.name].push(taskData);
                            this.runExecutionData.executionData.nodeExecutionStack.unshift(executionData);
                            if (!this.isCancelled) {
                                await hooks.runHook('nodeExecuteAfter', [
                                    executionNode.name,
                                    taskData,
                                    this.runExecutionData,
                                ]);
                            }
                            break;
                        }
                    }
                    for (const execution of nodeSuccessData) {
                        for (const lineResult of execution) {
                            if (lineResult.json !== undefined &&
                                lineResult.json.$error !== undefined &&
                                lineResult.json.$json !== undefined) {
                                lineResult.error = lineResult.json.$error;
                                lineResult.json = {
                                    error: lineResult.json.$error.message,
                                };
                            }
                            else if (lineResult.error !== undefined) {
                                lineResult.json = { error: lineResult.error.message };
                            }
                        }
                    }
                    taskData.data = {
                        main: nodeSuccessData,
                    };
                    if (executionNode.rewireOutputLogTo) {
                        taskData.data = {
                            [executionNode.rewireOutputLogTo]: nodeSuccessData,
                        };
                    }
                    this.runExecutionData.resultData.runData[executionNode.name].push(taskData);
                    if (this.runExecutionData.waitTill) {
                        await hooks.runHook('nodeExecuteAfter', [
                            executionNode.name,
                            taskData,
                            this.runExecutionData,
                        ]);
                        this.runExecutionData.executionData.nodeExecutionStack.unshift(executionData);
                        break;
                    }
                    if (this.runExecutionData.startData &&
                        this.runExecutionData.startData.destinationNode &&
                        this.runExecutionData.startData.destinationNode === executionNode.name) {
                        await hooks.runHook('nodeExecuteAfter', [
                            executionNode.name,
                            taskData,
                            this.runExecutionData,
                        ]);
                        continue;
                    }
                    if (workflow.connectionsBySourceNode.hasOwnProperty(executionNode.name)) {
                        if (workflow.connectionsBySourceNode[executionNode.name].hasOwnProperty('main')) {
                            let outputIndex;
                            let connectionData;
                            const nodesToAdd = [];
                            for (outputIndex in workflow.connectionsBySourceNode[executionNode.name].main) {
                                if (!workflow.connectionsBySourceNode[executionNode.name].main.hasOwnProperty(outputIndex)) {
                                    continue;
                                }
                                for (connectionData of workflow.connectionsBySourceNode[executionNode.name].main[outputIndex] ?? []) {
                                    if (!workflow.nodes.hasOwnProperty(connectionData.node)) {
                                        throw new n8n_workflow_1.ApplicationError('Destination node not found', {
                                            extra: {
                                                sourceNodeName: executionNode.name,
                                                destinationNodeName: connectionData.node,
                                            },
                                        });
                                    }
                                    if (nodeSuccessData[outputIndex] &&
                                        (nodeSuccessData[outputIndex].length !== 0 ||
                                            (connectionData.index > 0 && forceInputNodeExecution))) {
                                        if (workflow.settings.executionOrder === 'v1') {
                                            const nodeToAdd = workflow.getNode(connectionData.node);
                                            nodesToAdd.push({
                                                position: nodeToAdd?.position || [0, 0],
                                                connection: connectionData,
                                                outputIndex: parseInt(outputIndex, 10),
                                            });
                                        }
                                        else {
                                            this.addNodeToBeExecuted(workflow, connectionData, parseInt(outputIndex, 10), executionNode.name, nodeSuccessData, runIndex);
                                        }
                                    }
                                }
                            }
                            if (workflow.settings.executionOrder === 'v1') {
                                nodesToAdd.sort((a, b) => {
                                    if (a.position[1] < b.position[1]) {
                                        return 1;
                                    }
                                    if (a.position[1] > b.position[1]) {
                                        return -1;
                                    }
                                    if (a.position[0] > b.position[0]) {
                                        return -1;
                                    }
                                    return 0;
                                });
                                for (const nodeData of nodesToAdd) {
                                    this.addNodeToBeExecuted(workflow, nodeData.connection, nodeData.outputIndex, executionNode.name, nodeSuccessData, runIndex);
                                }
                            }
                        }
                    }
                    await hooks.runHook('nodeExecuteAfter', [
                        executionNode.name,
                        taskData,
                        this.runExecutionData,
                    ]);
                    let waitingNodes = Object.keys(this.runExecutionData.executionData.waitingExecution);
                    if (this.runExecutionData.executionData.nodeExecutionStack.length === 0 &&
                        waitingNodes.length) {
                        for (let i = 0; i < waitingNodes.length; i++) {
                            const nodeName = waitingNodes[i];
                            const checkNode = workflow.getNode(nodeName);
                            if (!checkNode) {
                                continue;
                            }
                            const nodeType = workflow.nodeTypes.getByNameAndVersion(checkNode.type, checkNode.typeVersion);
                            let requiredInputs = workflow.settings.executionOrder === 'v1'
                                ? nodeType.description.requiredInputs
                                : undefined;
                            if (requiredInputs !== undefined) {
                                if (typeof requiredInputs === 'string') {
                                    requiredInputs = workflow.expression.getSimpleParameterValue(checkNode, requiredInputs, this.mode, { $version: checkNode.typeVersion }, undefined, []);
                                }
                                if ((requiredInputs !== undefined &&
                                    Array.isArray(requiredInputs) &&
                                    requiredInputs.length === nodeType.description.inputs.length) ||
                                    requiredInputs === nodeType.description.inputs.length) {
                                    continue;
                                }
                            }
                            const parentNodes = workflow.getParentNodes(nodeName);
                            const parentIsWaiting = parentNodes.some((value) => waitingNodes.includes(value));
                            if (parentIsWaiting) {
                                continue;
                            }
                            const runIndexes = Object.keys(this.runExecutionData.executionData.waitingExecution[nodeName]).sort();
                            const firstRunIndex = parseInt(runIndexes[0]);
                            const inputsWithData = this.runExecutionData
                                .executionData.waitingExecution[nodeName][firstRunIndex].main.map((data, index) => data === null ? null : index)
                                .filter((data) => data !== null);
                            if (requiredInputs !== undefined) {
                                if (Array.isArray(requiredInputs)) {
                                    let inputDataMissing = false;
                                    for (const requiredInput of requiredInputs) {
                                        if (!inputsWithData.includes(requiredInput)) {
                                            inputDataMissing = true;
                                            break;
                                        }
                                    }
                                    if (inputDataMissing) {
                                        continue;
                                    }
                                }
                                else {
                                    if (inputsWithData.length < requiredInputs) {
                                        continue;
                                    }
                                }
                            }
                            const taskDataMain = this.runExecutionData.executionData.waitingExecution[nodeName][firstRunIndex].main.map((data) => {
                                return data === null ? [] : data;
                            });
                            if (taskDataMain.filter((data) => data.length).length !== 0) {
                                if (taskDataMain.length < nodeType.description.inputs.length) {
                                    for (; taskDataMain.length < nodeType.description.inputs.length;) {
                                        taskDataMain.push([]);
                                    }
                                }
                                this.runExecutionData.executionData.nodeExecutionStack.push({
                                    node: workflow.nodes[nodeName],
                                    data: {
                                        main: taskDataMain,
                                    },
                                    source: this.runExecutionData.executionData.waitingExecutionSource[nodeName][firstRunIndex],
                                });
                            }
                            delete this.runExecutionData.executionData.waitingExecution[nodeName][firstRunIndex];
                            delete this.runExecutionData.executionData.waitingExecutionSource[nodeName][firstRunIndex];
                            if (Object.keys(this.runExecutionData.executionData.waitingExecution[nodeName])
                                .length === 0) {
                                delete this.runExecutionData.executionData.waitingExecution[nodeName];
                                delete this.runExecutionData.executionData.waitingExecutionSource[nodeName];
                            }
                            if (taskDataMain.filter((data) => data.length).length !== 0) {
                                break;
                            }
                            else {
                                waitingNodes = Object.keys(this.runExecutionData.executionData.waitingExecution);
                                i = -1;
                            }
                        }
                    }
                }
                return;
            })()
                .then(async () => {
                if (this.status === 'canceled' && executionError === undefined) {
                    return await this.processSuccessExecution(startedAt, workflow, new n8n_workflow_1.ExecutionCancelledError(this.additionalData.executionId ?? 'unknown'), closeFunction);
                }
                return await this.processSuccessExecution(startedAt, workflow, executionError, closeFunction);
            })
                .catch(async (error) => {
                const fullRunData = this.getFullRunData(startedAt);
                fullRunData.data.resultData.error = {
                    ...error,
                    message: error.message,
                    stack: error.stack,
                };
                let newStaticData;
                if (workflow.staticData.__dataChanged === true) {
                    newStaticData = workflow.staticData;
                }
                this.moveNodeMetadata();
                await hooks.runHook('workflowExecuteAfter', [fullRunData, newStaticData]).catch((error) => {
                    console.error('There was a problem running hook "workflowExecuteAfter"', error);
                });
                if (closeFunction) {
                    try {
                        await closeFunction;
                    }
                    catch (errorClose) {
                        n8n_workflow_1.LoggerProxy.error(`There was a problem deactivating trigger of workflow "${workflow.id}": "${errorClose.message}"`, {
                            workflowId: workflow.id,
                        });
                    }
                }
                return fullRunData;
            });
            return await returnPromise.then(resolve);
        });
    }
    ensureInputData(workflow, executionNode, executionData) {
        const inputConnections = workflow.connectionsByDestinationNode[executionNode.name]?.main ?? [];
        for (let connectionIndex = 0; connectionIndex < inputConnections.length; connectionIndex++) {
            const highestNodes = workflow.getHighestNode(executionNode.name, connectionIndex);
            if (highestNodes.length === 0) {
                return true;
            }
            if (!executionData.data.hasOwnProperty('main')) {
                this.runExecutionData.executionData.nodeExecutionStack.push(executionData);
                return false;
            }
            if (this.forceInputNodeExecution(workflow)) {
                if (executionData.data.main.length < connectionIndex ||
                    executionData.data.main[connectionIndex] === null) {
                    this.runExecutionData.executionData.nodeExecutionStack.push(executionData);
                    return false;
                }
            }
        }
        return true;
    }
    async processSuccessExecution(startedAt, workflow, executionError, closeFunction) {
        const fullRunData = this.getFullRunData(startedAt);
        if (executionError !== undefined) {
            n8n_workflow_1.LoggerProxy.debug('Workflow execution finished with error', {
                error: executionError,
                workflowId: workflow.id,
            });
            fullRunData.data.resultData.error = {
                ...executionError,
                message: executionError.message,
                stack: executionError.stack,
            };
            if (executionError.message?.includes('canceled')) {
                fullRunData.status = 'canceled';
            }
        }
        else if (this.runExecutionData.waitTill) {
            n8n_workflow_1.LoggerProxy.debug(`Workflow execution will wait until ${this.runExecutionData.waitTill}`, {
                workflowId: workflow.id,
            });
            fullRunData.waitTill = this.runExecutionData.waitTill;
            fullRunData.status = 'waiting';
        }
        else {
            n8n_workflow_1.LoggerProxy.debug('Workflow execution finished successfully', { workflowId: workflow.id });
            fullRunData.finished = true;
            fullRunData.status = 'success';
        }
        let newStaticData;
        if (workflow.staticData.__dataChanged === true) {
            newStaticData = workflow.staticData;
        }
        this.moveNodeMetadata();
        if (!this.isCancelled) {
            await this.additionalData.hooks?.runHook('workflowExecuteAfter', [
                fullRunData,
                newStaticData,
            ]);
        }
        if (closeFunction) {
            try {
                await closeFunction;
            }
            catch (error) {
                n8n_workflow_1.LoggerProxy.error(`There was a problem deactivating trigger of workflow "${workflow.id}": "${error.message}"`, {
                    workflowId: workflow.id,
                });
            }
        }
        return fullRunData;
    }
    getFullRunData(startedAt) {
        return {
            data: this.runExecutionData,
            mode: this.mode,
            startedAt,
            stoppedAt: new Date(),
            status: this.status,
        };
    }
    handleNodeErrorOutput(workflow, executionData, nodeSuccessData, runIndex) {
        const nodeType = workflow.nodeTypes.getByNameAndVersion(executionData.node.type, executionData.node.typeVersion);
        const outputs = n8n_workflow_1.NodeHelpers.getNodeOutputs(workflow, executionData.node, nodeType.description);
        const outputTypes = n8n_workflow_1.NodeHelpers.getConnectionTypes(outputs);
        const mainOutputTypes = outputTypes.filter((output) => output === n8n_workflow_1.NodeConnectionTypes.Main);
        const errorItems = [];
        const closeFunctions = [];
        const executeFunctions = new node_execution_context_1.ExecuteContext(workflow, executionData.node, this.additionalData, this.mode, this.runExecutionData, runIndex, [], executionData.data, executionData, closeFunctions, this.abortController.signal);
        const dataProxy = executeFunctions.getWorkflowDataProxy(0);
        for (let outputIndex = 0; outputIndex < mainOutputTypes.length - 1; outputIndex++) {
            const successItems = [];
            const items = nodeSuccessData[outputIndex]?.length ? nodeSuccessData[outputIndex] : [];
            while (items.length) {
                const item = items.shift();
                if (item === undefined) {
                    continue;
                }
                let errorData;
                if (item.error) {
                    errorData = item.error;
                    item.error = undefined;
                }
                else if (item.json.error && Object.keys(item.json).length === 1) {
                    errorData = item.json.error;
                }
                else if (item.json.error && item.json.message && Object.keys(item.json).length === 2) {
                    errorData = item.json.error;
                }
                if (errorData) {
                    const pairedItemData = item.pairedItem && typeof item.pairedItem === 'object'
                        ? Array.isArray(item.pairedItem)
                            ? item.pairedItem[0]
                            : item.pairedItem
                        : undefined;
                    if (executionData.source === null || pairedItemData === undefined) {
                        errorItems.push(item);
                    }
                    else {
                        const pairedItemInputIndex = pairedItemData.input || 0;
                        const sourceData = executionData.source[n8n_workflow_1.NodeConnectionTypes.Main][pairedItemInputIndex];
                        const constPairedItem = dataProxy.$getPairedItem(sourceData.previousNode, sourceData, pairedItemData);
                        if (constPairedItem === null) {
                            errorItems.push(item);
                        }
                        else {
                            errorItems.push({
                                ...item,
                                json: {
                                    ...constPairedItem.json,
                                    ...item.json,
                                },
                            });
                        }
                    }
                }
                else {
                    successItems.push(item);
                }
            }
            nodeSuccessData[outputIndex] = successItems;
        }
        nodeSuccessData[mainOutputTypes.length - 1] = errorItems;
    }
    assignPairedItems(nodeSuccessData, executionData) {
        if (nodeSuccessData?.length) {
            const isSingleInputAndOutput = executionData.data.main.length === 1 && executionData.data.main[0]?.length === 1;
            const isSameNumberOfItems = nodeSuccessData.length === 1 &&
                executionData.data.main.length === 1 &&
                executionData.data.main[0]?.length === nodeSuccessData[0].length;
            checkOutputData: for (const outputData of nodeSuccessData) {
                if (outputData === null) {
                    continue;
                }
                for (const [index, item] of outputData.entries()) {
                    if (item.pairedItem === undefined) {
                        if (isSingleInputAndOutput) {
                            item.pairedItem = {
                                item: 0,
                            };
                        }
                        else if (isSameNumberOfItems) {
                            item.pairedItem = {
                                item: index,
                            };
                        }
                        else {
                            break checkOutputData;
                        }
                    }
                }
            }
        }
        if (nodeSuccessData === undefined) {
            nodeSuccessData = null;
        }
        else {
            this.runExecutionData.resultData.lastNodeExecuted = executionData.node.name;
        }
        return nodeSuccessData;
    }
    get isCancelled() {
        return this.abortController.signal.aborted;
    }
}
exports.WorkflowExecute = WorkflowExecute;
//# sourceMappingURL=workflow-execute.js.map