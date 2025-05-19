import type { IDataObject } from 'n8n-workflow';
import type { ExternalSecretsRequest, SecretsProvider } from './types';
export declare class ExternalSecretsService {
    getProvider(providerName: string): ExternalSecretsRequest.GetProviderResponse | null;
    getProviders(): Promise<{
        displayName: string;
        name: string;
        icon: string;
        state: import("./types").SecretsProviderState;
        connected: boolean;
        connectedAt: Date | null;
        data: IDataObject;
    }[]>;
    redact(data: IDataObject, provider: SecretsProvider): IDataObject;
    private unredactRestoreValues;
    unredact(redactedData: IDataObject, savedData: IDataObject): IDataObject;
    saveProviderSettings(providerName: string, data: IDataObject, userId: string): Promise<void>;
    saveProviderConnected(providerName: string, connected: boolean): Promise<ExternalSecretsRequest.GetProviderResponse | null>;
    getAllSecrets(): Record<string, string[]>;
    testProviderSettings(providerName: string, data: IDataObject): Promise<{
        success: boolean;
        testState: "connected" | "tested" | "error";
        error?: string;
    }>;
    updateProvider(providerName: string): Promise<boolean>;
}
