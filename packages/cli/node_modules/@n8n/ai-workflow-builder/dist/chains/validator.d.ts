import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
export declare const validatorChain: (llm: BaseChatModel) => import("@langchain/core/runnables").Runnable<any, boolean, import("@langchain/core/runnables").RunnableConfig<Record<string, any>>>;
