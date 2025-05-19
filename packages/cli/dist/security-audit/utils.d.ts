import type { IWorkflowBase } from 'n8n-workflow';
import type { Risk } from '../security-audit/types';
type Node = IWorkflowBase['nodes'][number];
export declare const toFlaggedNode: ({ node, workflow }: {
    node: Node;
    workflow: IWorkflowBase;
}) => {
    kind: "node";
    workflowId: string;
    workflowName: string;
    nodeId: string;
    nodeName: string;
    nodeType: string;
};
export declare const toReportTitle: (riskCategory: Risk.Category) => string;
export declare function getNodeTypes(workflows: IWorkflowBase[], test: (element: Node) => boolean): Risk.NodeLocation[];
export {};
