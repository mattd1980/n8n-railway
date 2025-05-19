import { TaskRunnersConfig } from '@n8n/config';
import type { DisconnectErrorOptions } from '../task-runners/task-broker/task-broker-types';
import { DefaultTaskRunnerDisconnectAnalyzer } from './default-task-runner-disconnect-analyzer';
import { TaskRunnerProcess } from './task-runner-process';
export declare class InternalTaskRunnerDisconnectAnalyzer extends DefaultTaskRunnerDisconnectAnalyzer {
    private readonly runnerConfig;
    private readonly taskRunnerProcess;
    private readonly exitReasonSignal;
    constructor(runnerConfig: TaskRunnersConfig, taskRunnerProcess: TaskRunnerProcess);
    toDisconnectError(opts: DisconnectErrorOptions): Promise<Error>;
    private awaitExitSignal;
}
