import type express from 'express';
import { InstanceSettings } from 'n8n-core';
import { Workflow } from 'n8n-workflow';
import type { IWebhookData, IWorkflowExecuteAdditionalData, IHttpRequestMethods, IRunData, IWorkflowBase } from 'n8n-workflow';
import { NodeTypes } from '../node-types';
import { Push } from '../push';
import { Publisher } from '../scaling/pubsub/publisher.service';
import { TestWebhookRegistrationsService } from '../webhooks/test-webhook-registrations.service';
import type { WorkflowRequest } from '../workflows/workflow.request';
import { WebhookService } from './webhook.service';
import type { IWebhookResponseCallbackData, IWebhookManager, WebhookAccessControlOptions, WebhookRequest } from './webhook.types';
export declare class TestWebhooks implements IWebhookManager {
    private readonly push;
    private readonly nodeTypes;
    private readonly registrations;
    private readonly instanceSettings;
    private readonly publisher;
    private readonly webhookService;
    constructor(push: Push, nodeTypes: NodeTypes, registrations: TestWebhookRegistrationsService, instanceSettings: InstanceSettings, publisher: Publisher, webhookService: WebhookService);
    private timeouts;
    executeWebhook(request: WebhookRequest, response: express.Response): Promise<IWebhookResponseCallbackData>;
    clearTimeout(key: string): void;
    getWebhookMethods(path: string): Promise<IHttpRequestMethods[]>;
    findAccessControlOptions(path: string, httpMethod: IHttpRequestMethods): Promise<WebhookAccessControlOptions | undefined>;
    needsWebhook(options: {
        userId: string;
        workflowEntity: IWorkflowBase;
        additionalData: IWorkflowExecuteAdditionalData;
        runData?: IRunData;
        pushRef?: string;
        destinationNode?: string;
        triggerToStartFrom?: WorkflowRequest.ManualRunPayload['triggerToStartFrom'];
    }): Promise<boolean>;
    cancelWebhook(workflowId: string): Promise<boolean>;
    getActiveWebhook(httpMethod: IHttpRequestMethods, path: string, webhookId?: string): Promise<IWebhookData | undefined>;
    deactivateWebhooks(workflow: Workflow): Promise<void>;
    toWorkflow(workflowEntity: IWorkflowBase): Workflow;
}
