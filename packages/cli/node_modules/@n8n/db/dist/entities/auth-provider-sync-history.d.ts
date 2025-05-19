import { AuthProviderType, RunningMode, SyncStatus } from './types-db';
export declare class AuthProviderSyncHistory {
    id: number;
    providerType: AuthProviderType;
    runMode: RunningMode;
    status: SyncStatus;
    startedAt: Date;
    endedAt: Date;
    scanned: number;
    created: number;
    updated: number;
    disabled: number;
    error: string;
}
