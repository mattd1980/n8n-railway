"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_ROLES = void 0;
const role_maps_ee_1 = require("./role-maps.ee");
const getRoleScopes_ee_1 = require("../utilities/getRoleScopes.ee");
const ROLE_NAMES = {
    'global:owner': 'Owner',
    'global:admin': 'Admin',
    'global:member': 'Member',
    'project:personalOwner': 'Project Owner',
    'project:admin': 'Project Admin',
    'project:editor': 'Project Editor',
    'project:viewer': 'Project Viewer',
    'credential:user': 'Credential User',
    'credential:owner': 'Credential Owner',
    'workflow:owner': 'Workflow Owner',
    'workflow:editor': 'Workflow Editor',
};
const mapToRoleObject = (roles) => Object.keys(roles).map((role) => ({
    role,
    name: ROLE_NAMES[role],
    scopes: (0, getRoleScopes_ee_1.getRoleScopes)(role),
    licensed: false,
}));
exports.ALL_ROLES = {
    global: mapToRoleObject(role_maps_ee_1.GLOBAL_SCOPE_MAP),
    project: mapToRoleObject(role_maps_ee_1.PROJECT_SCOPE_MAP),
    credential: mapToRoleObject(role_maps_ee_1.CREDENTIALS_SHARING_SCOPE_MAP),
    workflow: mapToRoleObject(role_maps_ee_1.WORKFLOW_SHARING_SCOPE_MAP),
};
//# sourceMappingURL=all-roles.js.map