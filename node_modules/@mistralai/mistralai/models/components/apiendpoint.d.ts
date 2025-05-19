import * as z from "zod";
import { ClosedEnum } from "../../types/enums.js";
export declare const ApiEndpoint: {
    readonly RootV1ChatCompletions: "/v1/chat/completions";
    readonly RootV1Embeddings: "/v1/embeddings";
    readonly RootV1FimCompletions: "/v1/fim/completions";
    readonly RootV1Moderations: "/v1/moderations";
};
export type ApiEndpoint = ClosedEnum<typeof ApiEndpoint>;
/** @internal */
export declare const ApiEndpoint$inboundSchema: z.ZodNativeEnum<typeof ApiEndpoint>;
/** @internal */
export declare const ApiEndpoint$outboundSchema: z.ZodNativeEnum<typeof ApiEndpoint>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ApiEndpoint$ {
    /** @deprecated use `ApiEndpoint$inboundSchema` instead. */
    const inboundSchema: z.ZodNativeEnum<{
        readonly RootV1ChatCompletions: "/v1/chat/completions";
        readonly RootV1Embeddings: "/v1/embeddings";
        readonly RootV1FimCompletions: "/v1/fim/completions";
        readonly RootV1Moderations: "/v1/moderations";
    }>;
    /** @deprecated use `ApiEndpoint$outboundSchema` instead. */
    const outboundSchema: z.ZodNativeEnum<{
        readonly RootV1ChatCompletions: "/v1/chat/completions";
        readonly RootV1Embeddings: "/v1/embeddings";
        readonly RootV1FimCompletions: "/v1/fim/completions";
        readonly RootV1Moderations: "/v1/moderations";
    }>;
}
//# sourceMappingURL=apiendpoint.d.ts.map