import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { SystemMessage } from '@langchain/core/messages';
export declare const nodeSelectorPrompt: SystemMessage;
export declare const nodesSelectionChain: (llm: BaseChatModel) => import("@langchain/core/runnables").Runnable<any, {
    node: string;
    score: number;
    reasoning: string;
}[], import("@langchain/core/runnables").RunnableConfig<Record<string, any>>>;
