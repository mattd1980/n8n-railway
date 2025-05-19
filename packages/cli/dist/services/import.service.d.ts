import type { IWorkflowDb } from '@n8n/db';
import { CredentialsRepository, TagRepository } from '@n8n/db';
import { Logger } from 'n8n-core';
import { type IWorkflowBase } from 'n8n-workflow';
export declare class ImportService {
    private readonly logger;
    private readonly credentialsRepository;
    private readonly tagRepository;
    private dbCredentials;
    private dbTags;
    constructor(logger: Logger, credentialsRepository: CredentialsRepository, tagRepository: TagRepository);
    initRecords(): Promise<void>;
    importWorkflows(workflows: IWorkflowDb[], projectId: string): Promise<void>;
    replaceInvalidCreds(workflow: IWorkflowBase): Promise<void>;
    private toNewCredentialFormat;
}
