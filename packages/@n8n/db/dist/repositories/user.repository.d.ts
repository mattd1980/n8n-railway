import type { DeepPartial, EntityManager, FindManyOptions } from '@n8n/typeorm';
import { DataSource, Repository } from '@n8n/typeorm';
import { Project, User } from '../entities';
import type { ListQuery } from '../entities/types-db';
export declare class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource);
    findManyByIds(userIds: string[]): Promise<User[]>;
    update(...args: Parameters<Repository<User>['update']>): Promise<import("@n8n/typeorm").UpdateResult>;
    deleteAllExcept(user: User): Promise<void>;
    getByIds(transaction: EntityManager, ids: string[]): Promise<User[]>;
    findManyByEmail(emails: string[]): Promise<User[]>;
    deleteMany(userIds: string[]): Promise<import("@n8n/typeorm").DeleteResult>;
    findNonShellUser(email: string): Promise<User | null>;
    countUsersByRole(): Promise<Record<"global:owner" | "global:admin" | "global:member", number>>;
    toFindManyOptions(listQueryOptions?: ListQuery.Options): Promise<FindManyOptions<User>>;
    getEmailsByIds(userIds: string[]): Promise<User[]>;
    createUserWithProject(user: DeepPartial<User>, transactionManager?: EntityManager): Promise<{
        user: User;
        project: Project;
    }>;
    findPersonalOwnerForWorkflow(workflowId: string): Promise<User | null>;
    findPersonalOwnerForProject(projectId: string): Promise<User | null>;
}
