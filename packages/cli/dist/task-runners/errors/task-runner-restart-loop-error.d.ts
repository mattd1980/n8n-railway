import { UnexpectedError } from 'n8n-workflow';
export declare class TaskRunnerRestartLoopError extends UnexpectedError {
    readonly howManyTimes: number;
    readonly timePeriodMs: number;
    constructor(howManyTimes: number, timePeriodMs: number);
}
