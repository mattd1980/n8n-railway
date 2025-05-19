"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRunnerNodeTypes = exports.DEFAULT_NODETYPE_VERSION = void 0;
const n8n_workflow_1 = require("n8n-workflow");
exports.DEFAULT_NODETYPE_VERSION = 1;
class TaskRunnerNodeTypes {
    constructor(nodeTypes) {
        this.nodeTypesByVersion = this.parseNodeTypes(nodeTypes);
    }
    parseNodeTypes(nodeTypes) {
        const versionedTypes = new Map();
        for (const nt of nodeTypes) {
            const versions = Array.isArray(nt.version)
                ? nt.version
                : [nt.version ?? exports.DEFAULT_NODETYPE_VERSION];
            const versioned = versionedTypes.get(nt.name) ?? new Map();
            for (const version of versions) {
                versioned.set(version, { ...versioned.get(version), ...nt });
            }
            versionedTypes.set(nt.name, versioned);
        }
        return versionedTypes;
    }
    getByName(_nodeType) {
        throw new n8n_workflow_1.ApplicationError('Unimplemented `getByName`', { level: 'error' });
    }
    getByNameAndVersion(nodeType, version) {
        const versions = this.nodeTypesByVersion.get(nodeType);
        if (!versions) {
            return undefined;
        }
        const nodeVersion = versions.get(version ?? Math.max(...versions.keys()));
        if (!nodeVersion) {
            return undefined;
        }
        return {
            description: nodeVersion,
        };
    }
    getKnownTypes() {
        throw new n8n_workflow_1.ApplicationError('Unimplemented `getKnownTypes`', { level: 'error' });
    }
    addNodeTypeDescriptions(nodeTypeDescriptions) {
        const newNodeTypes = this.parseNodeTypes(nodeTypeDescriptions);
        for (const [name, newVersions] of newNodeTypes.entries()) {
            if (!this.nodeTypesByVersion.has(name)) {
                this.nodeTypesByVersion.set(name, newVersions);
            }
            else {
                const existingVersions = this.nodeTypesByVersion.get(name);
                for (const [version, nodeType] of newVersions.entries()) {
                    existingVersions.set(version, nodeType);
                }
            }
        }
    }
    onlyUnknown(nodeTypes) {
        return nodeTypes.filter(({ name, version }) => {
            const existingVersions = this.nodeTypesByVersion.get(name);
            if (!existingVersions)
                return true;
            return !existingVersions.has(version);
        });
    }
}
exports.TaskRunnerNodeTypes = TaskRunnerNodeTypes;
//# sourceMappingURL=node-types.js.map