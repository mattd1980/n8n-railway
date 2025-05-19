"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.K6Executor = void 0;
const fs_1 = __importDefault(require("fs"));
const strict_1 = __importDefault(require("node:assert/strict"));
const path_1 = __importDefault(require("path"));
const zx_1 = require("zx");
const test_report_1 = require("../test-execution/test-report");
class K6Executor {
    constructor(opts) {
        this.opts = opts;
        this.handleSummaryScript = `
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
export function handleSummary(data) {
	return {
		stdout: textSummary(data),
		'{{scenarioName}}.summary.json': JSON.stringify(data),
	};
}
`;
    }
    async executeTestScenario(scenario, { scenarioRunName }) {
        const augmentedTestScriptPath = this.augmentSummaryScript(scenario, scenarioRunName);
        const runDirPath = path_1.default.dirname(augmentedTestScriptPath);
        const flags = [
            ['--quiet'],
            ['--duration', this.opts.duration],
            ['--vus', this.opts.vus],
        ];
        if (!this.opts.resultsWebhook && this.opts.k6ApiToken) {
            flags.push(['--out', 'cloud']);
        }
        const flattedFlags = flags.flat(2);
        const k6ExecutablePath = await this.resolveK6ExecutablePath();
        await (0, zx_1.$)({
            cwd: runDirPath,
            env: {
                API_BASE_URL: this.opts.n8nApiBaseUrl,
                K6_CLOUD_TOKEN: this.opts.k6ApiToken,
            },
            stdio: 'inherit',
        }) `${k6ExecutablePath} run ${flattedFlags} ${augmentedTestScriptPath}`;
        console.log('\n');
        if (this.opts.resultsWebhook) {
            const endOfTestSummary = this.loadEndOfTestSummary(runDirPath, scenarioRunName);
            const testReport = (0, test_report_1.buildTestReport)(scenario, endOfTestSummary, [
                ...(this.opts.tags ?? []),
                { name: 'Vus', value: this.opts.vus.toString() },
                { name: 'Duration', value: this.opts.duration.toString() },
            ]);
            await this.sendTestReport(testReport);
        }
    }
    async sendTestReport(testReport) {
        (0, strict_1.default)(this.opts.resultsWebhook);
        const response = await fetch(this.opts.resultsWebhook.url, {
            method: 'POST',
            body: JSON.stringify(testReport),
            headers: {
                Authorization: this.opts.resultsWebhook.authHeader,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.warn(`Failed to send test summary: ${response.status} ${await response.text()}`);
        }
    }
    augmentSummaryScript(scenario, scenarioRunName) {
        const fullTestScriptPath = path_1.default.join(scenario.scenarioDirPath, scenario.scriptPath);
        const testScript = fs_1.default.readFileSync(fullTestScriptPath, 'utf8');
        const summaryScript = this.handleSummaryScript.replace('{{scenarioName}}', scenarioRunName);
        const augmentedTestScript = `${testScript}\n\n${summaryScript}`;
        const tempFilePath = (0, zx_1.tmpfile)(`${scenarioRunName}.js`, augmentedTestScript);
        return tempFilePath;
    }
    loadEndOfTestSummary(dir, scenarioRunName) {
        const summaryReportPath = path_1.default.join(dir, `${scenarioRunName}.summary.json`);
        const summaryReport = fs_1.default.readFileSync(summaryReportPath, 'utf8');
        try {
            return JSON.parse(summaryReport);
        }
        catch (error) {
            throw new Error(`Failed to parse the summary report at ${summaryReportPath}`);
        }
    }
    async resolveK6ExecutablePath() {
        const k6ExecutablePath = await (0, zx_1.which)(this.opts.k6ExecutablePath, { nothrow: true });
        if (!k6ExecutablePath) {
            throw new Error('Could not find k6 executable based on your `PATH`. Please ensure k6 is available in your system and add it to your `PATH` or specify the path to the k6 executable using the `K6_PATH` environment variable.');
        }
        return k6ExecutablePath;
    }
}
exports.K6Executor = K6Executor;
//# sourceMappingURL=k6-executor.js.map