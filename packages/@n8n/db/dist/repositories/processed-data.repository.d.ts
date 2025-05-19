import { DataSource, Repository } from '@n8n/typeorm';
import { ProcessedData } from '../entities';
export declare class ProcessedDataRepository extends Repository<ProcessedData> {
    constructor(dataSource: DataSource);
}
