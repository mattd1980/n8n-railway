import { IConnections } from 'n8n-workflow';
import type { INode } from 'n8n-workflow';
import { WithTimestamps } from './abstract-entity';
import { WorkflowEntity } from './workflow-entity';
export declare class WorkflowHistory extends WithTimestamps {
    versionId: string;
    workflowId: string;
    nodes: INode[];
    connections: IConnections;
    authors: string;
    workflow: WorkflowEntity;
}
