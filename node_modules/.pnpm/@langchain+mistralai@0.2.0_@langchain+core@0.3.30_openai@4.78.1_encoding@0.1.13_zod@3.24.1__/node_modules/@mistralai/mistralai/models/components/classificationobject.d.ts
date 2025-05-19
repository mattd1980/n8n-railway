import * as z from "zod";
export type ClassificationObject = {
    /**
     * Classifier result thresholded
     */
    categories?: {
        [k: string]: boolean;
    } | undefined;
    /**
     * Classifier result
     */
    categoryScores?: {
        [k: string]: number;
    } | undefined;
};
/** @internal */
export declare const ClassificationObject$inboundSchema: z.ZodType<ClassificationObject, z.ZodTypeDef, unknown>;
/** @internal */
export type ClassificationObject$Outbound = {
    categories?: {
        [k: string]: boolean;
    } | undefined;
    category_scores?: {
        [k: string]: number;
    } | undefined;
};
/** @internal */
export declare const ClassificationObject$outboundSchema: z.ZodType<ClassificationObject$Outbound, z.ZodTypeDef, ClassificationObject>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ClassificationObject$ {
    /** @deprecated use `ClassificationObject$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ClassificationObject, z.ZodTypeDef, unknown>;
    /** @deprecated use `ClassificationObject$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ClassificationObject$Outbound, z.ZodTypeDef, ClassificationObject>;
    /** @deprecated use `ClassificationObject$Outbound` instead. */
    type Outbound = ClassificationObject$Outbound;
}
//# sourceMappingURL=classificationobject.d.ts.map