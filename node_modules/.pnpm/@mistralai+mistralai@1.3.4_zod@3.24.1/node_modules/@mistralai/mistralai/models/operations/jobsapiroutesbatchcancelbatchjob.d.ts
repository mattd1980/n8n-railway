import * as z from "zod";
export type JobsApiRoutesBatchCancelBatchJobRequest = {
    jobId: string;
};
/** @internal */
export declare const JobsApiRoutesBatchCancelBatchJobRequest$inboundSchema: z.ZodType<JobsApiRoutesBatchCancelBatchJobRequest, z.ZodTypeDef, unknown>;
/** @internal */
export type JobsApiRoutesBatchCancelBatchJobRequest$Outbound = {
    job_id: string;
};
/** @internal */
export declare const JobsApiRoutesBatchCancelBatchJobRequest$outboundSchema: z.ZodType<JobsApiRoutesBatchCancelBatchJobRequest$Outbound, z.ZodTypeDef, JobsApiRoutesBatchCancelBatchJobRequest>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace JobsApiRoutesBatchCancelBatchJobRequest$ {
    /** @deprecated use `JobsApiRoutesBatchCancelBatchJobRequest$inboundSchema` instead. */
    const inboundSchema: z.ZodType<JobsApiRoutesBatchCancelBatchJobRequest, z.ZodTypeDef, unknown>;
    /** @deprecated use `JobsApiRoutesBatchCancelBatchJobRequest$outboundSchema` instead. */
    const outboundSchema: z.ZodType<JobsApiRoutesBatchCancelBatchJobRequest$Outbound, z.ZodTypeDef, JobsApiRoutesBatchCancelBatchJobRequest>;
    /** @deprecated use `JobsApiRoutesBatchCancelBatchJobRequest$Outbound` instead. */
    type Outbound = JobsApiRoutesBatchCancelBatchJobRequest$Outbound;
}
//# sourceMappingURL=jobsapiroutesbatchcancelbatchjob.d.ts.map