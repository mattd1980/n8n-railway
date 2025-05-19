import type { IDataObject, IExecuteData, INodeExecutionData, INodeParameters, IRunExecutionData, IWorkflowDataProxyAdditionalKeys, IWorkflowDataProxyData, WorkflowExecuteMode } from './Interfaces';
import type { Workflow } from './Workflow';
import type { EnvProviderState } from './WorkflowDataProxyEnvProvider';
export declare class WorkflowDataProxy {
    private workflow;
    private runIndex;
    private itemIndex;
    private activeNodeName;
    private siblingParameters;
    private mode;
    private additionalKeys;
    private executeData?;
    private defaultReturnRunIndex;
    private selfData;
    private contextNodeName;
    private envProviderState?;
    private runExecutionData;
    private connectionInputData;
    private timezone;
    constructor(workflow: Workflow, runExecutionData: IRunExecutionData | null, runIndex: number, itemIndex: number, activeNodeName: string, connectionInputData: INodeExecutionData[], siblingParameters: INodeParameters, mode: WorkflowExecuteMode, additionalKeys: IWorkflowDataProxyAdditionalKeys, executeData?: IExecuteData | undefined, defaultReturnRunIndex?: number, selfData?: IDataObject, contextNodeName?: string, envProviderState?: EnvProviderState | undefined);
    private nodeContextGetter;
    private selfGetter;
    private buildAgentToolInfo;
    private agentInfo;
    private nodeParameterGetter;
    private getNodeExecutionOrPinnedData;
    private getNodeExecutionData;
    private nodeDataGetter;
    private prevNodeGetter;
    private workflowGetter;
    private nodeGetter;
    getDataProxy(opts?: {
        throwOnMissingExecutionData: boolean;
    }): IWorkflowDataProxyData;
}
