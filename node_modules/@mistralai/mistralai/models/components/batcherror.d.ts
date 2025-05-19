import * as z from "zod";
export type BatchError = {
    message: string;
    count?: number | undefined;
};
/** @internal */
export declare const BatchError$inboundSchema: z.ZodType<BatchError, z.ZodTypeDef, unknown>;
/** @internal */
export type BatchError$Outbound = {
    message: string;
    count: number;
};
/** @internal */
export declare const BatchError$outboundSchema: z.ZodType<BatchError$Outbound, z.ZodTypeDef, BatchError>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace BatchError$ {
    /** @deprecated use `BatchError$inboundSchema` instead. */
    const inboundSchema: z.ZodType<BatchError, z.ZodTypeDef, unknown>;
    /** @deprecated use `BatchError$outboundSchema` instead. */
    const outboundSchema: z.ZodType<BatchError$Outbound, z.ZodTypeDef, BatchError>;
    /** @deprecated use `BatchError$Outbound` instead. */
    type Outbound = BatchError$Outbound;
}
//# sourceMappingURL=batcherror.d.ts.map