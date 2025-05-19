import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { SystemMessage } from '@langchain/core/messages';
export declare const plannerPrompt: SystemMessage;
export declare const plannerChain: (llm: BaseChatModel) => import("@langchain/core/runnables").Runnable<any, string[], import("@langchain/core/runnables").RunnableConfig<Record<string, any>>>;
