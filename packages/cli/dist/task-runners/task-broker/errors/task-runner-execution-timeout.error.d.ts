import type { TaskRunnerMode } from '@n8n/config/src/configs/runners.config';
import { OperationalError } from 'n8n-workflow';
export declare class TaskRunnerExecutionTimeoutError extends OperationalError {
    description: string;
    constructor({ taskTimeout, isSelfHosted, mode, }: {
        taskTimeout: number;
        isSelfHosted: boolean;
        mode: TaskRunnerMode;
    });
}
