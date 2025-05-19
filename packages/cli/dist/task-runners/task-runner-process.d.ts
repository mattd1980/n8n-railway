import { TaskRunnersConfig } from '@n8n/config';
import { Logger } from 'n8n-core';
import { TaskBrokerAuthService } from './task-broker/auth/task-broker-auth.service';
import { TaskRunnerLifecycleEvents } from './task-runner-lifecycle-events';
import { TypedEmitter } from '../typed-emitter';
export type ExitReason = 'unknown' | 'oom';
export type TaskRunnerProcessEventMap = {
    exit: {
        reason: ExitReason;
    };
};
export declare class TaskRunnerProcess extends TypedEmitter<TaskRunnerProcessEventMap> {
    private readonly runnerConfig;
    private readonly authService;
    private readonly runnerLifecycleEvents;
    get isRunning(): boolean;
    get pid(): number | undefined;
    get runPromise(): Promise<void> | null;
    private process;
    private _runPromise;
    private oomDetector;
    private isShuttingDown;
    private logger;
    private readonly passthroughEnvVars;
    constructor(logger: Logger, runnerConfig: TaskRunnersConfig, authService: TaskBrokerAuthService, runnerLifecycleEvents: TaskRunnerLifecycleEvents);
    start(): Promise<void>;
    startNode(grantToken: string, taskBrokerUri: string): import("child_process").ChildProcessWithoutNullStreams;
    stop(): Promise<void>;
    forceRestart(): Promise<void>;
    killNode(): void;
    private monitorProcess;
    private onProcessExit;
    private getProcessEnvVars;
    private getPassthroughEnvVars;
}
