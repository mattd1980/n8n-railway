import { GlobalConfig } from '@n8n/config';
export declare class UrlService {
    private readonly globalConfig;
    readonly baseUrl: string;
    constructor(globalConfig: GlobalConfig);
    getWebhookBaseUrl(): string;
    getInstanceBaseUrl(): string;
    private generateBaseUrl;
    private trimQuotes;
}
