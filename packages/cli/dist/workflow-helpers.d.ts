import type { IDataObject, IRun, ITaskData, IWorkflowBase } from 'n8n-workflow';
export declare function getDataLastExecutedNodeData(inputData: IRun): ITaskData | undefined;
export declare function addNodeIds(workflow: IWorkflowBase): void;
export declare function replaceInvalidCredentials<T extends IWorkflowBase>(workflow: T): Promise<T>;
export declare function getVariables(): Promise<IDataObject>;
