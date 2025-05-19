import { type GoogleLLMInput, GoogleLLM } from "@langchain/google-gauth";
/**
 * Input to a Google Vertex AI LLM class.
 */
export interface VertexAIInput extends GoogleLLMInput {
}
/**
 * Integration with a Google Vertex AI LLM using
 * the "@langchain/google-gauth" package for auth.
 */
export declare class VertexAI extends GoogleLLM {
    lc_namespace: string[];
    static lc_name(): string;
    constructor(fields?: VertexAIInput);
}
