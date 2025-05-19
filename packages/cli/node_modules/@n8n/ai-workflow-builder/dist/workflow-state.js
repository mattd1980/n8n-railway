"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowState = void 0;
const langgraph_1 = require("@langchain/langgraph");
exports.WorkflowState = langgraph_1.Annotation.Root({
    messages: (0, langgraph_1.Annotation)({
        reducer: (x, y) => x.concat(y),
    }),
    prompt: (0, langgraph_1.Annotation)({ reducer: (x, y) => y ?? x ?? '' }),
    steps: (0, langgraph_1.Annotation)({ reducer: (x, y) => y ?? x ?? [] }),
    nodes: (0, langgraph_1.Annotation)({ reducer: (x, y) => y ?? x ?? [] }),
    workflowJSON: (0, langgraph_1.Annotation)({
        reducer: (x, y) => y ?? x ?? { nodes: [], connections: {} },
    }),
    isWorkflowPrompt: (0, langgraph_1.Annotation)({ reducer: (x, y) => y ?? x ?? false }),
    next: (0, langgraph_1.Annotation)({ reducer: (x, y) => y ?? x ?? langgraph_1.END, default: () => langgraph_1.END }),
});
//# sourceMappingURL=workflow-state.js.map