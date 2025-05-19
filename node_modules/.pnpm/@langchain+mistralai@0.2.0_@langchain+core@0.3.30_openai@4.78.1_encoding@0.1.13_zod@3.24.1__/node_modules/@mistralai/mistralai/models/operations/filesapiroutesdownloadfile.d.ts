import * as z from "zod";
export type FilesApiRoutesDownloadFileRequest = {
    fileId: string;
};
/** @internal */
export declare const FilesApiRoutesDownloadFileRequest$inboundSchema: z.ZodType<FilesApiRoutesDownloadFileRequest, z.ZodTypeDef, unknown>;
/** @internal */
export type FilesApiRoutesDownloadFileRequest$Outbound = {
    file_id: string;
};
/** @internal */
export declare const FilesApiRoutesDownloadFileRequest$outboundSchema: z.ZodType<FilesApiRoutesDownloadFileRequest$Outbound, z.ZodTypeDef, FilesApiRoutesDownloadFileRequest>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace FilesApiRoutesDownloadFileRequest$ {
    /** @deprecated use `FilesApiRoutesDownloadFileRequest$inboundSchema` instead. */
    const inboundSchema: z.ZodType<FilesApiRoutesDownloadFileRequest, z.ZodTypeDef, unknown>;
    /** @deprecated use `FilesApiRoutesDownloadFileRequest$outboundSchema` instead. */
    const outboundSchema: z.ZodType<FilesApiRoutesDownloadFileRequest$Outbound, z.ZodTypeDef, FilesApiRoutesDownloadFileRequest>;
    /** @deprecated use `FilesApiRoutesDownloadFileRequest$Outbound` instead. */
    type Outbound = FilesApiRoutesDownloadFileRequest$Outbound;
}
//# sourceMappingURL=filesapiroutesdownloadfile.d.ts.map