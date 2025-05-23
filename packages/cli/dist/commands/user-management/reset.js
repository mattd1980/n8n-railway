"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reset = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const base_command_1 = require("../base-command");
const defaultUserProps = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    role: 'global:owner',
};
class Reset extends base_command_1.BaseCommand {
    async run() {
        const owner = await this.getInstanceOwner();
        const personalProject = await di_1.Container.get(db_1.ProjectRepository).getPersonalProjectForUserOrFail(owner.id);
        await di_1.Container.get(db_1.SharedWorkflowRepository).makeOwnerOfAllWorkflows(personalProject);
        await di_1.Container.get(db_1.SharedCredentialsRepository).makeOwnerOfAllCredentials(personalProject);
        await di_1.Container.get(db_1.UserRepository).deleteAllExcept(owner);
        await di_1.Container.get(db_1.UserRepository).save(Object.assign(owner, defaultUserProps));
        const danglingCredentials = await di_1.Container.get(db_1.CredentialsRepository)
            .createQueryBuilder('credentials')
            .leftJoinAndSelect('credentials.shared', 'shared')
            .where('shared.credentialsId is null')
            .getMany();
        const newSharedCredentials = danglingCredentials.map((credentials) => di_1.Container.get(db_1.SharedCredentialsRepository).create({
            credentials,
            projectId: personalProject.id,
            role: 'credential:owner',
        }));
        await di_1.Container.get(db_1.SharedCredentialsRepository).save(newSharedCredentials);
        await di_1.Container.get(db_1.SettingsRepository).update({ key: 'userManagement.isInstanceOwnerSetUp' }, { value: 'false' });
        this.logger.info('Successfully reset the database to default user state.');
    }
    async getInstanceOwner() {
        const owner = await di_1.Container.get(db_1.UserRepository).findOneBy({ role: 'global:owner' });
        if (owner)
            return owner;
        const user = new db_1.User();
        Object.assign(user, defaultUserProps);
        await di_1.Container.get(db_1.UserRepository).save(user);
        return await di_1.Container.get(db_1.UserRepository).findOneByOrFail({ role: 'global:owner' });
    }
    async catch(error) {
        this.logger.error('Error resetting database. See log messages for details.');
        this.logger.error(error.message);
        this.exit(1);
    }
}
exports.Reset = Reset;
Reset.description = 'Resets the database to the default user state';
Reset.examples = ['$ n8n user-management:reset'];
//# sourceMappingURL=reset.js.map