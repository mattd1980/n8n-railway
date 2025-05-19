"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioDataImporter = void 0;
const workflows_api_client_1 = require("../n8n-api-client/workflows-api-client");
class ScenarioDataImporter {
    constructor(n8nApiClient) {
        this.workflowApiClient = new workflows_api_client_1.WorkflowApiClient(n8nApiClient);
    }
    async importTestScenarioData(workflows) {
        const existingWorkflows = await this.workflowApiClient.getAllWorkflows();
        for (const workflow of workflows) {
            await this.importWorkflow({ existingWorkflows, workflow });
        }
    }
    async importWorkflow(opts) {
        const existingWorkflows = this.findExistingWorkflows(opts.existingWorkflows, opts.workflow);
        if (existingWorkflows.length > 0) {
            for (const toDelete of existingWorkflows) {
                await this.workflowApiClient.deleteWorkflow(toDelete.id);
            }
        }
        const createdWorkflow = await this.workflowApiClient.createWorkflow({
            ...opts.workflow,
            name: this.getBenchmarkWorkflowName(opts.workflow),
        });
        return await this.workflowApiClient.activateWorkflow(createdWorkflow);
    }
    findExistingWorkflows(existingWorkflows, workflowToImport) {
        const benchmarkWorkflowName = this.getBenchmarkWorkflowName(workflowToImport);
        return existingWorkflows.filter((existingWorkflow) => existingWorkflow.name === benchmarkWorkflowName);
    }
    getBenchmarkWorkflowName(workflow) {
        return `[BENCHMARK] ${workflow.name}`;
    }
}
exports.ScenarioDataImporter = ScenarioDataImporter;
//# sourceMappingURL=scenario-data-importer.js.map