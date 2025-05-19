"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisableMFACommand = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const core_1 = require("@oclif/core");
const base_command_1 = require("../base-command");
class DisableMFACommand extends base_command_1.BaseCommand {
    async init() {
        await super.init();
    }
    async run() {
        const { flags } = await this.parse(DisableMFACommand);
        if (!flags.email) {
            this.logger.info('An email with --email must be provided');
            return;
        }
        const repository = di_1.Container.get(db_1.AuthUserRepository);
        const user = await repository.findOneBy({ email: flags.email });
        if (!user) {
            this.reportUserDoesNotExistError(flags.email);
            return;
        }
        if (user.mfaSecret === null &&
            Array.isArray(user.mfaRecoveryCodes) &&
            user.mfaRecoveryCodes.length === 0 &&
            !user.mfaEnabled) {
            this.reportUserDoesNotExistError(flags.email);
            return;
        }
        Object.assign(user, { mfaSecret: null, mfaRecoveryCodes: [], mfaEnabled: false });
        await repository.save(user);
        this.reportSuccess(flags.email);
    }
    async catch(error) {
        this.logger.error('An error occurred while disabling MFA in account');
        this.logger.error(error.message);
    }
    reportSuccess(email) {
        this.logger.info(`Successfully disabled MFA for user with email: ${email}`);
    }
    reportUserDoesNotExistError(email) {
        this.logger.info(`User with email: ${email} does not exist`);
    }
}
exports.DisableMFACommand = DisableMFACommand;
DisableMFACommand.description = 'Disable MFA authentication for a user';
DisableMFACommand.examples = ['$ n8n mfa:disable --email=johndoe@example.com'];
DisableMFACommand.flags = {
    help: core_1.Flags.help({ char: 'h' }),
    email: core_1.Flags.string({
        description: 'The email of the user to disable the MFA authentication',
    }),
};
//# sourceMappingURL=disable.js.map