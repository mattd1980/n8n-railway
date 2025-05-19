import type { Request, Response } from 'express';
import type { IDataObject, IHttpRequestMethods } from 'n8n-workflow';
export type WebhookOptionsRequest = Request & {
    method: 'OPTIONS';
};
export type WebhookRequest = Request<{
    path: string;
}> & {
    method: IHttpRequestMethods;
    params: Record<string, string>;
};
export type WaitingWebhookRequest = WebhookRequest & {
    params: WebhookRequest['path'] & {
        suffix?: string;
    };
};
export interface WebhookAccessControlOptions {
    allowedOrigins?: string;
}
export interface IWebhookManager {
    getWebhookMethods?: (path: string) => Promise<IHttpRequestMethods[]>;
    findAccessControlOptions?: (path: string, httpMethod: IHttpRequestMethods) => Promise<WebhookAccessControlOptions | undefined>;
    executeWebhook(req: WebhookRequest, res: Response): Promise<IWebhookResponseCallbackData>;
}
export interface IWebhookResponseCallbackData {
    data?: IDataObject | IDataObject[];
    headers?: object;
    noWebhookResponse?: boolean;
    responseCode?: number;
}
export type Method = NonNullable<IHttpRequestMethods>;
