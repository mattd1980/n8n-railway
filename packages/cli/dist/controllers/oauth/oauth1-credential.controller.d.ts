import { Response } from 'express';
import { OAuthRequest } from '../../requests';
import { AbstractOAuthController } from './abstract-oauth.controller';
export declare class OAuth1CredentialController extends AbstractOAuthController {
    oauthVersion: number;
    getAuthUri(req: OAuthRequest.OAuth1Credential.Auth): Promise<string>;
    handleCallback(req: OAuthRequest.OAuth1Credential.Callback, res: Response): Promise<void>;
}
