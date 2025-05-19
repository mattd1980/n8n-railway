"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VertexAI = void 0;
const google_gauth_1 = require("@langchain/google-gauth");
/**
 * Integration with a Google Vertex AI LLM using
 * the "@langchain/google-gauth" package for auth.
 */
class VertexAI extends google_gauth_1.GoogleLLM {
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
exports.VertexAI = VertexAI;
