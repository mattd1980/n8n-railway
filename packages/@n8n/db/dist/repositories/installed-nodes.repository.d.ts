import { DataSource, Repository } from '@n8n/typeorm';
import { InstalledNodes } from '../entities';
export declare class InstalledNodesRepository extends Repository<InstalledNodes> {
    constructor(dataSource: DataSource);
}
