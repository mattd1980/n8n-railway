import { GlobalConfig } from '@n8n/config';
import { WorkflowRepository } from '@n8n/db';
import type RudderStack from '@rudderstack/rudder-sdk-node';
import { InstanceSettings, Logger } from 'n8n-core';
import type { ITelemetryTrackProperties } from 'n8n-workflow';
import type { IExecutionTrackProperties } from '../interfaces';
import { License } from '../license';
import { PostHogClient } from '../posthog';
interface IExecutionTrackData {
    count: number;
    first: Date;
}
interface IExecutionsBuffer {
    [workflowId: string]: {
        manual_error?: IExecutionTrackData;
        manual_success?: IExecutionTrackData;
        prod_error?: IExecutionTrackData;
        prod_success?: IExecutionTrackData;
        user_id: string | undefined;
    };
}
export declare class Telemetry {
    private readonly logger;
    private readonly postHog;
    private readonly license;
    private readonly instanceSettings;
    private readonly workflowRepository;
    private readonly globalConfig;
    private rudderStack?;
    private pulseIntervalReference;
    private executionCountsBuffer;
    constructor(logger: Logger, postHog: PostHogClient, license: License, instanceSettings: InstanceSettings, workflowRepository: WorkflowRepository, globalConfig: GlobalConfig);
    init(): Promise<void>;
    private startPulse;
    private pulse;
    trackWorkflowExecution(properties: IExecutionTrackProperties): void;
    stopTracking(): Promise<void>;
    identify(traits?: {
        [key: string]: string | number | boolean | object | undefined | null;
    }): void;
    track(eventName: string, properties?: ITelemetryTrackProperties, { withPostHog }?: {
        withPostHog: boolean;
    }): RudderStack | undefined;
    getCountsBuffer(): IExecutionsBuffer;
}
export {};
