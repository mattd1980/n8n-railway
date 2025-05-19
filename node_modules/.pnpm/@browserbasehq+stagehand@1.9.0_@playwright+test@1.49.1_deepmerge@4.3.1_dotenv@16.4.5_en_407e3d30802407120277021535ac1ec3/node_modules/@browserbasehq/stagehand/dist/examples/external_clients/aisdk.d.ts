import { LanguageModel } from "ai";
import { ChatCompletion } from "openai/resources/chat/completions";
import { CreateChatCompletionOptions, LLMClient } from "../../lib/llm/LLMClient";
export declare class AISdkClient extends LLMClient {
    type: "aisdk";
    private model;
    constructor({ model }: {
        model: LanguageModel;
    });
    createChatCompletion<T = ChatCompletion>({ options, }: CreateChatCompletionOptions): Promise<T>;
}
