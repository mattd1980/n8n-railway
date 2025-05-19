import type { Request } from 'express';
import { CredentialTypes } from '../credential-types';
export declare const CREDENTIAL_TRANSLATIONS_DIR = "n8n-nodes-base/dist/credentials/translations";
export declare const NODE_HEADERS_PATH: string;
export declare namespace TranslationRequest {
    type Credential = Request<{}, {}, {}, {
        credentialType: string;
    }>;
}
export declare class TranslationController {
    private readonly credentialTypes;
    constructor(credentialTypes: CredentialTypes);
    getCredentialTranslation(req: TranslationRequest.Credential): Promise<any>;
    getNodeTranslationHeaders(): Promise<any>;
}
