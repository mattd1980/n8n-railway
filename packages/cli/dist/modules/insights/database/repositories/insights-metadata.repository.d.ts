import { DataSource, Repository } from '@n8n/typeorm';
import { InsightsMetadata } from '../entities/insights-metadata';
export declare class InsightsMetadataRepository extends Repository<InsightsMetadata> {
    constructor(dataSource: DataSource);
}
