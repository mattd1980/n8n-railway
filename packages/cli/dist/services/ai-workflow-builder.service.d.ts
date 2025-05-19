import { GlobalConfig } from '@n8n/config';
import type { IUser } from 'n8n-workflow';
import { License } from '../license';
import { NodeTypes } from '../node-types';
export declare class WorkflowBuilderService {
    private readonly nodeTypes;
    private readonly license;
    private readonly config;
    private service;
    constructor(nodeTypes: NodeTypes, license: License, config: GlobalConfig);
    private getService;
    chat(payload: {
        question: string;
    }, user: IUser): AsyncGenerator<{
        messages: import("@n8n/ai-workflow-builder").MessageResponse[];
    }, void, unknown>;
}
