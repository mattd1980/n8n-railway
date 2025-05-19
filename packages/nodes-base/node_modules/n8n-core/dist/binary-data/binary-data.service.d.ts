import type { INodeExecutionData, IBinaryData } from 'n8n-workflow';
import type { Readable } from 'stream';
import { BinaryDataConfig } from './binary-data.config';
import type { BinaryData } from './types';
export declare class BinaryDataService {
    private readonly config;
    private mode;
    private managers;
    constructor(config: BinaryDataConfig);
    init(): Promise<void>;
    createSignedToken(binaryData: IBinaryData, expiresIn?: string): string;
    validateSignedToken(token: string): string;
    copyBinaryFile(workflowId: string, executionId: string, binaryData: IBinaryData, filePath: string): Promise<IBinaryData>;
    store(workflowId: string, executionId: string, bufferOrStream: Buffer | Readable, binaryData: IBinaryData): Promise<IBinaryData>;
    getAsStream(binaryDataId: string, chunkSize?: number): Promise<Readable>;
    getAsBuffer(binaryData: IBinaryData): Promise<Buffer>;
    getPath(binaryDataId: string): string;
    getMetadata(binaryDataId: string): Promise<BinaryData.Metadata>;
    deleteMany(ids: BinaryData.IdsForDeletion): Promise<void>;
    duplicateBinaryData(workflowId: string, executionId: string, inputData: Array<INodeExecutionData[] | null>): Promise<INodeExecutionData[][]>;
    rename(oldFileId: string, newFileId: string): Promise<void>;
    private createBinaryDataId;
    private duplicateBinaryDataInExecData;
    private getManager;
}
