import type { Readable } from 'node:stream';
import { ObjectStoreService } from './object-store/object-store.service.ee';
import type { BinaryData } from './types';
export declare class ObjectStoreManager implements BinaryData.Manager {
    private readonly objectStoreService;
    constructor(objectStoreService: ObjectStoreService);
    init(): Promise<void>;
    store(workflowId: string, executionId: string, bufferOrStream: Buffer | Readable, metadata: BinaryData.PreWriteMetadata): Promise<{
        fileId: string;
        fileSize: number;
    }>;
    getPath(fileId: string): string;
    getAsBuffer(fileId: string): Promise<Buffer>;
    getAsStream(fileId: string): Promise<Readable>;
    getMetadata(fileId: string): Promise<BinaryData.Metadata>;
    copyByFileId(workflowId: string, executionId: string, sourceFileId: string): Promise<string>;
    copyByFilePath(workflowId: string, executionId: string, sourcePath: string, metadata: BinaryData.PreWriteMetadata): Promise<{
        fileId: string;
        fileSize: number;
    }>;
    rename(oldFileId: string, newFileId: string): Promise<void>;
    private toFileId;
}
