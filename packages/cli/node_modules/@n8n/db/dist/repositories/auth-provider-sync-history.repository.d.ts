import { DataSource, Repository } from '@n8n/typeorm';
import { AuthProviderSyncHistory } from '../entities';
export declare class AuthProviderSyncHistoryRepository extends Repository<AuthProviderSyncHistory> {
    constructor(dataSource: DataSource);
}
