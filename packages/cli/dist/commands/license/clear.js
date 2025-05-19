"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearLicenseCommand = void 0;
const di_1 = require("@n8n/di");
const license_1 = require("../../license");
const base_command_1 = require("../base-command");
class ClearLicenseCommand extends base_command_1.BaseCommand {
    async run() {
        this.logger.info('Clearing license from database.');
        const license = di_1.Container.get(license_1.License);
        await license.init({ isCli: true });
        await license.clear();
        this.logger.info('Done. Restart n8n to take effect.');
    }
    async catch(error) {
        this.logger.error('Error. See log messages for details.');
        this.logger.error('\nGOT ERROR');
        this.logger.info('====================================');
        this.logger.error(error.message);
        this.logger.error(error.stack);
    }
}
exports.ClearLicenseCommand = ClearLicenseCommand;
ClearLicenseCommand.description = 'Clear local license certificate';
ClearLicenseCommand.examples = ['$ n8n license:clear'];
//# sourceMappingURL=clear.js.map