"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VertexAIEmbeddings = void 0;
const google_gauth_1 = require("@langchain/google-gauth");
/**
 * Integration with a Google Vertex AI embeddings model using
 * the "@langchain/google-gauth" package for auth.
 */
class VertexAIEmbeddings extends google_gauth_1.GoogleEmbeddings {
    static lc_name() {
        return "VertexAIEmbeddings";
    }
    constructor(fields) {
        super({
            ...fields,
            platformType: "gcp",
        });
    }
}
exports.VertexAIEmbeddings = VertexAIEmbeddings;
