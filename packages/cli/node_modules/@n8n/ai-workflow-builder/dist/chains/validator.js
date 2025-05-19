"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorChain = void 0;
const messages_1 = require("@langchain/core/messages");
const prompts_1 = require("@langchain/core/prompts");
const tools_1 = require("@langchain/core/tools");
const n8n_workflow_1 = require("n8n-workflow");
const zod_1 = require("zod");
const validatorPrompt = new messages_1.SystemMessage(`You are a workflow prompt validator for n8n. You need to analyze the user's prompt and determine
if they're actually trying to build a workflow that connects different online services or automates a task.

A workflow prompt should:
- Describe an automation or integration task
- Potentially mention connecting services (like Google Sheets, Slack, etc.)
- Describe a process that could be broken down into steps
- Mention something that could be automated

Examples of VALID workflow prompts:
- "Create a workflow that sends a Slack message when a new row is added to Google Sheets"
- "I want to automatically save Gmail attachments to Dropbox"
- "Build a workflow that posts new Twitter mentions to a Discord channel"
- "When I get a new lead in my CRM, add them to my email marketing list"

Examples of INVALID workflow prompts:
- "What's the weather like today?"
- "Tell me a joke"
- "What is n8n?"
- "Help me fix my computer"
- "What time is it?"


Analyze the prompt and determine if it's a valid workflow prompt. Respond with just true or false.`);
const validatorSchema = zod_1.z.object({
    isWorkflowPrompt: zod_1.z.boolean(),
});
const validatorTool = new tools_1.DynamicStructuredTool({
    name: 'validate_prompt',
    description: 'Validate if the user prompt is a workflow prompt',
    schema: validatorSchema,
    func: async ({ isWorkflowPrompt }) => {
        return { isWorkflowPrompt };
    },
});
const humanTemplate = `
<user_prompt>
	{prompt}
</user_prompt>
`;
const chatPrompt = prompts_1.ChatPromptTemplate.fromMessages([
    validatorPrompt,
    prompts_1.HumanMessagePromptTemplate.fromTemplate(humanTemplate),
]);
const validatorChain = (llm) => {
    if (!llm.bindTools) {
        throw new n8n_workflow_1.OperationalError("LLM doesn't support binding tools");
    }
    return chatPrompt
        .pipe(llm.bindTools([validatorTool], {
        tool_choice: validatorTool.name,
    }))
        .pipe((x) => {
        const toolCall = x.tool_calls?.[0];
        return (toolCall?.args).isWorkflowPrompt;
    });
};
exports.validatorChain = validatorChain;
//# sourceMappingURL=validator.js.map