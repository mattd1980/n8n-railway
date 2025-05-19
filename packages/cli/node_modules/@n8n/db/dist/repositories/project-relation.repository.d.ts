import { DataSource, Repository } from '@n8n/typeorm';
import { ProjectRelation } from '../entities';
export declare class ProjectRelationRepository extends Repository<ProjectRelation> {
    constructor(dataSource: DataSource);
    getPersonalProjectOwners(projectIds: string[]): Promise<ProjectRelation[]>;
    getPersonalProjectsForUsers(userIds: string[]): Promise<string[]>;
    findProjectRole({ userId, projectId }: {
        userId: string;
        projectId: string;
    }): Promise<"project:personalOwner" | "project:admin" | "project:editor" | "project:viewer" | null>;
    countUsersByRole(): Promise<Record<"project:personalOwner" | "project:admin" | "project:editor" | "project:viewer", number>>;
    findUserIdsByProjectId(projectId: string): Promise<string[]>;
    findAllByUser(userId: string): Promise<ProjectRelation[]>;
}
