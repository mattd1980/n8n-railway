import { DataSource, Repository } from '@n8n/typeorm';
import { AuthIdentity } from '../entities';
export declare class AuthIdentityRepository extends Repository<AuthIdentity> {
    constructor(dataSource: DataSource);
}
