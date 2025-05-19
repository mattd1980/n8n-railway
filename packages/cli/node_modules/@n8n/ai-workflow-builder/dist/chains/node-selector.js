"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodesSelectionChain = exports.nodeSelectorPrompt = void 0;
const messages_1 = require("@langchain/core/messages");
const prompts_1 = require("@langchain/core/prompts");
const tools_1 = require("@langchain/core/tools");
const n8n_workflow_1 = require("n8n-workflow");
const zod_1 = require("zod");
exports.nodeSelectorPrompt = new messages_1.SystemMessage(`You are an expert in n8n workflows who selects the optimal n8n nodes to implement workflow steps.

## Your Task
For each workflow step, recommend the most appropriate n8n nodes from the allowed list.

## Input Information
- <user_request>: Original user workflow request
- <steps>: List of workflow steps to implement
- <allowed_n8n_nodes>: List of available n8n nodes with descriptions

## CRITICAL REQUIREMENTS
- ONLY recommend nodes that EXACTLY match names from the <allowed_n8n_nodes> list
- NEVER suggest nodes that are not explicitly defined in <allowed_n8n_nodes>
- ALWAYS use the COMPLETE node name as it appears in <node_name> tags (e.g., "Gmail" is NOT sufficient if the node name is "n8n-nodes-base.gmail")
- VERIFY each recommended node exists in the allowed list before including it

## Selection Criteria
1. Functionality - Node must be able to perform the required action
2. Integration - Prefer nodes that integrate directly with services mentioned in the user request
3. Efficiency - Prefer nodes that accomplish the task with minimal configuration

## Output Requirements
For the planned workflow steps, provider:
1. List of all possibly useful nodes in order of preference
2. Concise reasoning for why each node is suitable
3. Use EXACT, FULL node names from <node_name> tags
4. Pay attention to case sensitivity, e.g. "n8n-nodes-base.msql" is NOT "n8n-nodes-base.mySql"!

Remember: ONLY use nodes from the <allowed_n8n_nodes> list and ALWAYS use their FULL names exactly as provided.`);
const nodeSelectorSchema = zod_1.z.object({
    recommended_nodes: zod_1.z
        .array(zod_1.z.object({
        score: zod_1.z.number().describe('Matching score of the node for all the workflows steps'),
        node: zod_1.z
            .string()
            .describe('The full node type identifier (e.g., "n8n-nodes-base.if") from <allowed_n8n_nodes> list'),
        reasoning: zod_1.z
            .string()
            .describe('Very short explanation of why this node might be used to implement the workflow step'),
    }))
        .min(1)
        .max(20)
        .describe('Recommended n8n nodes for implementing any of the workflow steps, in order of descending preference. ONLY use nodes from the <allowed_n8n_nodes> list with EXACT full names from <node_name> tags.'),
});
const nodeSelectorTool = new tools_1.DynamicStructuredTool({
    name: 'select_n8n_nodes',
    description: 'Match each workflow step with the most appropriate n8n nodes from the allowed list, ensuring they can implement the required functionality.',
    schema: nodeSelectorSchema,
    func: async ({ recommended_nodes }) => {
        return { recommended_nodes };
    },
});
const humanTemplate = `
<user_request>
	{prompt}
</user_request>
<steps>
	{steps}
</steps>
<allowed_n8n_nodes>
	{allowedNodes}
</allowed_n8n_nodes>
`;
const chatPrompt = prompts_1.ChatPromptTemplate.fromMessages([
    exports.nodeSelectorPrompt,
    prompts_1.HumanMessagePromptTemplate.fromTemplate(humanTemplate),
]);
const nodesSelectionChain = (llm) => {
    if (!llm.bindTools) {
        throw new n8n_workflow_1.OperationalError("LLM doesn't support binding tools");
    }
    return chatPrompt
        .pipe(llm.bindTools([nodeSelectorTool], {
        tool_choice: nodeSelectorTool.name,
    }))
        .pipe((x) => {
        const toolCall = x.tool_calls?.[0];
        return (toolCall?.args).recommended_nodes;
    });
};
exports.nodesSelectionChain = nodesSelectionChain;
//# sourceMappingURL=node-selector.js.map