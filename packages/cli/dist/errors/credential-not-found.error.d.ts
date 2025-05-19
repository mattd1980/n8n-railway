import { UserError } from 'n8n-workflow';
export declare class CredentialNotFoundError extends UserError {
    constructor(credentialId: string, credentialType: string);
}
