import { Response } from 'express';
import { OAuthRequest } from '../../requests';
import { AbstractOAuthController } from './abstract-oauth.controller';
export declare class OAuth2CredentialController extends AbstractOAuthController {
    oauthVersion: number;
    getAuthUri(req: OAuthRequest.OAuth2Credential.Auth): Promise<string>;
    handleCallback(req: OAuthRequest.OAuth2Credential.Callback, res: Response): Promise<void>;
    private convertCredentialToOptions;
}
