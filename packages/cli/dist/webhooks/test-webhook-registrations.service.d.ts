import { InstanceSettings } from 'n8n-core';
import type { IWebhookData, IWorkflowBase } from 'n8n-workflow';
import { CacheService } from '../services/cache/cache.service';
export type TestWebhookRegistration = {
    pushRef?: string;
    workflowEntity: IWorkflowBase;
    destinationNode?: string;
    webhook: IWebhookData;
};
export declare class TestWebhookRegistrationsService {
    private readonly cacheService;
    private readonly instanceSettings;
    constructor(cacheService: CacheService, instanceSettings: InstanceSettings);
    private readonly cacheKey;
    register(registration: TestWebhookRegistration): Promise<void>;
    deregister(arg: IWebhookData | string): Promise<void>;
    get(key: string): Promise<TestWebhookRegistration | undefined>;
    getAllKeys(): Promise<string[]>;
    getAllRegistrations(): Promise<TestWebhookRegistration[]>;
    deregisterAll(): Promise<void>;
    toKey(webhook: Pick<IWebhookData, 'webhookId' | 'httpMethod' | 'path'>): string;
}
