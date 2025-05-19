import { IWebhookFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

type WebhookParameters = {
    httpMethod: string | string[];
    responseMode: string;
    responseData: string;
    responseCode?: number;
    options?: {
        responseData?: string;
        responseCode?: {
            values?: {
                responseCode: number;
                customCode?: number;
            };
        };
        noResponseBody?: boolean;
    };
};
declare const getResponseCode: (parameters: WebhookParameters) => number;
declare const getResponseData: (parameters: WebhookParameters) => string | undefined;
declare const configuredOutputs: (parameters: WebhookParameters) => {
    type: string;
    displayName: string;
}[];
declare const setupOutputConnection: (ctx: IWebhookFunctions, method: string, additionalData: {
    jwtPayload?: IDataObject;
}) => (outputData: INodeExecutionData) => INodeExecutionData[][];
declare const isIpWhitelisted: (whitelist: string | string[] | undefined, ips: string[], ip?: string) => boolean;
declare const checkResponseModeConfiguration: (context: IWebhookFunctions) => void;
declare function validateWebhookAuthentication(ctx: IWebhookFunctions, authPropertyName: string): Promise<IDataObject | undefined>;

export { type WebhookParameters, checkResponseModeConfiguration, configuredOutputs, getResponseCode, getResponseData, isIpWhitelisted, setupOutputConnection, validateWebhookAuthentication };
