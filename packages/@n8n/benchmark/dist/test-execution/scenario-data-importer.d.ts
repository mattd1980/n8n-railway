import type { AuthenticatedN8nApiClient } from '../n8n-api-client/authenticated-n8n-api-client';
import type { Workflow } from '../n8n-api-client/n8n-api-client.types';
export declare class ScenarioDataImporter {
    private readonly workflowApiClient;
    constructor(n8nApiClient: AuthenticatedN8nApiClient);
    importTestScenarioData(workflows: Workflow[]): Promise<void>;
    private importWorkflow;
    private findExistingWorkflows;
    private getBenchmarkWorkflowName;
}
