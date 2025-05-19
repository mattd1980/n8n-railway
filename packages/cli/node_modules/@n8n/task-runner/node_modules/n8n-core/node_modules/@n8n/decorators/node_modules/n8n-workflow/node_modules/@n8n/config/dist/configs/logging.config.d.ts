import { z } from 'zod';
import { CommaSeparatedStringArray } from '../custom-types';
export declare const LOG_SCOPES: readonly ["concurrency", "external-secrets", "license", "multi-main-setup", "pruning", "pubsub", "push", "redis", "scaling", "waiting-executions", "task-runner", "insights", "workflow-activation"];
export type LogScope = (typeof LOG_SCOPES)[number];
declare class FileLoggingConfig {
    fileCountMax: number;
    fileSizeMax: number;
    location: string;
}
declare const logLevelSchema: z.ZodEnum<["error", "warn", "info", "debug", "silent"]>;
type LogLevel = z.infer<typeof logLevelSchema>;
export declare class LoggingConfig {
    level: LogLevel;
    outputs: CommaSeparatedStringArray<'console' | 'file'>;
    file: FileLoggingConfig;
    scopes: CommaSeparatedStringArray<LogScope>;
}
export {};
