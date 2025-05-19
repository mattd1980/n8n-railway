"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anthropicClaude37Sonnet = exports.gpt41mini = exports.o4mini = void 0;
const anthropic_1 = require("@langchain/anthropic");
const openai_1 = require("@langchain/openai");
const o4mini = (config) => new openai_1.ChatOpenAI({
    modelName: 'o4-mini-2025-04-16',
    apiKey: config.apiKey,
    configuration: {
        baseURL: config.baseUrl,
        defaultHeaders: config.headers,
    },
});
exports.o4mini = o4mini;
const gpt41mini = (config) => new openai_1.ChatOpenAI({
    modelName: 'gpt-4.1-mini-2025-04-14',
    apiKey: config.apiKey,
    temperature: 0,
    configuration: {
        baseURL: config.baseUrl,
        defaultHeaders: config.headers,
    },
});
exports.gpt41mini = gpt41mini;
const anthropicClaude37Sonnet = (config) => new anthropic_1.ChatAnthropic({
    modelName: 'claude-3-7-sonnet-20250219',
    apiKey: config.apiKey,
    temperature: 0,
    maxTokens: 16000,
    anthropicApiUrl: config.baseUrl,
    clientOptions: {
        defaultHeaders: config.headers,
    },
});
exports.anthropicClaude37Sonnet = anthropicClaude37Sonnet;
//# sourceMappingURL=llm-config.js.map