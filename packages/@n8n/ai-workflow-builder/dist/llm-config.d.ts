import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOpenAI } from '@langchain/openai';
type LLMConfig = {
    apiKey: string;
    baseUrl?: string;
    headers?: Record<string, string>;
};
export declare const o4mini: (config: LLMConfig) => ChatOpenAI<import("@langchain/openai").ChatOpenAICallOptions>;
export declare const gpt41mini: (config: LLMConfig) => ChatOpenAI<import("@langchain/openai").ChatOpenAICallOptions>;
export declare const anthropicClaude37Sonnet: (config: LLMConfig) => ChatAnthropic;
export {};
