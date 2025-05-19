"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityAudit = void 0;
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const core_1 = require("@oclif/core");
const n8n_workflow_1 = require("n8n-workflow");
const constants_1 = require("../security-audit/constants");
const security_audit_service_1 = require("../security-audit/security-audit.service");
const base_command_1 = require("./base-command");
class SecurityAudit extends base_command_1.BaseCommand {
    async run() {
        const { flags: auditFlags } = await this.parse(SecurityAudit);
        const categories = auditFlags.categories?.split(',').filter((c) => c !== '') ??
            constants_1.RISK_CATEGORIES;
        const invalidCategories = categories.filter((c) => !constants_1.RISK_CATEGORIES.includes(c));
        if (invalidCategories.length > 0) {
            const message = invalidCategories.length > 1
                ? `Invalid categories received: ${invalidCategories.join(', ')}`
                : `Invalid category received: ${invalidCategories[0]}`;
            const hint = `Valid categories are: ${constants_1.RISK_CATEGORIES.join(', ')}`;
            throw new n8n_workflow_1.UserError([message, hint].join('. '));
        }
        const result = await di_1.Container.get(security_audit_service_1.SecurityAuditService).run(categories, auditFlags['days-abandoned-workflow']);
        if (Array.isArray(result) && result.length === 0) {
            this.logger.info('No security issues found');
        }
        else {
            process.stdout.write(JSON.stringify(result, null, 2));
        }
    }
    async catch(error) {
        this.logger.error('Failed to generate security audit');
        this.logger.error(error.message);
    }
}
exports.SecurityAudit = SecurityAudit;
SecurityAudit.description = 'Generate a security audit report for this n8n instance';
SecurityAudit.examples = [
    '$ n8n audit',
    '$ n8n audit --categories=database,credentials',
    '$ n8n audit --days-abandoned-workflow=10',
];
SecurityAudit.flags = {
    help: core_1.Flags.help({ char: 'h' }),
    categories: core_1.Flags.string({
        default: constants_1.RISK_CATEGORIES.join(','),
        description: 'Comma-separated list of categories to include in the audit',
    }),
    'days-abandoned-workflow': core_1.Flags.integer({
        default: di_1.Container.get(config_1.SecurityConfig).daysAbandonedWorkflow,
        description: 'Days for a workflow to be considered abandoned if not executed',
    }),
};
//# sourceMappingURL=audit.js.map