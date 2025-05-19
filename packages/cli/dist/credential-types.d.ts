import type { ICredentialType, ICredentialTypes } from 'n8n-workflow';
import { LoadNodesAndCredentials } from './load-nodes-and-credentials';
export declare class CredentialTypes implements ICredentialTypes {
    private loadNodesAndCredentials;
    constructor(loadNodesAndCredentials: LoadNodesAndCredentials);
    recognizes(type: string): boolean;
    getByName(credentialType: string): ICredentialType;
    getSupportedNodes(type: string): string[];
    getParentTypes(typeName: string): string[];
}
