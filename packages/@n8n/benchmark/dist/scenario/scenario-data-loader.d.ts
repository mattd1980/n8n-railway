import type { Workflow } from '../n8n-api-client/n8n-api-client.types';
import type { Scenario } from '../types/scenario';
export declare class ScenarioDataFileLoader {
    loadDataForScenario(scenario: Scenario): Promise<{
        workflows: Workflow[];
    }>;
    private loadSingleWorkflowFromFile;
}
