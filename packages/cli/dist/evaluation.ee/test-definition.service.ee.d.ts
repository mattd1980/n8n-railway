import type { TestDefinition } from '@n8n/db';
import { AnnotationTagRepository, TestDefinitionRepository } from '@n8n/db';
import type { ListQuery } from '../requests';
import { Telemetry } from '../telemetry';
type TestDefinitionLike = Omit<Partial<TestDefinition>, 'workflow' | 'evaluationWorkflow' | 'annotationTag' | 'metrics'> & {
    workflow?: {
        id: string;
    };
    evaluationWorkflow?: {
        id: string;
    };
    annotationTag?: {
        id: string;
    };
};
export declare class TestDefinitionService {
    private testDefinitionRepository;
    private annotationTagRepository;
    private telemetry;
    constructor(testDefinitionRepository: TestDefinitionRepository, annotationTagRepository: AnnotationTagRepository, telemetry: Telemetry);
    private toEntityLike;
    toEntity(attrs: {
        name?: string;
        workflowId?: string;
        evaluationWorkflowId?: string;
        annotationTagId?: string;
        id?: string;
    }): TestDefinition;
    findOne(id: string, accessibleWorkflowIds: string[]): Promise<TestDefinition | null>;
    save(test: TestDefinition): Promise<TestDefinition>;
    update(id: string, attrs: TestDefinitionLike): Promise<void>;
    delete(id: string, accessibleWorkflowIds: string[]): Promise<void>;
    getMany(options: ListQuery.Options, accessibleWorkflowIds?: string[]): Promise<{
        tests: never[];
        count: number;
        testDefinitions?: undefined;
    } | {
        testDefinitions: TestDefinition[];
        count: number;
        tests?: undefined;
    }>;
}
export {};
