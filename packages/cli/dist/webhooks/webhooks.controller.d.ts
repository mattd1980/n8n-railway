import { Request } from 'express';
import { WebhookService } from './webhook.service';
export declare class WebhooksController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    findWebhook(req: Request): Promise<import("@n8n/db").WebhookEntity | null>;
}
