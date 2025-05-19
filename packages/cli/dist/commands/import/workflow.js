"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportWorkflowsCommand = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const core_1 = require("@oclif/core");
const fast_glob_1 = __importDefault(require("fast-glob"));
const fs_1 = __importDefault(require("fs"));
const n8n_workflow_1 = require("n8n-workflow");
const constants_1 = require("../../constants");
const import_service_1 = require("../../services/import.service");
const base_command_1 = require("../base-command");
function assertHasWorkflowsToImport(workflows) {
    for (const workflow of workflows) {
        if (typeof workflow !== 'object' ||
            !Object.prototype.hasOwnProperty.call(workflow, 'nodes') ||
            !Object.prototype.hasOwnProperty.call(workflow, 'connections')) {
            throw new n8n_workflow_1.UserError('File does not seem to contain valid workflows.');
        }
    }
}
class ImportWorkflowsCommand extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(ImportWorkflowsCommand);
        if (!flags.input) {
            this.logger.info('An input file or directory with --input must be provided');
            return;
        }
        if (flags.separate) {
            if (fs_1.default.existsSync(flags.input)) {
                if (!fs_1.default.lstatSync(flags.input).isDirectory()) {
                    this.logger.info('The argument to --input must be a directory');
                    return;
                }
            }
        }
        if (flags.projectId && flags.userId) {
            throw new n8n_workflow_1.UserError('You cannot use `--userId` and `--projectId` together. Use one or the other.');
        }
        const project = await this.getProject(flags.userId, flags.projectId);
        const workflows = await this.readWorkflows(flags.input, flags.separate);
        const result = await this.checkRelations(workflows, flags.projectId, flags.userId);
        if (!result.success) {
            throw new n8n_workflow_1.UserError(result.message);
        }
        this.logger.info(`Importing ${workflows.length} workflows...`);
        await di_1.Container.get(import_service_1.ImportService).importWorkflows(workflows, project.id);
        this.reportSuccess(workflows.length);
    }
    async checkRelations(workflows, projectId, userId) {
        if (!userId && !projectId) {
            return {
                success: true,
                message: undefined,
            };
        }
        for (const workflow of workflows) {
            if (!(await this.workflowExists(workflow.id))) {
                continue;
            }
            const { user, project: ownerProject } = await this.getWorkflowOwner(workflow.id);
            if (!ownerProject) {
                continue;
            }
            if (ownerProject.id !== projectId) {
                const currentOwner = ownerProject.type === 'personal'
                    ? `the user with the ID "${user.id}"`
                    : `the project with the ID "${ownerProject.id}"`;
                const newOwner = userId
                    ?
                        `the user with the ID "${userId}"`
                    : `the project with the ID "${projectId}"`;
                return {
                    success: false,
                    message: `The credential with ID "${workflow.id}" is already owned by ${currentOwner}. It can't be re-owned by ${newOwner}.`,
                };
            }
        }
        return {
            success: true,
            message: undefined,
        };
    }
    async catch(error) {
        this.logger.error('An error occurred while importing workflows. See log messages for details.');
        this.logger.error(error.message);
    }
    reportSuccess(total) {
        this.logger.info(`Successfully imported ${total} ${total === 1 ? 'workflow.' : 'workflows.'}`);
    }
    async getWorkflowOwner(workflowId) {
        const sharing = await di_1.Container.get(db_1.SharedWorkflowRepository).findOne({
            where: { workflowId, role: 'workflow:owner' },
            relations: { project: true },
        });
        if (sharing && sharing.project.type === 'personal') {
            const user = await di_1.Container.get(db_1.UserRepository).findOneByOrFail({
                projectRelations: {
                    role: 'project:personalOwner',
                    projectId: sharing.projectId,
                },
            });
            return { user, project: sharing.project };
        }
        return {};
    }
    async workflowExists(workflowId) {
        return await di_1.Container.get(db_1.WorkflowRepository).existsBy({ id: workflowId });
    }
    async readWorkflows(path, separate) {
        if (process.platform === 'win32') {
            path = path.replace(/\\/g, '/');
        }
        const workflowRepository = di_1.Container.get(db_1.WorkflowRepository);
        if (separate) {
            const files = await (0, fast_glob_1.default)('*.json', {
                cwd: path,
                absolute: true,
            });
            return files.map((file) => {
                const workflow = (0, n8n_workflow_1.jsonParse)(fs_1.default.readFileSync(file, { encoding: 'utf8' }));
                if (!workflow.id) {
                    workflow.id = (0, db_1.generateNanoId)();
                }
                return workflowRepository.create(workflow);
            });
        }
        else {
            const workflows = (0, n8n_workflow_1.jsonParse)(fs_1.default.readFileSync(path, { encoding: 'utf8' }));
            const workflowsArray = Array.isArray(workflows) ? workflows : [workflows];
            assertHasWorkflowsToImport(workflowsArray);
            return workflowRepository.create(workflowsArray);
        }
    }
    async getProject(userId, projectId) {
        if (projectId) {
            return await di_1.Container.get(db_1.ProjectRepository).findOneByOrFail({ id: projectId });
        }
        if (!userId) {
            const owner = await di_1.Container.get(db_1.UserRepository).findOneBy({ role: 'global:owner' });
            if (!owner) {
                throw new n8n_workflow_1.UserError(`Failed to find owner. ${constants_1.UM_FIX_INSTRUCTION}`);
            }
            userId = owner.id;
        }
        return await di_1.Container.get(db_1.ProjectRepository).getPersonalProjectForUserOrFail(userId);
    }
}
exports.ImportWorkflowsCommand = ImportWorkflowsCommand;
ImportWorkflowsCommand.description = 'Import workflows';
ImportWorkflowsCommand.examples = [
    '$ n8n import:workflow --input=file.json',
    '$ n8n import:workflow --separate --input=backups/latest/',
    '$ n8n import:workflow --input=file.json --userId=1d64c3d2-85fe-4a83-a649-e446b07b3aae',
    '$ n8n import:workflow --input=file.json --projectId=Ox8O54VQrmBrb4qL',
    '$ n8n import:workflow --separate --input=backups/latest/ --userId=1d64c3d2-85fe-4a83-a649-e446b07b3aae',
];
ImportWorkflowsCommand.flags = {
    help: core_1.Flags.help({ char: 'h' }),
    input: core_1.Flags.string({
        char: 'i',
        description: 'Input file name or directory if --separate is used',
    }),
    separate: core_1.Flags.boolean({
        description: 'Imports *.json files from directory provided by --input',
    }),
    userId: core_1.Flags.string({
        description: 'The ID of the user to assign the imported workflows to',
    }),
    projectId: core_1.Flags.string({
        description: 'The ID of the project to assign the imported workflows to',
    }),
};
//# sourceMappingURL=workflow.js.map