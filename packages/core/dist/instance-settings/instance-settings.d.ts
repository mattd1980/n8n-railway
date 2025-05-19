import { InstanceSettingsConfig } from '@n8n/config';
import { Logger } from '../logging/logger';
interface WritableSettings {
    tunnelSubdomain?: string;
}
type InstanceRole = 'unset' | 'leader' | 'follower';
export type InstanceType = 'main' | 'webhook' | 'worker';
export declare class InstanceSettings {
    private readonly config;
    private readonly logger;
    readonly n8nFolder: string;
    readonly staticCacheDir: string;
    readonly customExtensionDir: string;
    readonly nodesDownloadDir: string;
    private readonly settingsFile;
    readonly enforceSettingsFilePermissions: {
        isSet: boolean;
        enforce: boolean;
    };
    private settings;
    readonly instanceId: string;
    readonly instanceType: InstanceType;
    constructor(config: InstanceSettingsConfig, logger: Logger);
    instanceRole: InstanceRole;
    readonly hostId: string;
    private isMultiMainEnabled;
    private isMultiMainLicensed;
    setMultiMainEnabled(newState: boolean): void;
    setMultiMainLicensed(newState: boolean): void;
    get isMultiMain(): boolean;
    get isSingleMain(): boolean;
    get isWorker(): boolean;
    get isLeader(): boolean;
    markAsLeader(): void;
    get isFollower(): boolean;
    markAsFollower(): void;
    get encryptionKey(): string;
    get tunnelSubdomain(): string | undefined;
    get isDocker(): boolean;
    update(newSettings: WritableSettings): void;
    private loadOrCreate;
    private generateInstanceId;
    private save;
    private loadEnforceSettingsFilePermissionsFlag;
    private ensureSettingsFilePermissions;
    private isWindows;
}
export {};
