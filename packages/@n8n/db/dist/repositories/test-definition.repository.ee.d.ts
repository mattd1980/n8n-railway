import { DataSource, Repository } from '@n8n/typeorm';
import { TestDefinition } from '../entities';
import type { ListQuery } from '../entities/types-db';
export declare class TestDefinitionRepository extends Repository<TestDefinition> {
    constructor(dataSource: DataSource);
    getMany(accessibleWorkflowIds: string[], options?: ListQuery.Options): Promise<{
        tests: never[];
        count: number;
        testDefinitions?: undefined;
    } | {
        testDefinitions: TestDefinition[];
        count: number;
        tests?: undefined;
    }>;
    getOne(id: string, accessibleWorkflowIds: string[]): Promise<TestDefinition | null>;
    deleteById(id: string, accessibleWorkflowIds: string[]): Promise<import("@n8n/typeorm").DeleteResult>;
}
