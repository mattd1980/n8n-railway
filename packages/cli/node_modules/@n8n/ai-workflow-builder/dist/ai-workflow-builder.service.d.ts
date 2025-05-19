import { GlobalConfig } from '@n8n/config';
import { INodeTypes } from 'n8n-workflow';
import type { IUser } from 'n8n-workflow';
import { ILicenseService } from './interfaces';
import type { MessageResponse } from './types';
export declare class AiWorkflowBuilderService {
    private readonly licenseService;
    private readonly nodeTypes;
    private readonly globalConfig;
    private readonly n8nVersion;
    private parsedNodeTypes;
    private llmSimpleTask;
    private llmComplexTask;
    private client;
    constructor(licenseService: ILicenseService, nodeTypes: INodeTypes, globalConfig: GlobalConfig, n8nVersion: string);
    private setupModels;
    private getNodeTypes;
    private isWorkflowEvent;
    private getAgent;
    chat(payload: {
        question: string;
    }, user: IUser): AsyncGenerator<{
        messages: MessageResponse[];
    }, void, unknown>;
}
