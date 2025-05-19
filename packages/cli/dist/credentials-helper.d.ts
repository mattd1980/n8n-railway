import type { ICredentialsDb } from '@n8n/db';
import { CredentialsRepository, SharedCredentialsRepository } from '@n8n/db';
import { Credentials } from 'n8n-core';
import type { ICredentialDataDecryptedObject, ICredentialsExpressionResolveValues, IHttpRequestOptions, INode, INodeCredentialsDetails, INodeProperties, IRequestOptionsSimplified, WorkflowExecuteMode, IHttpRequestHelper, IWorkflowExecuteAdditionalData, IExecuteData } from 'n8n-workflow';
import { ICredentialsHelper, Workflow } from 'n8n-workflow';
import { CredentialTypes } from './credential-types';
import { CredentialsOverwrites } from './credentials-overwrites';
import { CacheService } from './services/cache/cache.service';
export declare class CredentialsHelper extends ICredentialsHelper {
    private readonly credentialTypes;
    private readonly credentialsOverwrites;
    private readonly credentialsRepository;
    private readonly sharedCredentialsRepository;
    private readonly cacheService;
    constructor(credentialTypes: CredentialTypes, credentialsOverwrites: CredentialsOverwrites, credentialsRepository: CredentialsRepository, sharedCredentialsRepository: SharedCredentialsRepository, cacheService: CacheService);
    authenticate(credentials: ICredentialDataDecryptedObject, typeName: string, incomingRequestOptions: IHttpRequestOptions | IRequestOptionsSimplified, workflow: Workflow, node: INode): Promise<IHttpRequestOptions>;
    preAuthentication(helpers: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject, typeName: string, node: INode, credentialsExpired: boolean): Promise<ICredentialDataDecryptedObject | undefined>;
    private resolveValue;
    getParentTypes(typeName: string): string[];
    getCredentials(nodeCredential: INodeCredentialsDetails, type: string): Promise<Credentials>;
    getCredentialsProperties(type: string): INodeProperties[];
    getDecrypted(additionalData: IWorkflowExecuteAdditionalData, nodeCredentials: INodeCredentialsDetails, type: string, mode: WorkflowExecuteMode, executeData?: IExecuteData, raw?: boolean, expressionResolveValues?: ICredentialsExpressionResolveValues): Promise<ICredentialDataDecryptedObject>;
    applyDefaultsAndOverwrites(additionalData: IWorkflowExecuteAdditionalData, decryptedDataOriginal: ICredentialDataDecryptedObject, credential: INodeCredentialsDetails, type: string, mode: WorkflowExecuteMode, executeData?: IExecuteData, expressionResolveValues?: ICredentialsExpressionResolveValues): Promise<ICredentialDataDecryptedObject>;
    updateCredentials(nodeCredentials: INodeCredentialsDetails, type: string, data: ICredentialDataDecryptedObject): Promise<void>;
    credentialCanUseExternalSecrets(nodeCredential: INodeCredentialsDetails): Promise<boolean>;
}
export declare function createCredentialsFromCredentialsEntity(credential: ICredentialsDb, encrypt?: boolean): Credentials;
