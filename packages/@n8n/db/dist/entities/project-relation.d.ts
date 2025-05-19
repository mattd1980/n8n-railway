import { ProjectRole } from '@n8n/permissions';
import { WithTimestamps } from './abstract-entity';
import { Project } from './project';
import { User } from './user';
export declare class ProjectRelation extends WithTimestamps {
    role: ProjectRole;
    user: User;
    userId: string;
    project: Project;
    projectId: string;
}
