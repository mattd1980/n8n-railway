import { type ClientOptions } from "openai";
import type { ChatCompletion } from "openai/resources/chat";
import type { LLMCache } from "../../lib/cache/LLMCache";
import { CreateChatCompletionOptions, LLMClient } from "../../lib/llm/LLMClient";
export declare class OllamaClient extends LLMClient {
    type: "ollama";
    private client;
    private cache;
    private enableCaching;
    clientOptions: ClientOptions;
    constructor({ enableCaching, cache, modelName, clientOptions, }: {
        enableCaching?: boolean;
        cache?: LLMCache;
        modelName?: string;
        clientOptions?: ClientOptions;
    });
    createChatCompletion<T = ChatCompletion>({ options, retries, logger, }: CreateChatCompletionOptions): Promise<T>;
}
