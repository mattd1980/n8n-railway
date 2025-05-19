import { DataSource, Repository } from '@n8n/typeorm';
import { ApiKey } from '../entities';
export declare class ApiKeyRepository extends Repository<ApiKey> {
    constructor(dataSource: DataSource);
}
