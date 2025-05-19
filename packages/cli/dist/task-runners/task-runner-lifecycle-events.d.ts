import { TypedEmitter } from '../typed-emitter';
type TaskRunnerLifecycleEventMap = {
    'runner:failed-heartbeat-check': never;
    'runner:timed-out-during-task': never;
};
export declare class TaskRunnerLifecycleEvents extends TypedEmitter<TaskRunnerLifecycleEventMap> {
}
export {};
