import { ExecutionLifecycleHooks } from 'n8n-core';
import type { IWorkflowBase, WorkflowExecuteMode, IWorkflowExecutionDataProcess } from 'n8n-workflow';
export declare function getLifecycleHooksForSubExecutions(mode: WorkflowExecuteMode, executionId: string, workflowData: IWorkflowBase, userId?: string): ExecutionLifecycleHooks;
export declare function getLifecycleHooksForScalingWorker(data: IWorkflowExecutionDataProcess, executionId: string): ExecutionLifecycleHooks;
export declare function getLifecycleHooksForScalingMain(data: IWorkflowExecutionDataProcess, executionId: string): ExecutionLifecycleHooks;
export declare function getLifecycleHooksForRegularMain(data: IWorkflowExecutionDataProcess, executionId: string): ExecutionLifecycleHooks;
