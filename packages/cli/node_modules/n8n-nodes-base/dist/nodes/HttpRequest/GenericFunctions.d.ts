import { INodeExecutionData, IRequestOptions, IDataObject, INodeProperties, ICredentialDataDecryptedObject, IOAuth2Options } from 'n8n-workflow';

type HttpSslAuthCredentials = {
    ca?: string;
    cert?: string;
    key?: string;
    passphrase?: string;
};

type BodyParameter = {
    name: string;
    value: string;
    parameterType?: 'formBinaryData' | 'formData';
};
type IAuthDataSanitizeKeys = {
    [key: string]: string[];
};
declare const replaceNullValues: (item: INodeExecutionData) => INodeExecutionData;
declare const REDACTED = "**hidden**";
declare function sanitizeUiMessage(request: IRequestOptions, authDataKeys: IAuthDataSanitizeKeys, secrets?: string[]): IDataObject;
declare function getSecrets(properties: INodeProperties[], credentials: ICredentialDataDecryptedObject): string[];
declare const getOAuth2AdditionalParameters: (nodeCredentialType: string) => IOAuth2Options;
declare const binaryContentTypes: string[];
type BodyParametersReducer = (acc: IDataObject, cur: {
    name: string;
    value: string;
}) => Promise<IDataObject>;
declare function reduceAsync<T, R>(arr: T[], reducer: (acc: Awaited<Promise<R>>, cur: T) => Promise<R>, init?: Promise<R>): Promise<R>;
declare const prepareRequestBody: (parameters: BodyParameter[], bodyType: string, version: number, defaultReducer: BodyParametersReducer) => Promise<{}>;
declare const setAgentOptions: (requestOptions: IRequestOptions, sslCertificates: HttpSslAuthCredentials | undefined) => void;

export { type BodyParameter, type BodyParametersReducer, type IAuthDataSanitizeKeys, REDACTED, binaryContentTypes, getOAuth2AdditionalParameters, getSecrets, prepareRequestBody, reduceAsync, replaceNullValues, sanitizeUiMessage, setAgentOptions };
