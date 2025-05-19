"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHasScopes = userHasScopes;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const permissions_1 = require("@n8n/permissions");
const typeorm_1 = require("@n8n/typeorm");
const n8n_workflow_1 = require("n8n-workflow");
async function userHasScopes(user, scopes, globalOnly, { credentialId, workflowId, projectId, }) {
    if ((0, permissions_1.hasGlobalScope)(user, scopes, { mode: 'allOf' }))
        return true;
    if (globalOnly)
        return false;
    const projectRoles = (0, permissions_1.rolesWithScope)('project', scopes);
    const userProjectIds = (await di_1.Container.get(db_1.ProjectRepository).find({
        where: {
            projectRelations: {
                userId: user.id,
                role: (0, typeorm_1.In)(projectRoles),
            },
        },
        select: ['id'],
    })).map((p) => p.id);
    if (credentialId) {
        return await di_1.Container.get(db_1.SharedCredentialsRepository).existsBy({
            credentialsId: credentialId,
            projectId: (0, typeorm_1.In)(userProjectIds),
            role: (0, typeorm_1.In)((0, permissions_1.rolesWithScope)('credential', scopes)),
        });
    }
    if (workflowId) {
        return await di_1.Container.get(db_1.SharedWorkflowRepository).existsBy({
            workflowId,
            projectId: (0, typeorm_1.In)(userProjectIds),
            role: (0, typeorm_1.In)((0, permissions_1.rolesWithScope)('workflow', scopes)),
        });
    }
    if (projectId)
        return userProjectIds.includes(projectId);
    throw new n8n_workflow_1.UnexpectedError("`@ProjectScope` decorator was used but does not have a `credentialId`, `workflowId`, or `projectId` in its URL parameters. This is likely an implementation error. If you're a developer, please check your URL is correct or that this should be using `@GlobalScope`.");
}
//# sourceMappingURL=check-access.js.map