"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionComposerChain = exports.connectionComposerPrompt = void 0;
const messages_1 = require("@langchain/core/messages");
const prompts_1 = require("@langchain/core/prompts");
const tools_1 = require("@langchain/core/tools");
const n8n_workflow_1 = require("n8n-workflow");
const zod_1 = require("zod");
exports.connectionComposerPrompt = new messages_1.SystemMessage(`You are an expert in creating n8n workflow connections. Your job is to create a valid n8n workflow by connecting nodes in a logical sequence.

## Your Task
Create connections between nodes that form a coherent, executable workflow based on the user's request.

## Input Format
You will receive a list of n8n nodes with their details in <node> tags:
\`\`\`
<node>
  {
    "name": "Node display name",
    "type": "n8n-nodes-base.nodeType",
    "parameters": { ... },
    "position": [x, y]
  }
</node>
\`\`\`

## n8n Connection Structure
In n8n workflows:
1. Data flows from one node to the next through connections
2. Connections are defined in the "connections" object
3. Each node's output can connect to one or more nodes' inputs
4. Each connection has a source node, target node, and IO indices

## Connection Format
\`\`\`json
{
  "connections": {
    "Source Node Display Name": {
      "main": [
        [
          {
            "node": "Target Node Display Name",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
\`\`\`

## Rules for Creating Connections
1. ALWAYS use the node "name" field (display name) for the connection references
2. Create a logical flow from trigger/input nodes to output/action nodes
3. Each node MUST connect to at least one other node (except terminal nodes)
4. Don't create loops or cycles in the workflow
5. Ensure the output data from one node is compatible with the input expected by the next node
6. For nodes with multiple outputs (like IF nodes), connect each output appropriately:
   - For IF nodes, first output (index 0) is the TRUE branch, second output (index 1) is the FALSE branch
   - For Switch nodes, each output (starting at index 0) corresponds to a different case

## Common Workflow Patterns
1. Trigger → Process → Action
2. Data Source → Filter/Transform → Destination
3. Scheduled Trigger → HTTP Request → Process Response → Send Notification
4. Conditional Branch: Previous Node → IF Node → [True Branch, False Branch]

## Output
Return ONLY a valid JSON object with the "connections" property following the structure above:
\`\`\`json
{
  "connections": {
    "NodeName1": {
      "main": [[{ "node": "NodeName2", "type": "main", "index": 0 }]]
    },
    "NodeName2": {
      "main": [
        [{ "node": "TrueBranchNode", "type": "main", "index": 0 }],
        [{ "node": "FalseBranchNode", "type": "main", "index": 0 }]
      ]
    },
    ...
  }
}
\`\`\``);
const connectionsSchema = zod_1.z.object({
    connections: zod_1.z
        .record(zod_1.z
        .string()
        .describe('The source node\'s display name exactly as specified in the node\'s "name" field'), zod_1.z
        .object({
        main: zod_1.z.array(zod_1.z.array(zod_1.z.object({
            node: zod_1.z
                .string()
                .describe('The target node\'s display name exactly as specified in the node\'s "name" field'),
            type: zod_1.z
                .literal('main')
                .describe('The connection type, always use "main" for standard n8n connections'),
            index: zod_1.z
                .number()
                .describe('Output index from the source node, typically 0 for single-output nodes, 0=true/1=false for IF nodes'),
        }))),
    })
        .describe('The connection configuration for a single source node'))
        .describe('A mapping of all connections in the workflow, where each key is a source node name'),
});
const connectionComposerTool = new tools_1.DynamicStructuredTool({
    name: 'compose_connections',
    description: "Create valid connections between n8n nodes to form a coherent, executable workflow that implements the user's request.",
    schema: connectionsSchema,
    func: async (input) => {
        return { connections: input.connections };
    },
});
const humanTemplate = '{workflowJSON}';
const chatPrompt = prompts_1.ChatPromptTemplate.fromMessages([
    exports.connectionComposerPrompt,
    prompts_1.HumanMessagePromptTemplate.fromTemplate(humanTemplate),
]);
const connectionComposerChain = (llm) => {
    if (!llm.bindTools) {
        throw new n8n_workflow_1.OperationalError("LLM doesn't support binding tools");
    }
    return chatPrompt
        .pipe(llm.bindTools([connectionComposerTool], {
        tool_choice: connectionComposerTool.name,
    }))
        .pipe((x) => {
        const toolCall = x.tool_calls?.[0];
        return (toolCall?.args).connections;
    });
};
exports.connectionComposerChain = connectionComposerChain;
//# sourceMappingURL=connection-composer.js.map