import type { ExecutionBaseError, IConnection, IExecuteData, INode, INodeExecutionData, IPinData, IRun, IRunData, Workflow, IRunExecutionData, IWorkflowExecuteAdditionalData, WorkflowExecuteMode, StartNodeData, IRunNodeResponse, IWorkflowIssues, AiAgentRequest, IWorkflowExecutionDataProcess } from 'n8n-workflow';
import PCancelable from 'p-cancelable';
export declare class WorkflowExecute {
    private readonly additionalData;
    private readonly mode;
    private runExecutionData;
    private status;
    private readonly abortController;
    constructor(additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, runExecutionData?: IRunExecutionData);
    run(workflow: Workflow, startNode?: INode, destinationNode?: string, pinData?: IPinData, triggerToStartFrom?: IWorkflowExecutionDataProcess['triggerToStartFrom']): PCancelable<IRun>;
    forceInputNodeExecution(workflow: Workflow): boolean;
    runPartialWorkflow(workflow: Workflow, runData: IRunData, startNodes: StartNodeData[], destinationNode?: string, pinData?: IPinData): PCancelable<IRun>;
    runPartialWorkflow2(workflow: Workflow, runData: IRunData, pinData?: IPinData, dirtyNodeNames?: string[], destinationNodeName?: string, agentRequest?: AiAgentRequest): PCancelable<IRun>;
    moveNodeMetadata(): void;
    incomingConnectionIsEmpty(runData: IRunData, inputConnections: IConnection[], runIndex: number): boolean;
    prepareWaitingToExecution(nodeName: string, numberOfConnections: number, runIndex: number): void;
    addNodeToBeExecuted(workflow: Workflow, connectionData: IConnection, outputIndex: number, parentNodeName: string, nodeSuccessData: INodeExecutionData[][], runIndex: number): void;
    checkReadyForExecution(workflow: Workflow, inputData?: {
        startNode?: string;
        destinationNode?: string;
        pinDataNodeNames?: string[];
    }): IWorkflowIssues | null;
    private getCustomOperation;
    runNode(workflow: Workflow, executionData: IExecuteData, runExecutionData: IRunExecutionData, runIndex: number, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, abortSignal?: AbortSignal): Promise<IRunNodeResponse>;
    processRunExecutionData(workflow: Workflow): PCancelable<IRun>;
    ensureInputData(workflow: Workflow, executionNode: INode, executionData: IExecuteData): boolean;
    processSuccessExecution(startedAt: Date, workflow: Workflow, executionError?: ExecutionBaseError, closeFunction?: Promise<void>): Promise<IRun>;
    getFullRunData(startedAt: Date): IRun;
    handleNodeErrorOutput(workflow: Workflow, executionData: IExecuteData, nodeSuccessData: INodeExecutionData[][], runIndex: number): void;
    assignPairedItems(nodeSuccessData: INodeExecutionData[][] | null | undefined, executionData: IExecuteData): INodeExecutionData[][] | null;
    private get isCancelled();
}
