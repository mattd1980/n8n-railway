import { ICredentialType, INodeProperties } from 'n8n-workflow';

declare class Ftp implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    properties: INodeProperties[];
}

export { Ftp };
