import { GoogleLLM } from "@langchain/google-gauth";
/**
 * Integration with a Google Vertex AI LLM using
 * the "@langchain/google-gauth" package for auth.
 */
export class VertexAI extends GoogleLLM {
    static lc_name() {
        return "VertexAI";
    }
    constructor(fields) {
        super({
            ...fields,
            platformType: "gcp",
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "llms", "vertexai"]
        });
    }
}
