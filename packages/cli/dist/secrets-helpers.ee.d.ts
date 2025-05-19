import type { SecretsHelpersBase } from 'n8n-workflow';
import { ExternalSecretsManager } from './external-secrets.ee/external-secrets-manager.ee';
export declare class SecretsHelper implements SecretsHelpersBase {
    private service;
    constructor(service: ExternalSecretsManager);
    update(): Promise<void>;
    waitForInit(): Promise<void>;
    getSecret(provider: string, name: string): unknown;
    hasSecret(provider: string, name: string): boolean;
    hasProvider(provider: string): boolean;
    listProviders(): string[];
    listSecrets(provider: string): string[];
}
