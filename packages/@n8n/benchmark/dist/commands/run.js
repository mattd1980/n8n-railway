"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const common_flags_1 = require("../config/common-flags");
const n8n_api_client_1 = require("../n8n-api-client/n8n-api-client");
const scenario_data_loader_1 = require("../scenario/scenario-data-loader");
const scenario_loader_1 = require("../scenario/scenario-loader");
const k6_executor_1 = require("../test-execution/k6-executor");
const scenario_runner_1 = require("../test-execution/scenario-runner");
class RunCommand extends core_1.Command {
    async run() {
        const { flags } = await this.parse(RunCommand);
        const tags = await this.parseTags();
        const scenarioLoader = new scenario_loader_1.ScenarioLoader();
        const scenarioRunner = new scenario_runner_1.ScenarioRunner(new n8n_api_client_1.N8nApiClient(flags.n8nBaseUrl), new scenario_data_loader_1.ScenarioDataFileLoader(), new k6_executor_1.K6Executor({
            duration: flags.duration,
            vus: flags.vus,
            k6ExecutablePath: flags.k6ExecutablePath,
            k6ApiToken: flags.k6ApiToken,
            n8nApiBaseUrl: flags.n8nBaseUrl,
            tags,
            resultsWebhook: flags.resultWebhookUrl
                ? {
                    url: flags.resultWebhookUrl,
                    authHeader: flags.resultWebhookAuthHeader,
                }
                : undefined,
        }), {
            email: flags.n8nUserEmail,
            password: flags.n8nUserPassword,
        }, flags.scenarioNamePrefix);
        const allScenarios = scenarioLoader.loadAll(flags.testScenariosPath, flags.scenarioFilter);
        await scenarioRunner.runManyScenarios(allScenarios);
    }
    async parseTags() {
        const { flags } = await this.parse(RunCommand);
        if (!flags.tags) {
            return [];
        }
        return flags.tags.split(',').map((tag) => {
            const [name, value] = tag.split('=');
            return { name, value };
        });
    }
}
RunCommand.description = 'Run all (default) or specified test scenarios';
RunCommand.flags = {
    testScenariosPath: common_flags_1.testScenariosPath,
    scenarioFilter: core_1.Flags.string({
        char: 'f',
        description: 'Filter scenarios by name',
    }),
    scenarioNamePrefix: core_1.Flags.string({
        description: 'Prefix for the scenario name',
        default: 'Unnamed',
    }),
    n8nBaseUrl: core_1.Flags.string({
        description: 'The base URL for the n8n instance',
        default: 'http://localhost:5678',
        env: 'N8N_BASE_URL',
    }),
    n8nUserEmail: core_1.Flags.string({
        description: 'The email address of the n8n user',
        default: 'benchmark-user@n8n.io',
        env: 'N8N_USER_EMAIL',
    }),
    k6ExecutablePath: core_1.Flags.string({
        doc: 'The path to the k6 binary',
        default: 'k6',
        env: 'K6_PATH',
    }),
    k6ApiToken: core_1.Flags.string({
        doc: 'The API token for k6 cloud',
        default: undefined,
        env: 'K6_API_TOKEN',
    }),
    resultWebhookUrl: core_1.Flags.string({
        doc: 'The URL where the benchmark results should be sent to',
        default: undefined,
        env: 'BENCHMARK_RESULT_WEBHOOK_URL',
    }),
    resultWebhookAuthHeader: core_1.Flags.string({
        doc: 'The Authorization header value for the benchmark results webhook',
        default: undefined,
        env: 'BENCHMARK_RESULT_WEBHOOK_AUTH_HEADER',
    }),
    n8nUserPassword: core_1.Flags.string({
        description: 'The password of the n8n user',
        default: 'VerySecret!123',
        env: 'N8N_USER_PASSWORD',
    }),
    tags: core_1.Flags.string({
        char: 't',
        description: 'Tags to attach to the run. Comma separated list of key=value pairs',
    }),
    vus: core_1.Flags.integer({
        description: 'Number of concurrent requests to make',
        default: 5,
    }),
    duration: core_1.Flags.string({
        description: 'Duration of the test with a unit, e.g. 1m',
        default: '1m',
    }),
};
exports.default = RunCommand;
//# sourceMappingURL=run.js.map