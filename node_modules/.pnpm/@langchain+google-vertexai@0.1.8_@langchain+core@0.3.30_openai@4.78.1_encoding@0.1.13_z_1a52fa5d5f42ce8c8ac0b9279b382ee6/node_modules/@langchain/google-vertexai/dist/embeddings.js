import { GoogleEmbeddings, } from "@langchain/google-gauth";
/**
 * Integration with a Google Vertex AI embeddings model using
 * the "@langchain/google-gauth" package for auth.
 */
export class VertexAIEmbeddings extends GoogleEmbeddings {
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
