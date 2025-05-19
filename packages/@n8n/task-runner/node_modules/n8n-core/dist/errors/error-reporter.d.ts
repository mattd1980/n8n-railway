import type { ErrorEvent, EventHint } from '@sentry/types';
import type { ReportingOptions } from 'n8n-workflow';
import type { InstanceType } from '../instance-settings';
import { Logger } from '../logging/logger';
type ErrorReporterInitOptions = {
    serverType: InstanceType | 'task_runner';
    dsn: string;
    release: string;
    environment: string;
    serverName: string;
    releaseDate?: Date;
    beforeSendFilter?: (event: ErrorEvent, hint: EventHint) => boolean;
};
export declare class ErrorReporter {
    private readonly logger;
    private expirationTimer?;
    private seenErrors;
    private report;
    private beforeSendFilter?;
    constructor(logger: Logger);
    private defaultReport;
    shutdown(timeoutInMs?: number): Promise<void>;
    init({ beforeSendFilter, dsn, serverType, release, environment, serverName, releaseDate, }: ErrorReporterInitOptions): Promise<void>;
    beforeSend(event: ErrorEvent, hint: EventHint): Promise<ErrorEvent | null>;
    error(e: unknown, options?: ReportingOptions): void;
    warn(warning: Error | string, options?: ReportingOptions): void;
    info(msg: string, options?: ReportingOptions): void;
    private wrap;
    private isIgnoredSqliteError;
    private isIgnoredN8nError;
    private extractEventDetailsFromN8nError;
}
export {};
