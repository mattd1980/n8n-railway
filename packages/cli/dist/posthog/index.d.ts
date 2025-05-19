import { GlobalConfig } from '@n8n/config';
import type { PublicUser } from '@n8n/db';
import { InstanceSettings } from 'n8n-core';
import type { FeatureFlags, ITelemetryTrackProperties } from 'n8n-workflow';
export declare class PostHogClient {
    private readonly instanceSettings;
    private readonly globalConfig;
    private postHog?;
    constructor(instanceSettings: InstanceSettings, globalConfig: GlobalConfig);
    init(): Promise<void>;
    stop(): Promise<void>;
    track(payload: {
        userId: string;
        event: string;
        properties: ITelemetryTrackProperties;
    }): void;
    getFeatureFlags(user: Pick<PublicUser, 'id' | 'createdAt'>): Promise<FeatureFlags>;
}
