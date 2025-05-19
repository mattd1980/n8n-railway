import { DataSource, Repository } from '@n8n/typeorm';
import { TestMetric } from '../entities';
export declare class TestMetricRepository extends Repository<TestMetric> {
    constructor(dataSource: DataSource);
}
