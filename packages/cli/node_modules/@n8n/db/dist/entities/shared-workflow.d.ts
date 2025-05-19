import { WorkflowSharingRole } from '@n8n/permissions';
import { WithTimestamps } from './abstract-entity';
import { Project } from './project';
import { WorkflowEntity } from './workflow-entity';
export declare class SharedWorkflow extends WithTimestamps {
    role: WorkflowSharingRole;
    workflow: WorkflowEntity;
    workflowId: string;
    project: Project;
    projectId: string;
}
