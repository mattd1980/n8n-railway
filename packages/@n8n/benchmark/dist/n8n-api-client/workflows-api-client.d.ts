import type { Workflow } from '../n8n-api-client/n8n-api-client.types';
import type { AuthenticatedN8nApiClient } from './authenticated-n8n-api-client';
export declare class WorkflowApiClient {
    private readonly apiClient;
    constructor(apiClient: AuthenticatedN8nApiClient);
    getAllWorkflows(): Promise<Workflow[]>;
    createWorkflow(workflow: unknown): Promise<Workflow>;
    activateWorkflow(workflow: Workflow): Promise<Workflow>;
    deleteWorkflow(workflowId: Workflow['id']): Promise<void>;
}
