import * as z from "zod";
import { ClassificationObject, ClassificationObject$Outbound } from "./classificationobject.js";
export type ClassificationResponse = {
    id?: string | undefined;
    model?: string | undefined;
    results?: Array<ClassificationObject> | undefined;
};
/** @internal */
export declare const ClassificationResponse$inboundSchema: z.ZodType<ClassificationResponse, z.ZodTypeDef, unknown>;
/** @internal */
export type ClassificationResponse$Outbound = {
    id?: string | undefined;
    model?: string | undefined;
    results?: Array<ClassificationObject$Outbound> | undefined;
};
/** @internal */
export declare const ClassificationResponse$outboundSchema: z.ZodType<ClassificationResponse$Outbound, z.ZodTypeDef, ClassificationResponse>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ClassificationResponse$ {
    /** @deprecated use `ClassificationResponse$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ClassificationResponse, z.ZodTypeDef, unknown>;
    /** @deprecated use `ClassificationResponse$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ClassificationResponse$Outbound, z.ZodTypeDef, ClassificationResponse>;
    /** @deprecated use `ClassificationResponse$Outbound` instead. */
    type Outbound = ClassificationResponse$Outbound;
}
//# sourceMappingURL=classificationresponse.d.ts.map