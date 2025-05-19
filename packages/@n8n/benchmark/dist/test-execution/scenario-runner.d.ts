import type { N8nApiClient } from '../n8n-api-client/n8n-api-client';
import type { ScenarioDataFileLoader } from '../scenario/scenario-data-loader';
import type { Scenario } from '../types/scenario';
import type { K6Executor } from './k6-executor';
export declare class ScenarioRunner {
    private readonly n8nClient;
    private readonly dataLoader;
    private readonly k6Executor;
    private readonly ownerConfig;
    private readonly scenarioPrefix;
    constructor(n8nClient: N8nApiClient, dataLoader: ScenarioDataFileLoader, k6Executor: K6Executor, ownerConfig: {
        email: string;
        password: string;
    }, scenarioPrefix: string);
    runManyScenarios(scenarios: Scenario[]): Promise<void>;
    private runSingleTestScenario;
    private formTestScenarioRunName;
}
