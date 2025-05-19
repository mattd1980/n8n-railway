import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { SystemMessage } from '@langchain/core/messages';
export declare const connectionComposerPrompt: SystemMessage;
export declare const connectionComposerChain: (llm: BaseChatModel) => import("@langchain/core/runnables").Runnable<any, Record<string, {
    main: {
        type: "main";
        node: string;
        index: number;
    }[][];
}>, import("@langchain/core/runnables").RunnableConfig<Record<string, any>>>;
