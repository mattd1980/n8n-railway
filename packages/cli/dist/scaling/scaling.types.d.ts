import type { RunningJobSummary } from '@n8n/api-types';
import type Bull from 'bull';
import type { ExecutionError, IExecuteResponsePromiseData, IRun } from 'n8n-workflow';
import type PCancelable from 'p-cancelable';
export type JobQueue = Bull.Queue<JobData>;
export type Job = Bull.Job<JobData>;
export type JobId = Job['id'];
export type JobData = {
    executionId: string;
    loadStaticData: boolean;
    pushRef?: string;
};
export type JobResult = {
    success: boolean;
    error?: ExecutionError;
};
export type JobStatus = Bull.JobStatus;
export type JobOptions = Bull.JobOptions;
export type JobMessage = RespondToWebhookMessage | JobFinishedMessage | JobFailedMessage | AbortJobMessage;
export type RespondToWebhookMessage = {
    kind: 'respond-to-webhook';
    executionId: string;
    response: IExecuteResponsePromiseData;
    workerId: string;
};
export type JobFinishedMessage = {
    kind: 'job-finished';
    executionId: string;
    workerId: string;
};
export type JobFailedMessage = {
    kind: 'job-failed';
    executionId: string;
    workerId: string;
    errorMsg: string;
    errorStack: string;
};
export type AbortJobMessage = {
    kind: 'abort-job';
};
export type RunningJob = RunningJobSummary & {
    run: PCancelable<IRun>;
};
export type QueueRecoveryContext = {
    timeout?: NodeJS.Timeout;
    batchSize: number;
    waitMs: number;
};
