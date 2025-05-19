import { DataSource, Repository } from '@n8n/typeorm';
import { Variables } from '../entities';
export declare class VariablesRepository extends Repository<Variables> {
    constructor(dataSource: DataSource);
}
