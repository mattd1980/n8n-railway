import type { FunctionsBase, ICredentialDataDecryptedObject, IExecuteData, IGetNodeParameterOptions, INode, INodeExecutionData, INodeInputConfiguration, INodeOutputConfiguration, IRunExecutionData, IWorkflowExecuteAdditionalData, NodeConnectionType, NodeParameterValueType, NodeTypeAndVersion, Workflow, WorkflowExecuteMode } from 'n8n-workflow';
import { InstanceSettings } from '../../instance-settings';
import { Logger } from '../../logging/logger';
export declare abstract class NodeExecutionContext implements Omit<FunctionsBase, 'getCredentials'> {
    readonly workflow: Workflow;
    readonly node: INode;
    readonly additionalData: IWorkflowExecuteAdditionalData;
    readonly mode: WorkflowExecuteMode;
    readonly runExecutionData: IRunExecutionData | null;
    readonly runIndex: number;
    readonly connectionInputData: INodeExecutionData[];
    readonly executeData?: IExecuteData | undefined;
    protected readonly instanceSettings: InstanceSettings;
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, runExecutionData?: IRunExecutionData | null, runIndex?: number, connectionInputData?: INodeExecutionData[], executeData?: IExecuteData | undefined);
    get logger(): Logger;
    getExecutionId(): string;
    getNode(): INode;
    getWorkflow(): {
        id: string;
        name: string | undefined;
        active: boolean;
    };
    getMode(): WorkflowExecuteMode;
    getWorkflowStaticData(type: string): import("n8n-workflow").IDataObject;
    getChildNodes(nodeName: string, options?: {
        includeNodeParameters?: boolean;
    }): NodeTypeAndVersion[];
    getParentNodes(nodeName: string): NodeTypeAndVersion[];
    get nodeType(): import("n8n-workflow").INodeType;
    get nodeInputs(): INodeInputConfiguration[];
    getNodeInputs(): INodeInputConfiguration[];
    get nodeOutputs(): INodeOutputConfiguration[];
    getConnectedNodes(connectionType: NodeConnectionType): INode[];
    getNodeOutputs(): INodeOutputConfiguration[];
    getKnownNodeTypes(): import("n8n-workflow").IDataObject;
    getRestApiUrl(): string;
    getInstanceBaseUrl(): string;
    getInstanceId(): string;
    getTimezone(): string;
    getCredentialsProperties(type: string): import("n8n-workflow").INodeProperties[];
    protected _getCredentials<T extends object = ICredentialDataDecryptedObject>(type: string, executeData?: IExecuteData, connectionInputData?: INodeExecutionData[], itemIndex?: number): Promise<T>;
    protected get additionalKeys(): import("n8n-workflow").IWorkflowDataProxyAdditionalKeys;
    getNodeParameter(parameterName: string, fallbackValue?: any, options?: IGetNodeParameterOptions): NodeParameterValueType | object;
    protected _getNodeParameter(parameterName: string, itemIndex: number, fallbackValue?: any, options?: IGetNodeParameterOptions): NodeParameterValueType | object;
    evaluateExpression(expression: string, itemIndex?: number): import("n8n-workflow").INodeParameters | import("n8n-workflow").NodeParameterValue | import("n8n-workflow").INodeParameters[] | import("n8n-workflow").NodeParameterValue[];
    prepareOutputData(outputData: INodeExecutionData[]): Promise<INodeExecutionData[][]>;
}
