import type { BaseMessage } from '@langchain/core/messages';
import type { SimpleWorkflow } from './types';
export declare const WorkflowState: import("@langchain/langgraph")._INTERNAL_ANNOTATION_ROOT<{
    messages: import("@langchain/langgraph").BinaryOperatorAggregate<BaseMessage[], BaseMessage[]>;
    prompt: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
    steps: import("@langchain/langgraph").BinaryOperatorAggregate<string[], string[]>;
    nodes: import("@langchain/langgraph").BinaryOperatorAggregate<string[], string[]>;
    workflowJSON: import("@langchain/langgraph").BinaryOperatorAggregate<SimpleWorkflow, SimpleWorkflow>;
    isWorkflowPrompt: import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
    next: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
}>;
