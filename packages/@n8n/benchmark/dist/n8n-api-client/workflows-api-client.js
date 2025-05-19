"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowApiClient = void 0;
class WorkflowApiClient {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    async getAllWorkflows() {
        const response = await this.apiClient.get('/workflows');
        return response.data.data;
    }
    async createWorkflow(workflow) {
        const response = await this.apiClient.post('/workflows', workflow);
        return response.data.data;
    }
    async activateWorkflow(workflow) {
        const response = await this.apiClient.patch(`/workflows/${workflow.id}`, {
            ...workflow,
            active: true,
        });
        return response.data.data;
    }
    async deleteWorkflow(workflowId) {
        await this.apiClient.delete(`/workflows/${workflowId}`);
    }
}
exports.WorkflowApiClient = WorkflowApiClient;
//# sourceMappingURL=workflows-api-client.js.map