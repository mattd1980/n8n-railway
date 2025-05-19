import { WorkflowRepository } from '@n8n/db';
import type { Response } from 'express';
import { Logger } from 'n8n-core';
import type { IHttpRequestMethods } from 'n8n-workflow';
import { NodeTypes } from '../node-types';
import { WebhookService } from '../webhooks/webhook.service';
import { WorkflowStaticDataService } from '../workflows/workflow-static-data.service';
import type { IWebhookResponseCallbackData, IWebhookManager, WebhookAccessControlOptions, WebhookRequest } from './webhook.types';
export declare class LiveWebhooks implements IWebhookManager {
    private readonly logger;
    private readonly nodeTypes;
    private readonly webhookService;
    private readonly workflowRepository;
    private readonly workflowStaticDataService;
    constructor(logger: Logger, nodeTypes: NodeTypes, webhookService: WebhookService, workflowRepository: WorkflowRepository, workflowStaticDataService: WorkflowStaticDataService);
    getWebhookMethods(path: string): Promise<IHttpRequestMethods[]>;
    findAccessControlOptions(path: string, httpMethod: IHttpRequestMethods): Promise<WebhookAccessControlOptions>;
    executeWebhook(request: WebhookRequest, response: Response): Promise<IWebhookResponseCallbackData>;
    private findWebhook;
}
