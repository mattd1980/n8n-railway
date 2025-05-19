import type { ICredentialDataDecryptedObject } from 'n8n-workflow';
import type { ResourceOwner } from './resource-owner';
export interface ExportableCredential {
    id: string;
    name: string;
    type: string;
    data: ICredentialDataDecryptedObject;
    ownedBy: ResourceOwner | null;
}
