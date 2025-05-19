export type TaskStatus = 'waitingForSettings' | 'running' | 'aborting:cancelled' | 'aborting:timeout';
export type TaskStateOpts = {
    taskId: string;
    timeoutInS: number;
    onTimeout: () => void;
};
export declare class TaskState {
    status: TaskStatus;
    readonly taskId: string;
    readonly abortController: AbortController;
    private timeoutTimer;
    constructor(opts: TaskStateOpts);
    cleanup(): void;
    toJSON(): string;
    caseOf(conditions: Record<TaskStatus, (taskState: TaskState) => void | Promise<void> | never>): Promise<void>;
    static throwUnexpectedTaskStatus: (taskState: TaskState) => never;
}
