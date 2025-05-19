import type { INode, IRunData, Workflow } from 'n8n-workflow';
export declare function findTriggerForPartialExecution(workflow: Workflow, destinationNodeName: string, runData: IRunData): INode | undefined;
