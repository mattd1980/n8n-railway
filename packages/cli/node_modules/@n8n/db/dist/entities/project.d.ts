import { WithTimestampsAndStringId } from './abstract-entity';
import type { ProjectRelation } from './project-relation';
import type { SharedCredentials } from './shared-credentials';
import type { SharedWorkflow } from './shared-workflow';
export declare class Project extends WithTimestampsAndStringId {
    name: string;
    type: 'personal' | 'team';
    icon: {
        type: 'emoji' | 'icon';
        value: string;
    } | null;
    projectRelations: ProjectRelation[];
    sharedCredentials: SharedCredentials[];
    sharedWorkflows: SharedWorkflow[];
}
