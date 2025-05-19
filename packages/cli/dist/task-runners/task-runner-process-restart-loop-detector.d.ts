import { TaskRunnerRestartLoopError } from '../task-runners/errors/task-runner-restart-loop-error';
import type { TaskRunnerProcess } from '../task-runners/task-runner-process';
import { TypedEmitter } from '../typed-emitter';
type TaskRunnerProcessRestartLoopDetectorEventMap = {
    'restart-loop-detected': TaskRunnerRestartLoopError;
};
export declare class TaskRunnerProcessRestartLoopDetector extends TypedEmitter<TaskRunnerProcessRestartLoopDetectorEventMap> {
    private readonly taskRunnerProcess;
    private readonly maxCount;
    private readonly restartsWindow;
    private numRestarts;
    private firstRestartedAt;
    constructor(taskRunnerProcess: TaskRunnerProcess);
    private increment;
    private reset;
    private isMaxCountExceeded;
    private msSinceFirstIncrement;
}
export {};
