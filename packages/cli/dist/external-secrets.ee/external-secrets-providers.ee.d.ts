import type { SecretsProvider } from './types';
export declare class ExternalSecretsProviders {
    providers: Record<string, {
        new (): SecretsProvider;
    }>;
    getProvider(name: string): {
        new (): SecretsProvider;
    };
    hasProvider(name: string): boolean;
    getAllProviders(): Record<string, new () => SecretsProvider>;
}
