import { Logger } from 'n8n-core';
import type { IPinData, IRun, IWorkflowExecuteAdditionalData, IWorkflowExecutionDataProcess, Workflow } from 'n8n-workflow';
import type PCancelable from 'p-cancelable';
export declare class ManualExecutionService {
    private readonly logger;
    constructor(logger: Logger);
    getExecutionStartNode(data: IWorkflowExecutionDataProcess, workflow: Workflow): import("n8n-workflow").INode | undefined;
    runManually(data: IWorkflowExecutionDataProcess, workflow: Workflow, additionalData: IWorkflowExecuteAdditionalData, executionId: string, pinData?: IPinData): PCancelable<IRun>;
}
