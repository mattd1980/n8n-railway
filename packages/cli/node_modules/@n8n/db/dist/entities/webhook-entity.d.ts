import { IHttpRequestMethods } from 'n8n-workflow';
export declare class WebhookEntity {
    workflowId: string;
    webhookPath: string;
    method: IHttpRequestMethods;
    node: string;
    webhookId?: string;
    pathLength?: number;
    private get uniquePath();
    get cacheKey(): string;
    get staticSegments(): string[];
    get isDynamic(): boolean;
    display(): string;
}
