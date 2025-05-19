"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plannerChain = exports.plannerPrompt = void 0;
const messages_1 = require("@langchain/core/messages");
const prompts_1 = require("@langchain/core/prompts");
const tools_1 = require("@langchain/core/tools");
const n8n_workflow_1 = require("n8n-workflow");
const zod_1 = require("zod");
exports.plannerPrompt = new messages_1.SystemMessage(`You are a Workflow Planner for n8n, a platform that helps users automate processes across different services and APIs.

## Your Task
Convert user requests into clear, sequential workflow steps that can be implemented with n8n nodes. ONLY include steps that are explicitly stated or directly implied in the user request.

## Guidelines
1. Analyze the user request to understand their end goal and required process
2. Break down the automation into logical steps based on complexity - simpler workflows need fewer steps, complex ones may need more
3. Focus ONLY on actions mentioned directly in the user prompt 
4. Create steps that can be mapped to n8n nodes later
5. Order steps sequentially from trigger to final action
6. Be specific about data transformations needed ONLY if mentioned in the request
7. NEVER add extra steps like storing data or sending notifications unless explicitly requested
8. Only recommend raw HTTP requests if you think there isn't a suitable n8n node

## CRITICAL REQUIREMENTS
- DO NOT add any steps not directly mentioned or implied in the user request
- DO NOT assume the user wants to store data in a database unless explicitly stated
- DO NOT assume the user wants to send notifications or emails unless explicitly stated
- DO NOT add any "nice to have" steps that aren't clearly part of the user's request
- Keep the workflow EXACTLY focused on what was requested, nothing more

## Output Format
Return ONLY a JSON object with this structure:
\`\`\`json
{
  "steps": [
    "[Brief action-oriented description]",
    "[Brief action-oriented description]",
    ...
  ]
}
\`\`\`

## Examples of Good Step Descriptions
- "Trigger when a new email arrives in Gmail inbox"
- "Filter emails to only include those with attachments"
- "Extract data from CSV attachments"
- "Transform data to required format for the API"
- "Send HTTP request to external API with extracted data"
- "Post success message to Slack channel"

IMPORTANT: Do not include HTML tags, markdown formatting, or explanations outside the JSON.`);
const planSchema = zod_1.z.object({
    steps: zod_1.z
        .array(zod_1.z
        .string()
        .describe('A clear, action-oriented description of a single workflow step. Do not include "Step N" or similar, just the action'))
        .min(1)
        .describe('An ordered list of workflow steps that, when implemented, will fulfill the user request. Each step should be concise, action-oriented, and implementable with n8n nodes.'),
});
const generatePlanTool = new tools_1.DynamicStructuredTool({
    name: 'generate_plan',
    description: 'Convert a user workflow request into a logical sequence of clear, achievable steps that can be implemented with n8n nodes.',
    schema: planSchema,
    func: async (input) => {
        return { steps: input.steps };
    },
});
const humanTemplate = '{prompt}';
const chatPrompt = prompts_1.ChatPromptTemplate.fromMessages([
    exports.plannerPrompt,
    prompts_1.HumanMessagePromptTemplate.fromTemplate(humanTemplate),
]);
const plannerChain = (llm) => {
    if (!llm.bindTools) {
        throw new n8n_workflow_1.OperationalError("LLM doesn't support binding tools");
    }
    return chatPrompt
        .pipe(llm.bindTools([generatePlanTool], {
        tool_choice: generatePlanTool.name,
    }))
        .pipe((x) => {
        const toolCall = x.tool_calls?.[0];
        return (toolCall?.args).steps;
    });
};
exports.plannerChain = plannerChain;
//# sourceMappingURL=planner.js.map