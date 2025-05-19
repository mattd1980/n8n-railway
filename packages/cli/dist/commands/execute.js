"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Execute = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const core_1 = require("@oclif/core");
const n8n_workflow_1 = require("n8n-workflow");
const active_executions_1 = require("../active-executions");
const ownership_service_1 = require("../services/ownership.service");
const utils_1 = require("../utils");
const workflow_runner_1 = require("../workflow-runner");
const base_command_1 = require("./base-command");
const config_1 = __importDefault(require("../config"));
class Execute extends base_command_1.BaseCommand {
    constructor() {
        super(...arguments);
        this.needsCommunityPackages = true;
        this.needsTaskRunner = true;
    }
    async init() {
        await super.init();
        await this.initBinaryDataService();
        await this.initDataDeduplicationService();
        await this.initExternalHooks();
    }
    async run() {
        const { flags } = await this.parse(Execute);
        if (!flags.id) {
            this.logger.info('"--id" has to be set!');
            return;
        }
        if (flags.file) {
            throw new n8n_workflow_1.UserError('The --file flag is no longer supported. Please first import the workflow and then execute it using the --id flag.', { level: 'warning' });
        }
        let workflowId;
        let workflowData = null;
        if (flags.id) {
            workflowId = flags.id;
            workflowData = await di_1.Container.get(db_1.WorkflowRepository).findOneBy({ id: workflowId });
            if (workflowData === null) {
                this.logger.info(`The workflow with the id "${workflowId}" does not exist.`);
                process.exit(1);
            }
        }
        if (!workflowData) {
            throw new n8n_workflow_1.UnexpectedError('Failed to retrieve workflow data for requested workflow');
        }
        if (!(0, utils_1.isWorkflowIdValid)(workflowId)) {
            workflowId = undefined;
        }
        const startingNode = (0, utils_1.findCliWorkflowStart)(workflowData.nodes);
        const user = await di_1.Container.get(ownership_service_1.OwnershipService).getInstanceOwner();
        const runData = {
            executionMode: 'cli',
            startNodes: [{ name: startingNode.name, sourceData: null }],
            workflowData,
            userId: user.id,
        };
        const workflowRunner = di_1.Container.get(workflow_runner_1.WorkflowRunner);
        if (config_1.default.getEnv('executions.mode') === 'queue') {
            this.logger.warn('CLI command `execute` does not support queue mode. Falling back to regular mode.');
            workflowRunner.setExecutionMode('regular');
        }
        const executionId = await workflowRunner.run(runData);
        const activeExecutions = di_1.Container.get(active_executions_1.ActiveExecutions);
        const data = await activeExecutions.getPostExecutePromise(executionId);
        if (data === undefined) {
            throw new n8n_workflow_1.UnexpectedError('Workflow did not return any data');
        }
        if (data.data.resultData.error) {
            this.logger.info('Execution was NOT successful. See log message for details.');
            this.logger.info('Execution error:');
            this.logger.info('====================================');
            this.logger.info(JSON.stringify(data, null, 2));
            const { error } = data.data.resultData;
            throw {
                ...error,
                stack: error.stack,
            };
        }
        if (flags.rawOutput === undefined) {
            this.log('Execution was successful:');
            this.log('====================================');
        }
        this.log(JSON.stringify(data, null, 2));
    }
    async catch(error) {
        this.logger.error('Error executing workflow. See log messages for details.');
        this.logger.error('\nExecution error:');
        this.logger.info('====================================');
        this.logger.error(error.message);
        if (error instanceof n8n_workflow_1.ExecutionBaseError)
            this.logger.error(error.description);
        this.logger.error(error.stack);
    }
}
exports.Execute = Execute;
Execute.description = '\nExecutes a given workflow';
Execute.examples = ['$ n8n execute --id=5'];
Execute.flags = {
    help: core_1.Flags.help({ char: 'h' }),
    id: core_1.Flags.string({
        description: 'id of the workflow to execute',
    }),
    rawOutput: core_1.Flags.boolean({
        description: 'Outputs only JSON data, with no other text',
    }),
};
//# sourceMappingURL=execute.js.map