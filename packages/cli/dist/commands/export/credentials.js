"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportCredentialsCommand = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const core_1 = require("@oclif/core");
const fs_1 = __importDefault(require("fs"));
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const path_1 = __importDefault(require("path"));
const base_command_1 = require("../base-command");
class ExportCredentialsCommand extends base_command_1.BaseCommand {
    async run() {
        const { flags } = await this.parse(ExportCredentialsCommand);
        if (flags.backup) {
            flags.all = true;
            flags.pretty = true;
            flags.separate = true;
        }
        if (!flags.all && !flags.id) {
            this.logger.info('Either option "--all" or "--id" have to be set!');
            return;
        }
        if (flags.all && flags.id) {
            this.logger.info('You should either use "--all" or "--id" but never both!');
            return;
        }
        if (flags.separate) {
            try {
                if (!flags.output) {
                    this.logger.info('You must inform an output directory via --output when using --separate');
                    return;
                }
                if (fs_1.default.existsSync(flags.output)) {
                    if (!fs_1.default.lstatSync(flags.output).isDirectory()) {
                        this.logger.info('The parameter --output must be a directory');
                        return;
                    }
                }
                else {
                    fs_1.default.mkdirSync(flags.output, { recursive: true });
                }
            }
            catch (e) {
                this.logger.error('Aborting execution as a filesystem error has been encountered while creating the output directory. See log messages for details.');
                this.logger.error('\nFILESYSTEM ERROR');
                if (e instanceof Error) {
                    this.logger.info('====================================');
                    this.logger.error(e.message);
                    this.logger.error(e.stack);
                }
                return;
            }
        }
        else if (flags.output) {
            if (fs_1.default.existsSync(flags.output)) {
                if (fs_1.default.lstatSync(flags.output).isDirectory()) {
                    this.logger.info('The parameter --output must be a writeable file');
                    return;
                }
            }
        }
        const credentials = await di_1.Container.get(db_1.CredentialsRepository).findBy(flags.id ? { id: flags.id } : {});
        if (flags.decrypted) {
            for (let i = 0; i < credentials.length; i++) {
                const { name, type, data } = credentials[i];
                const id = credentials[i].id;
                const credential = new n8n_core_1.Credentials({ id, name }, type, data);
                const plainData = credential.getData();
                credentials[i].data = plainData;
            }
        }
        if (credentials.length === 0) {
            throw new n8n_workflow_1.UserError('No credentials found with specified filters');
        }
        if (flags.separate) {
            let fileContents;
            let i;
            for (i = 0; i < credentials.length; i++) {
                fileContents = JSON.stringify(credentials[i], null, flags.pretty ? 2 : undefined);
                const filename = `${(flags.output.endsWith(path_1.default.sep) ? flags.output : flags.output + path_1.default.sep) +
                    credentials[i].id}.json`;
                fs_1.default.writeFileSync(filename, fileContents);
            }
            this.logger.info(`Successfully exported ${i} credentials.`);
        }
        else {
            const fileContents = JSON.stringify(credentials, null, flags.pretty ? 2 : undefined);
            if (flags.output) {
                fs_1.default.writeFileSync(flags.output, fileContents);
                this.logger.info(`Successfully exported ${credentials.length} credentials.`);
            }
            else {
                this.logger.info(fileContents);
            }
        }
    }
    async catch(error) {
        this.logger.error('Error exporting credentials. See log messages for details.');
        this.logger.error(error.message);
    }
}
exports.ExportCredentialsCommand = ExportCredentialsCommand;
ExportCredentialsCommand.description = 'Export credentials';
ExportCredentialsCommand.examples = [
    '$ n8n export:credentials --all',
    '$ n8n export:credentials --id=5 --output=file.json',
    '$ n8n export:credentials --all --output=backups/latest.json',
    '$ n8n export:credentials --backup --output=backups/latest/',
    '$ n8n export:credentials --all --decrypted --output=backups/decrypted.json',
];
ExportCredentialsCommand.flags = {
    help: core_1.Flags.help({ char: 'h' }),
    all: core_1.Flags.boolean({
        description: 'Export all credentials',
    }),
    backup: core_1.Flags.boolean({
        description: 'Sets --all --pretty --separate for simple backups. Only --output has to be set additionally.',
    }),
    id: core_1.Flags.string({
        description: 'The ID of the credential to export',
    }),
    output: core_1.Flags.string({
        char: 'o',
        description: 'Output file name or directory if using separate files',
    }),
    pretty: core_1.Flags.boolean({
        description: 'Format the output in an easier to read fashion',
    }),
    separate: core_1.Flags.boolean({
        description: 'Exports one file per credential (useful for versioning). Must inform a directory via --output.',
    }),
    decrypted: core_1.Flags.boolean({
        description: 'Exports data decrypted / in plain text. ALL SENSITIVE INFORMATION WILL BE VISIBLE IN THE FILES. Use to migrate from a installation to another that have a different secret key (in the config file).',
    }),
};
//# sourceMappingURL=credentials.js.map