import type { TagEntity } from './tag-entity';
import type { WorkflowEntity } from './workflow-entity';
export declare class WorkflowTagMapping {
    workflowId: string;
    workflows: WorkflowEntity[];
    tagId: string;
    tags: TagEntity[];
}
