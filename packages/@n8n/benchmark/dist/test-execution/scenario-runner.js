"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioRunner = void 0;
const zx_1 = require("zx");
const authenticated_n8n_api_client_1 = require("../n8n-api-client/authenticated-n8n-api-client");
const scenario_data_importer_1 = require("../test-execution/scenario-data-importer");
class ScenarioRunner {
    constructor(n8nClient, dataLoader, k6Executor, ownerConfig, scenarioPrefix) {
        this.n8nClient = n8nClient;
        this.dataLoader = dataLoader;
        this.k6Executor = k6Executor;
        this.ownerConfig = ownerConfig;
        this.scenarioPrefix = scenarioPrefix;
    }
    async runManyScenarios(scenarios) {
        console.log(`Waiting for n8n ${this.n8nClient.apiBaseUrl} to become online`);
        await this.n8nClient.waitForInstanceToBecomeOnline();
        console.log('Setting up owner');
        await this.n8nClient.setupOwnerIfNeeded(this.ownerConfig);
        const authenticatedN8nClient = await authenticated_n8n_api_client_1.AuthenticatedN8nApiClient.createUsingUsernameAndPassword(this.n8nClient, this.ownerConfig);
        const testDataImporter = new scenario_data_importer_1.ScenarioDataImporter(authenticatedN8nClient);
        for (const scenario of scenarios) {
            await this.runSingleTestScenario(testDataImporter, scenario);
        }
    }
    async runSingleTestScenario(testDataImporter, scenario) {
        const scenarioRunName = this.formTestScenarioRunName(scenario);
        console.log('Running scenario:', scenarioRunName);
        console.log('Loading and importing data');
        const testData = await this.dataLoader.loadDataForScenario(scenario);
        await testDataImporter.importTestScenarioData(testData.workflows);
        await (0, zx_1.sleep)(1000);
        console.log('Executing scenario script');
        await this.k6Executor.executeTestScenario(scenario, {
            scenarioRunName,
        });
    }
    formTestScenarioRunName(scenario) {
        return `${this.scenarioPrefix}-${scenario.name}`;
    }
}
exports.ScenarioRunner = ScenarioRunner;
//# sourceMappingURL=scenario-runner.js.map