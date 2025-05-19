import { GlobalConfig } from '@n8n/config';
import { Logger } from 'n8n-core';
import type { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { CredentialTypes } from './credential-types';
import type { ICredentialsOverwrite } from './interfaces';
export declare class CredentialsOverwrites {
    private readonly credentialTypes;
    private readonly logger;
    private overwriteData;
    private resolvedTypes;
    constructor(globalConfig: GlobalConfig, credentialTypes: CredentialTypes, logger: Logger);
    setData(overwriteData: ICredentialsOverwrite): void;
    applyOverwrite(type: string, data: ICredentialDataDecryptedObject): ICredentialDataDecryptedObject;
    getOverwrites(type: string): ICredentialDataDecryptedObject | undefined;
    private get;
    getAll(): ICredentialsOverwrite;
}
