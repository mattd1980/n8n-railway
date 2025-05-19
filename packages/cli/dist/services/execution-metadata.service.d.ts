import { ExecutionMetadataRepository } from '@n8n/db';
export declare class ExecutionMetadataService {
    private readonly executionMetadataRepository;
    constructor(executionMetadataRepository: ExecutionMetadataRepository);
    save(executionId: string, executionMetadata: Record<string, string>): Promise<void>;
}
