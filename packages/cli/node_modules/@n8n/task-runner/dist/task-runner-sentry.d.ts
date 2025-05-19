import type { ErrorEvent } from '@sentry/types';
import { ErrorReporter } from 'n8n-core';
import { SentryConfig } from './config/sentry-config';
export declare class TaskRunnerSentry {
    private readonly config;
    private readonly errorReporter;
    constructor(config: SentryConfig, errorReporter: ErrorReporter);
    initIfEnabled(): Promise<void>;
    shutdown(): Promise<void>;
    filterOutUserCodeErrors: (event: ErrorEvent) => boolean;
    private isUserCodeError;
}
