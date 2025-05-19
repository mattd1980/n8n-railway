import type { SSHCredentials } from 'n8n-workflow';
import { Client } from 'ssh2';
declare class SSHClientsConfig {
    idleTimeout: number;
}
export declare class SSHClientsManager {
    private readonly config;
    readonly clients: Map<string, {
        client: Client;
        lastUsed: Date;
    }>;
    constructor(config: SSHClientsConfig);
    getClient(credentials: SSHCredentials): Promise<Client>;
    onShutdown(): void;
    cleanupStaleConnections(): void;
}
export {};
