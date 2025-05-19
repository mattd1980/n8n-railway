import { Logger } from 'n8n-core';
import type { IdentityProviderInstance } from 'samlify';
export declare class SamlValidator {
    private readonly logger;
    private xmlMetadata;
    private xmlProtocol;
    private preload;
    constructor(logger: Logger);
    private xmllint;
    init(): Promise<void>;
    validateIdentiyProvider(idp: IdentityProviderInstance): void;
    validateMetadata(metadata: string): Promise<boolean>;
    validateResponse(response: string): Promise<boolean>;
    private loadSchemas;
    private validateXml;
}
