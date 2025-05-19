"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkflowCommand = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const core_1 = require("@oclif/core");
const base_command_1 = require("../base-command");
class UpdateWorkflowCommand extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(UpdateWorkflowCommand);
        if (!flags.all && !flags.id) {
            this.logger.error('Either option "--all" or "--id" have to be set!');
            return;
        }
        if (flags.all && flags.id) {
            this.logger.error('Either something else on top should be "--all" or "--id" can be set never both!');
            return;
        }
        if (flags.active === undefined) {
            this.logger.error('No update flag like "--active=true" has been set!');
            return;
        }
        if (!['false', 'true'].includes(flags.active)) {
            this.logger.error('Valid values for flag "--active" are only "false" or "true"!');
            return;
        }
        const newState = flags.active === 'true';
        const action = newState ? 'Activating' : 'Deactivating';
        if (flags.id) {
            this.logger.info(`${action} workflow with ID: ${flags.id}`);
            await di_1.Container.get(db_1.WorkflowRepository).updateActiveState(flags.id, newState);
        }
        else {
            this.logger.info(`${action} all workflows`);
            if (newState) {
                await di_1.Container.get(db_1.WorkflowRepository).activateAll();
            }
            else {
                await di_1.Container.get(db_1.WorkflowRepository).deactivateAll();
            }
        }
        this.logger.info('Activation or deactivation will not take effect if n8n is running.');
        this.logger.info('Please restart n8n for changes to take effect if n8n is currently running.');
    }
    async catch(error) {
        this.logger.error('Error updating database. See log messages for details.');
        this.logger.error('\nGOT ERROR');
        this.logger.error('====================================');
        this.logger.error(error.message);
        this.logger.error(error.stack);
    }
}
exports.UpdateWorkflowCommand = UpdateWorkflowCommand;
UpdateWorkflowCommand.description = 'Update workflows';
UpdateWorkflowCommand.examples = [
    '$ n8n update:workflow --all --active=false',
    '$ n8n update:workflow --id=5 --active=true',
];
UpdateWorkflowCommand.flags = {
    help: core_1.Flags.help({ char: 'h' }),
    active: core_1.Flags.string({
        description: 'Active state the workflow/s should be set to',
    }),
    all: core_1.Flags.boolean({
        description: 'Operate on all workflows',
    }),
    id: core_1.Flags.string({
        description: 'The ID of the workflow to operate on',
    }),
};
//# sourceMappingURL=workflow.js.map