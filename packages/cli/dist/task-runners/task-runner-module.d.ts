import { TaskRunnersConfig } from '@n8n/config';
import { ErrorReporter, Logger } from 'n8n-core';
export declare class TaskRunnerModule {
    private readonly logger;
    private readonly errorReporter;
    private readonly runnerConfig;
    private taskBrokerHttpServer;
    private taskBrokerWsServer;
    private taskRequester;
    private taskRunnerProcess;
    private taskRunnerProcessRestartLoopDetector;
    constructor(logger: Logger, errorReporter: ErrorReporter, runnerConfig: TaskRunnersConfig);
    start(): Promise<void>;
    stop(): Promise<void>;
    private loadTaskRequester;
    private loadTaskBroker;
    private startInternalTaskRunner;
    private onRunnerRestartLoopDetected;
}
