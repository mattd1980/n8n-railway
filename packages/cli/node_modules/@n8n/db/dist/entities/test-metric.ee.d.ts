import { WithTimestampsAndStringId } from './abstract-entity';
import { TestDefinition } from './test-definition.ee';
export declare class TestMetric extends WithTimestampsAndStringId {
    name: string;
    testDefinition: TestDefinition;
}
