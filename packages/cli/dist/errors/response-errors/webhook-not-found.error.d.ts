import { NotFoundError } from './not-found.error';
export declare const webhookNotFoundErrorMessage: ({ path, httpMethod, webhookMethods, }: {
    path: string;
    httpMethod?: string;
    webhookMethods?: string[];
}) => string;
export declare class WebhookNotFoundError extends NotFoundError {
    constructor({ path, httpMethod, webhookMethods, }: {
        path: string;
        httpMethod?: string;
        webhookMethods?: string[];
    }, { hint }?: {
        hint: 'default' | 'production';
    });
}
