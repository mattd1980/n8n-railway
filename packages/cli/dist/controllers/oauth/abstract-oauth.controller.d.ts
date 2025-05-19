import { GlobalConfig } from '@n8n/config';
import type { CredentialsEntity, ICredentialsDb } from '@n8n/db';
import { CredentialsRepository } from '@n8n/db';
import type { Response } from 'express';
import { Logger } from 'n8n-core';
import type { ICredentialDataDecryptedObject, IWorkflowExecuteAdditionalData } from 'n8n-workflow';
import { CredentialsFinderService } from '../../credentials/credentials-finder.service';
import { CredentialsHelper } from '../../credentials-helper';
import { ExternalHooks } from '../../external-hooks';
import type { AuthenticatedRequest, OAuthRequest } from '../../requests';
import { UrlService } from '../../services/url.service';
type CsrfStateParam = {
    cid: string;
    token: string;
    createdAt: number;
    userId?: string;
};
export declare const skipAuthOnOAuthCallback: boolean;
export declare abstract class AbstractOAuthController {
    protected readonly logger: Logger;
    protected readonly externalHooks: ExternalHooks;
    private readonly credentialsHelper;
    private readonly credentialsRepository;
    private readonly credentialsFinderService;
    private readonly urlService;
    private readonly globalConfig;
    abstract oauthVersion: number;
    constructor(logger: Logger, externalHooks: ExternalHooks, credentialsHelper: CredentialsHelper, credentialsRepository: CredentialsRepository, credentialsFinderService: CredentialsFinderService, urlService: UrlService, globalConfig: GlobalConfig);
    get baseUrl(): string;
    protected getCredential(req: OAuthRequest.OAuth2Credential.Auth): Promise<CredentialsEntity>;
    protected getAdditionalData(): Promise<IWorkflowExecuteAdditionalData>;
    protected getDecryptedDataForAuthUri(credential: ICredentialsDb, additionalData: IWorkflowExecuteAdditionalData): Promise<ICredentialDataDecryptedObject>;
    protected getDecryptedDataForCallback(credential: ICredentialsDb, additionalData: IWorkflowExecuteAdditionalData): Promise<ICredentialDataDecryptedObject>;
    private getDecryptedData;
    protected applyDefaultsAndOverwrites<T>(credential: ICredentialsDb, decryptedData: ICredentialDataDecryptedObject, additionalData: IWorkflowExecuteAdditionalData): Promise<T>;
    protected encryptAndSaveData(credential: ICredentialsDb, toUpdate: ICredentialDataDecryptedObject, toDelete?: string[]): Promise<void>;
    protected getCredentialWithoutUser(credentialId: string): Promise<ICredentialsDb | null>;
    createCsrfState(credentialsId: string, userId?: string): [string, string];
    protected decodeCsrfState(encodedState: string, req: AuthenticatedRequest): CsrfStateParam;
    protected verifyCsrfState(decrypted: ICredentialDataDecryptedObject & {
        csrfSecret?: string;
    }, state: CsrfStateParam): boolean;
    protected resolveCredential<T>(req: OAuthRequest.OAuth1Credential.Callback | OAuthRequest.OAuth2Credential.Callback): Promise<[ICredentialsDb, ICredentialDataDecryptedObject, T]>;
    protected renderCallbackError(res: Response, message: string, reason?: string): void;
}
export {};
