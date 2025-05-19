import { BinaryDataQueryDto, BinaryDataSignedQueryDto } from '@n8n/api-types';
import { Request, Response } from 'express';
import { BinaryDataService } from 'n8n-core';
export declare class BinaryDataController {
    private readonly binaryDataService;
    constructor(binaryDataService: BinaryDataService);
    get(_: Request, res: Response, { id: binaryDataId, action, fileName, mimeType }: BinaryDataQueryDto): Promise<import("stream").Readable | Response<any, Record<string, any>>>;
    getSigned(_: Request, res: Response, { token }: BinaryDataSignedQueryDto): Promise<import("stream").Readable | Response<any, Record<string, any>>>;
    private validateBinaryDataId;
    private setContentHeaders;
}
