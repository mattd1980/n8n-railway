import type express from 'express';
import type { IWebhookManager, WebhookOptionsRequest, WebhookRequest } from '../webhooks/webhook.types';
export declare function createWebhookHandlerFor(webhookManager: IWebhookManager): (req: WebhookRequest | WebhookOptionsRequest, res: express.Response) => Promise<void>;
