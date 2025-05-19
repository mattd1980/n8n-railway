import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { ChatPromptTemplate } from '@langchain/core/prompts';
export declare const nodesComposerPrompt: ChatPromptTemplate<any, any>;
export declare const nodesComposerChain: (llm: BaseChatModel) => import("@langchain/core/runnables").Runnable<any, {
    type: string;
    parameters: Record<string, any>;
    name: string;
}[], import("@langchain/core/runnables").RunnableConfig<Record<string, any>>>;
