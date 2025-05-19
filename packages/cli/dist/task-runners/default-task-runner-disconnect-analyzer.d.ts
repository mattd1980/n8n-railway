import type { DisconnectAnalyzer, DisconnectErrorOptions } from '../task-runners/task-broker/task-broker-types';
export declare class DefaultTaskRunnerDisconnectAnalyzer implements DisconnectAnalyzer {
    get isCloudDeployment(): boolean;
    toDisconnectError(opts: DisconnectErrorOptions): Promise<Error>;
}
