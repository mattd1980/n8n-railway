import * as z from "zod";
import { ClosedEnum } from "../../types/enums.js";
export declare const ReferenceChunkType: {
    readonly Reference: "reference";
};
export type ReferenceChunkType = ClosedEnum<typeof ReferenceChunkType>;
export type ReferenceChunk = {
    type?: "reference" | undefined;
    referenceIds: Array<number>;
};
/** @internal */
export declare const ReferenceChunkType$inboundSchema: z.ZodNativeEnum<typeof ReferenceChunkType>;
/** @internal */
export declare const ReferenceChunkType$outboundSchema: z.ZodNativeEnum<typeof ReferenceChunkType>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ReferenceChunkType$ {
    /** @deprecated use `ReferenceChunkType$inboundSchema` instead. */
    const inboundSchema: z.ZodNativeEnum<{
        readonly Reference: "reference";
    }>;
    /** @deprecated use `ReferenceChunkType$outboundSchema` instead. */
    const outboundSchema: z.ZodNativeEnum<{
        readonly Reference: "reference";
    }>;
}
/** @internal */
export declare const ReferenceChunk$inboundSchema: z.ZodType<ReferenceChunk, z.ZodTypeDef, unknown>;
/** @internal */
export type ReferenceChunk$Outbound = {
    type: "reference";
    reference_ids: Array<number>;
};
/** @internal */
export declare const ReferenceChunk$outboundSchema: z.ZodType<ReferenceChunk$Outbound, z.ZodTypeDef, ReferenceChunk>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ReferenceChunk$ {
    /** @deprecated use `ReferenceChunk$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ReferenceChunk, z.ZodTypeDef, unknown>;
    /** @deprecated use `ReferenceChunk$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ReferenceChunk$Outbound, z.ZodTypeDef, ReferenceChunk>;
    /** @deprecated use `ReferenceChunk$Outbound` instead. */
    type Outbound = ReferenceChunk$Outbound;
}
//# sourceMappingURL=referencechunk.d.ts.map