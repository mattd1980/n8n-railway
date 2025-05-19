"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiWorkflowBuilderService = void 0;
const dispatch_1 = require("@langchain/core/callbacks/dispatch");
const langgraph_1 = require("@langchain/langgraph");
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const ai_assistant_sdk_1 = require("@n8n_io/ai-assistant-sdk");
const n8n_workflow_1 = require("n8n-workflow");
const connection_composer_1 = require("./chains/connection-composer");
const node_selector_1 = require("./chains/node-selector");
const nodes_composer_1 = require("./chains/nodes-composer");
const planner_1 = require("./chains/planner");
const validator_1 = require("./chains/validator");
const llm_config_1 = require("./llm-config");
const workflow_state_1 = require("./workflow-state");
let AiWorkflowBuilderService = class AiWorkflowBuilderService {
    constructor(licenseService, nodeTypes, globalConfig, n8nVersion) {
        this.licenseService = licenseService;
        this.nodeTypes = nodeTypes;
        this.globalConfig = globalConfig;
        this.n8nVersion = n8nVersion;
        this.parsedNodeTypes = [];
        this.parsedNodeTypes = this.getNodeTypes();
    }
    async setupModels(user) {
        if (this.llmSimpleTask && this.llmComplexTask) {
            return;
        }
        const baseUrl = this.globalConfig.aiAssistant.baseUrl;
        if (baseUrl) {
            if (!this.client) {
                const licenseCert = await this.licenseService.loadCertStr();
                const consumerId = this.licenseService.getConsumerId();
                this.client = new ai_assistant_sdk_1.AiAssistantClient({
                    licenseCert,
                    consumerId,
                    baseUrl,
                    n8nVersion: this.n8nVersion,
                });
            }
            (0, n8n_workflow_1.assert)(this.client, 'Client not setup');
            const authHeaders = await this.client.generateApiProxyCredentials(user);
            this.llmSimpleTask = (0, llm_config_1.gpt41mini)({
                baseUrl: baseUrl + '/v1/api-proxy/openai',
                apiKey: '-',
                headers: {
                    Authorization: authHeaders.apiKey,
                },
            });
            this.llmComplexTask = (0, llm_config_1.anthropicClaude37Sonnet)({
                baseUrl: baseUrl + '/v1/api-proxy/anthropic',
                apiKey: '-',
                headers: {
                    Authorization: authHeaders.apiKey,
                },
            });
            return;
        }
        this.llmSimpleTask = (0, llm_config_1.gpt41mini)({
            apiKey: process.env.N8N_AI_OPENAI_API_KEY ?? '',
        });
        this.llmComplexTask = (0, llm_config_1.anthropicClaude37Sonnet)({
            apiKey: process.env.N8N_AI_ANTHROPIC_KEY ?? '',
        });
    }
    getNodeTypes() {
        const nodeTypesKeys = Object.keys(this.nodeTypes.getKnownTypes());
        const nodeTypes = nodeTypesKeys
            .map((nodeName) => {
            return { ...this.nodeTypes.getByNameAndVersion(nodeName).description, name: nodeName };
        })
            .filter((nodeType) => nodeType.hidden !== true);
        return nodeTypes;
    }
    isWorkflowEvent(eventName) {
        return [
            'prompt_validation',
            'generated_steps',
            'generated_nodes',
            'composed_nodes',
            'composed_connections',
            'generated_workflow_json',
        ].includes(eventName);
    }
    getAgent() {
        const validatorChainNode = async (state, config) => {
            (0, n8n_workflow_1.assert)(this.llmSimpleTask, 'LLM not setup');
            const isWorkflowPrompt = await (0, validator_1.validatorChain)(this.llmSimpleTask).invoke({
                prompt: state.prompt,
            }, config);
            if (!isWorkflowPrompt) {
                await (0, dispatch_1.dispatchCustomEvent)('prompt_validation', {
                    role: 'assistant',
                    type: 'prompt-validation',
                    isWorkflowPrompt,
                    id: Date.now().toString(),
                });
            }
            return {
                isWorkflowPrompt,
            };
        };
        const plannerChainNode = async (state, config) => {
            (0, n8n_workflow_1.assert)(this.llmComplexTask, 'LLM not setup');
            const steps = await (0, planner_1.plannerChain)(this.llmComplexTask).invoke({
                prompt: state.prompt,
            }, config);
            await (0, dispatch_1.dispatchCustomEvent)('generated_steps', {
                role: 'assistant',
                type: 'workflow-step',
                steps,
                id: Date.now().toString(),
                read: false,
            });
            return {
                steps,
            };
        };
        const nodeSelectionChainNode = async (state, config) => {
            (0, n8n_workflow_1.assert)(this.llmSimpleTask, 'LLM not setup');
            const getNodeMessage = (node) => {
                return `
					<node_name>${node.name}</node_name>
					<node_description>${node.description}</node_description>
				`;
            };
            const allowedNodes = this.parsedNodeTypes.map(getNodeMessage).join('');
            const result = await (0, node_selector_1.nodesSelectionChain)(this.llmSimpleTask).invoke({
                allowedNodes,
                prompt: state.prompt,
                steps: state.steps.join('\n'),
            }, config);
            const nodes = [...new Set(result.map((r) => r.node))];
            await (0, dispatch_1.dispatchCustomEvent)('generated_nodes', {
                role: 'assistant',
                type: 'workflow-node',
                nodes,
                id: Date.now().toString(),
                read: false,
            });
            return {
                nodes,
            };
        };
        const nodesComposerChainNode = async (state, config) => {
            (0, n8n_workflow_1.assert)(this.llmComplexTask, 'LLM not setup');
            const getLatestVersion = (nodeType) => {
                const node = this.parsedNodeTypes.find((n) => n.name === nodeType);
                if (!node) {
                    throw new n8n_workflow_1.OperationalError(`Node type not found: ${nodeType}`);
                }
                if (node.defaultVersion) {
                    return node.defaultVersion;
                }
                return typeof node.version === 'number'
                    ? node.version
                    : node.version[node.version.length - 1];
            };
            const getNodeMessage = (nodeName) => {
                const node = this.parsedNodeTypes.find((n) => n.name === nodeName);
                if (!node) {
                    throw new n8n_workflow_1.OperationalError(`Node type not found: ${nodeName}`);
                }
                return `
					<node_name>
						${node.name}
					</node_name>
					<node_description>
						${node.description}
					</node_description>
					<node_parameters>
						${JSON.stringify(node.properties)}
					</node_parameters>
				`;
            };
            const result = await (0, nodes_composer_1.nodesComposerChain)(this.llmComplexTask).invoke({
                user_workflow_prompt: state.prompt,
                nodes: state.nodes.map(getNodeMessage).join('\n\n'),
            }, config);
            const composedNodes = result.map((node, index) => {
                const version = getLatestVersion(node.type);
                return {
                    ...node,
                    position: [index * 150, 0],
                    typeVersion: version,
                };
            });
            await (0, dispatch_1.dispatchCustomEvent)('composed_nodes', {
                role: 'assistant',
                type: 'workflow-composed',
                nodes: composedNodes,
                id: Date.now().toString(),
                read: false,
            });
            return {
                workflowJSON: {
                    nodes: composedNodes,
                    connections: {},
                },
            };
        };
        const connectionComposerChainNode = async (state, config) => {
            (0, n8n_workflow_1.assert)(this.llmComplexTask, 'LLM not setup');
            const getNodeMessage = (node) => {
                return `
					<node>
						${JSON.stringify(node)}
					</node>
				`;
            };
            const connections = await (0, connection_composer_1.connectionComposerChain)(this.llmComplexTask).invoke({
                workflowJSON: state.workflowJSON.nodes.map(getNodeMessage).join('\n\n'),
            }, config);
            const workflowJSON = {
                ...state.workflowJSON,
                connections,
            };
            await (0, dispatch_1.dispatchCustomEvent)('composed_connections', {
                role: 'assistant',
                type: 'workflow-connections',
                workflowJSON,
                id: Date.now().toString(),
                read: false,
            });
            return {
                workflowJSON,
            };
        };
        async function generateWorkflowJSON(state) {
            await (0, dispatch_1.dispatchCustomEvent)('generated_workflow_json', {
                role: 'assistant',
                type: 'workflow-generated',
                codeSnippet: JSON.stringify(state.workflowJSON, null, 4),
            });
            return { workflowJSON: JSON.stringify(state.workflowJSON, null, 2) };
        }
        const workflowGraph = new langgraph_1.StateGraph(workflow_state_1.WorkflowState)
            .addNode('validator', validatorChainNode)
            .addNode('planner', plannerChainNode)
            .addNode('node_selector', nodeSelectionChainNode)
            .addNode('nodes_composer', nodesComposerChainNode)
            .addNode('connection_composer', connectionComposerChainNode)
            .addNode('finalize', generateWorkflowJSON);
        workflowGraph.addEdge(langgraph_1.START, 'validator');
        workflowGraph.addConditionalEdges('validator', (state) => {
            return state.isWorkflowPrompt ? 'planner' : langgraph_1.END;
        });
        workflowGraph.addEdge('planner', 'node_selector');
        workflowGraph.addEdge('node_selector', 'nodes_composer');
        workflowGraph.addEdge('nodes_composer', 'connection_composer');
        workflowGraph.addEdge('connection_composer', 'finalize');
        workflowGraph.addEdge('finalize', langgraph_1.END);
        return workflowGraph;
    }
    async *chat(payload, user) {
        if (!this.llmComplexTask || !this.llmSimpleTask) {
            await this.setupModels(user);
        }
        const agent = this.getAgent().compile();
        const initialState = {
            messages: [],
            prompt: payload.question,
            steps: [],
            nodes: [],
            workflowJSON: { nodes: [], connections: {} },
            isWorkflowPrompt: false,
            next: 'PLAN',
        };
        const stream = agent.streamEvents(initialState, {
            streamMode: 'custom',
            recursionLimit: 10,
            version: 'v2',
        });
        for await (const chunk of stream) {
            let messageChunk;
            if (chunk.event === 'on_custom_event') {
                if (this.isWorkflowEvent(chunk.name)) {
                    messageChunk = chunk.data;
                }
                else {
                    messageChunk = {
                        role: 'assistant',
                        type: 'intermediate-step',
                        text: chunk.data,
                        step: chunk.name,
                    };
                }
                yield { messages: [messageChunk] };
            }
        }
    }
};
exports.AiWorkflowBuilderService = AiWorkflowBuilderService;
exports.AiWorkflowBuilderService = AiWorkflowBuilderService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [Object, Object, config_1.GlobalConfig, String])
], AiWorkflowBuilderService);
//# sourceMappingURL=ai-workflow-builder.service.js.map