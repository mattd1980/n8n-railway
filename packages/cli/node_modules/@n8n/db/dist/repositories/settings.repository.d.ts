import { DataSource, Repository } from '@n8n/typeorm';
import { Settings } from '../entities';
export declare class SettingsRepository extends Repository<Settings> {
    constructor(dataSource: DataSource);
    findByKey(key: string): Promise<Settings | null>;
}
