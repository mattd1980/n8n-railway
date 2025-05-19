import express from 'express';
import { TestRunnerService } from '../evaluation.ee/test-runner/test-runner.service.ee';
import { TestDefinitionService } from './test-definition.service.ee';
import { TestDefinitionsRequest } from './test-definitions.types.ee';
export declare class TestDefinitionsController {
    private readonly testDefinitionService;
    private readonly testRunnerService;
    constructor(testDefinitionService: TestDefinitionService, testRunnerService: TestRunnerService);
    getMany(req: TestDefinitionsRequest.GetMany): Promise<{
        tests: never[];
        count: number;
        testDefinitions?: undefined;
    } | {
        testDefinitions: import("@n8n/db").TestDefinition[];
        count: number;
        tests?: undefined;
    }>;
    getOne(req: TestDefinitionsRequest.GetOne): Promise<import("@n8n/db").TestDefinition>;
    create(req: TestDefinitionsRequest.Create, res: express.Response): Promise<import("@n8n/db").TestDefinition | undefined>;
    delete(req: TestDefinitionsRequest.Delete): Promise<{
        success: boolean;
    }>;
    patch(req: TestDefinitionsRequest.Patch, res: express.Response): Promise<import("@n8n/db").TestDefinition | undefined>;
    runTest(req: TestDefinitionsRequest.Run, res: express.Response): Promise<void>;
    exampleEvaluationInput(req: TestDefinitionsRequest.ExampleEvaluationInput): Promise<{
        annotations: {
            vote: import("n8n-workflow").AnnotationVote | null | undefined;
            tags: Pick<import("@n8n/db").AnnotationTagEntity, "id" | "name">[] | undefined;
            highlightedData: {
                [k: string]: string;
            };
        };
        originalExecution: Record<string, any>;
        newExecution: Record<string, any>;
    } | null>;
}
