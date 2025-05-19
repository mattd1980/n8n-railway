import type express from 'express';
import type { IDeferredPromise, IN8nHttpFullResponse, INode, IPinData, IRunExecutionData, IWebhookData, IWebhookResponseData, IWorkflowExecuteAdditionalData, WebhookResponseMode, Workflow, WorkflowExecuteMode, IWorkflowBase, WebhookResponseData } from 'n8n-workflow';
import type { IWebhookResponseCallbackData, WebhookRequest } from './webhook.types';
export declare function getWorkflowWebhooks(workflow: Workflow, additionalData: IWorkflowExecuteAdditionalData, destinationNode?: string, ignoreRestartWebhooks?: boolean): IWebhookData[];
export declare function autoDetectResponseMode(workflowStartNode: INode, workflow: Workflow, method: string): WebhookResponseMode | undefined;
export declare const handleFormRedirectionCase: (data: IWebhookResponseCallbackData, workflowStartNode: INode) => IWebhookResponseCallbackData;
export declare function getResponseOnReceived(responseData: WebhookResponseData | string | undefined, webhookResultData: IWebhookResponseData, responseCode: number): IWebhookResponseCallbackData;
export declare function setupResponseNodePromise(responsePromise: IDeferredPromise<IN8nHttpFullResponse>, res: express.Response, responseCallback: (error: Error | null, data: IWebhookResponseCallbackData) => void, workflowStartNode: INode, executionId: string | undefined, workflow: Workflow): void;
export declare function prepareExecutionData(executionMode: WorkflowExecuteMode, workflowStartNode: INode, webhookResultData: IWebhookResponseData, runExecutionData: IRunExecutionData | undefined, runExecutionDataMerge?: object, destinationNode?: string, executionId?: string, workflowData?: IWorkflowBase): {
    runExecutionData: IRunExecutionData;
    pinData: IPinData | undefined;
};
export declare function executeWebhook(workflow: Workflow, webhookData: IWebhookData, workflowData: IWorkflowBase, workflowStartNode: INode, executionMode: WorkflowExecuteMode, pushRef: string | undefined, runExecutionData: IRunExecutionData | undefined, executionId: string | undefined, req: WebhookRequest, res: express.Response, responseCallback: (error: Error | null, data: IWebhookResponseCallbackData) => void, destinationNode?: string): Promise<string | undefined>;
