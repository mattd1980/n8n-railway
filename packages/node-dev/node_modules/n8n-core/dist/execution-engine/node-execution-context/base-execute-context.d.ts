import type { Workflow, INode, IWorkflowExecuteAdditionalData, WorkflowExecuteMode, IRunExecutionData, INodeExecutionData, ITaskDataConnections, IExecuteData, ICredentialDataDecryptedObject, CallbackManager, IExecuteWorkflowInfo, RelatedExecution, ExecuteWorkflowData, ITaskMetadata, ContextType, IContextObject, IWorkflowDataProxyData, ISourceData, AiEvent, NodeConnectionType } from 'n8n-workflow';
import { BinaryDataService } from '../../binary-data/binary-data.service';
import { NodeExecutionContext } from './node-execution-context';
export declare class BaseExecuteContext extends NodeExecutionContext {
    readonly runExecutionData: IRunExecutionData;
    readonly connectionInputData: INodeExecutionData[];
    readonly inputData: ITaskDataConnections;
    readonly executeData: IExecuteData;
    readonly abortSignal?: AbortSignal | undefined;
    protected readonly binaryDataService: BinaryDataService;
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, runExecutionData: IRunExecutionData, runIndex: number, connectionInputData: INodeExecutionData[], inputData: ITaskDataConnections, executeData: IExecuteData, abortSignal?: AbortSignal | undefined);
    getExecutionCancelSignal(): AbortSignal | undefined;
    onExecutionCancellation(handler: () => unknown): void;
    getExecuteData(): IExecuteData;
    setMetadata(metadata: ITaskMetadata): void;
    getContext(type: ContextType): IContextObject;
    continueOnFail(): boolean;
    getCredentials<T extends object = ICredentialDataDecryptedObject>(type: string, itemIndex: number): Promise<T>;
    putExecutionToWait(waitTill: Date): Promise<void>;
    executeWorkflow(workflowInfo: IExecuteWorkflowInfo, inputData?: INodeExecutionData[], parentCallbackManager?: CallbackManager, options?: {
        doNotWaitToFinish?: boolean;
        parentExecution?: RelatedExecution;
    }): Promise<ExecuteWorkflowData>;
    protected getInputItems(inputIndex: number, connectionType: NodeConnectionType): INodeExecutionData[] | undefined;
    getInputSourceData(inputIndex?: number, connectionType?: "main"): ISourceData;
    getWorkflowDataProxy(itemIndex: number): IWorkflowDataProxyData;
    sendMessageToUI(...args: any[]): void;
    logAiEvent(eventName: AiEvent, msg: string): void;
}
