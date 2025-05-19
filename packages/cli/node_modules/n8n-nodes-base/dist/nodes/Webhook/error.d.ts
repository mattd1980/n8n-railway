import { ApplicationError } from 'n8n-workflow';

declare class WebhookAuthorizationError extends ApplicationError {
    readonly responseCode: number;
    constructor(responseCode: number, message?: string);
}

export { WebhookAuthorizationError };
