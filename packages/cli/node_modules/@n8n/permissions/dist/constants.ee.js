"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_KEY_RESOURCES = exports.RESOURCES = exports.DEFAULT_OPERATIONS = void 0;
exports.DEFAULT_OPERATIONS = ['create', 'read', 'update', 'delete', 'list'];
exports.RESOURCES = {
    annotationTag: [...exports.DEFAULT_OPERATIONS],
    auditLogs: ['manage'],
    banner: ['dismiss'],
    community: ['register'],
    communityPackage: ['install', 'uninstall', 'update', 'list', 'manage'],
    credential: ['share', 'move', ...exports.DEFAULT_OPERATIONS],
    externalSecretsProvider: ['sync', ...exports.DEFAULT_OPERATIONS],
    externalSecret: ['list', 'use'],
    eventBusDestination: ['test', ...exports.DEFAULT_OPERATIONS],
    ldap: ['sync', 'manage'],
    license: ['manage'],
    logStreaming: ['manage'],
    orchestration: ['read', 'list'],
    project: [...exports.DEFAULT_OPERATIONS],
    saml: ['manage'],
    securityAudit: ['generate'],
    sourceControl: ['pull', 'push', 'manage'],
    tag: [...exports.DEFAULT_OPERATIONS],
    user: ['resetPassword', 'changeRole', ...exports.DEFAULT_OPERATIONS],
    variable: [...exports.DEFAULT_OPERATIONS],
    workersView: ['manage'],
    workflow: ['share', 'execute', 'move', ...exports.DEFAULT_OPERATIONS],
    folder: [...exports.DEFAULT_OPERATIONS, 'move'],
    insights: ['list'],
};
exports.API_KEY_RESOURCES = {
    tag: [...exports.DEFAULT_OPERATIONS],
    workflow: [...exports.DEFAULT_OPERATIONS, 'move', 'activate', 'deactivate'],
    variable: ['create', 'update', 'delete', 'list'],
    securityAudit: ['generate'],
    project: ['create', 'update', 'delete', 'list'],
    user: ['read', 'list', 'create', 'changeRole', 'delete'],
    execution: ['delete', 'read', 'list', 'get'],
    credential: ['create', 'move', 'delete'],
    sourceControl: ['pull'],
    workflowTags: ['update', 'list'],
};
//# sourceMappingURL=constants.ee.js.map