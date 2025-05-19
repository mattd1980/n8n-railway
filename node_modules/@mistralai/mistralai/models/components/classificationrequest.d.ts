import * as z from "zod";
/**
 * Text to classify.
 */
export type ClassificationRequestInputs = string | Array<string>;
export type ClassificationRequest = {
    /**
     * Text to classify.
     */
    inputs: string | Array<string>;
    model?: string | null | undefined;
};
/** @internal */
export declare const ClassificationRequestInputs$inboundSchema: z.ZodType<ClassificationRequestInputs, z.ZodTypeDef, unknown>;
/** @internal */
export type ClassificationRequestInputs$Outbound = string | Array<string>;
/** @internal */
export declare const ClassificationRequestInputs$outboundSchema: z.ZodType<ClassificationRequestInputs$Outbound, z.ZodTypeDef, ClassificationRequestInputs>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ClassificationRequestInputs$ {
    /** @deprecated use `ClassificationRequestInputs$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ClassificationRequestInputs, z.ZodTypeDef, unknown>;
    /** @deprecated use `ClassificationRequestInputs$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ClassificationRequestInputs$Outbound, z.ZodTypeDef, ClassificationRequestInputs>;
    /** @deprecated use `ClassificationRequestInputs$Outbound` instead. */
    type Outbound = ClassificationRequestInputs$Outbound;
}
/** @internal */
export declare const ClassificationRequest$inboundSchema: z.ZodType<ClassificationRequest, z.ZodTypeDef, unknown>;
/** @internal */
export type ClassificationRequest$Outbound = {
    input: string | Array<string>;
    model?: string | null | undefined;
};
/** @internal */
export declare const ClassificationRequest$outboundSchema: z.ZodType<ClassificationRequest$Outbound, z.ZodTypeDef, ClassificationRequest>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ClassificationRequest$ {
    /** @deprecated use `ClassificationRequest$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ClassificationRequest, z.ZodTypeDef, unknown>;
    /** @deprecated use `ClassificationRequest$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ClassificationRequest$Outbound, z.ZodTypeDef, ClassificationRequest>;
    /** @deprecated use `ClassificationRequest$Outbound` instead. */
    type Outbound = ClassificationRequest$Outbound;
}
//# sourceMappingURL=classificationrequest.d.ts.map