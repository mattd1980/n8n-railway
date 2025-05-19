import { DataSource, Repository } from '@n8n/typeorm';
import { CredentialsEntity } from '../entities';
import type { User } from '../entities';
import type { ListQuery } from '../entities/types-db';
export declare class CredentialsRepository extends Repository<CredentialsEntity> {
    constructor(dataSource: DataSource);
    findStartingWith(credentialName: string): Promise<CredentialsEntity[]>;
    findMany(listQueryOptions?: ListQuery.Options & {
        includeData?: boolean;
        user?: User;
    }, credentialIds?: string[]): Promise<CredentialsEntity[]>;
    private toFindManyOptions;
    private handleSharedFilters;
    getManyByIds(ids: string[], { withSharings }?: {
        withSharings: boolean;
    }): Promise<CredentialsEntity[]>;
    findAllPersonalCredentials(): Promise<CredentialsEntity[]>;
    findAllCredentialsForWorkflow(workflowId: string): Promise<CredentialsEntity[]>;
    findAllCredentialsForProject(projectId: string): Promise<CredentialsEntity[]>;
}
