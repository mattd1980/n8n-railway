"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurgeInvalidWorkflowConnections1675940580449 = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const entities_1 = require("../../entities");
class PurgeInvalidWorkflowConnections1675940580449 {
    async up({ queryRunner }) {
        const workflowCount = await queryRunner.manager.count(entities_1.WorkflowEntity);
        if (workflowCount > 0) {
            throw new n8n_workflow_1.UserError('Migration "PurgeInvalidWorkflowConnections1675940580449" is no longer supported. Please upgrade to n8n@1.0.0 first.');
        }
    }
}
exports.PurgeInvalidWorkflowConnections1675940580449 = PurgeInvalidWorkflowConnections1675940580449;
//# sourceMappingURL=1675940580449-PurgeInvalidWorkflowConnections.js.map