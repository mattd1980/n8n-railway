import { EventEmitter } from 'events';
import { IExecuteFunctions, INodeExecutionData, IWorkflowDataProxyData, ISupplyDataFunctions } from 'n8n-workflow';

interface SandboxTextKeys {
    object: {
        singular: string;
        plural: string;
    };
}
interface SandboxContext extends IWorkflowDataProxyData {
    $getNodeParameter: IExecuteFunctions['getNodeParameter'];
    $getWorkflowStaticData: IExecuteFunctions['getWorkflowStaticData'];
    helpers: IExecuteFunctions['helpers'];
}
declare const REQUIRED_N8N_ITEM_KEYS: Set<string>;
declare function getSandboxContext(this: IExecuteFunctions | ISupplyDataFunctions, index: number): SandboxContext;
declare abstract class Sandbox extends EventEmitter {
    private textKeys;
    protected helpers: IExecuteFunctions['helpers'];
    constructor(textKeys: SandboxTextKeys, helpers: IExecuteFunctions['helpers']);
    abstract runCode<T = unknown>(): Promise<T>;
    abstract runCodeAllItems(): Promise<INodeExecutionData[] | INodeExecutionData[][]>;
    abstract runCodeEachItem(itemIndex: number): Promise<INodeExecutionData | undefined>;
    validateRunCodeEachItem(executionResult: INodeExecutionData | undefined, itemIndex: number): INodeExecutionData;
    validateRunCodeAllItems(executionResult: INodeExecutionData | INodeExecutionData[] | undefined): INodeExecutionData[];
    private getTextKey;
    private validateItem;
    private validateTopLevelKeys;
}

export { REQUIRED_N8N_ITEM_KEYS, Sandbox, type SandboxContext, getSandboxContext };
