"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryLoader = void 0;
const di_1 = require("@n8n/di");
const uniqBy_1 = __importDefault(require("lodash/uniqBy"));
const n8n_workflow_1 = require("n8n-workflow");
const path = __importStar(require("path"));
const unrecognized_credential_type_error_1 = require("../errors/unrecognized-credential-type.error");
const unrecognized_node_type_error_1 = require("../errors/unrecognized-node-type.error");
const logger_1 = require("../logging/logger");
const constants_1 = require("./constants");
const load_class_in_isolation_1 = require("./load-class-in-isolation");
function toJSON() {
    return {
        ...this,
        authenticate: typeof this.authenticate === 'function' ? {} : this.authenticate,
    };
}
class DirectoryLoader {
    constructor(directory, excludeNodes = [], includeNodes = []) {
        this.directory = directory;
        this.excludeNodes = excludeNodes;
        this.includeNodes = includeNodes;
        this.isLazyLoaded = false;
        this.loadedNodes = [];
        this.nodeTypes = {};
        this.credentialTypes = {};
        this.known = { nodes: {}, credentials: {} };
        this.types = { nodes: [], credentials: [] };
        this.nodesByCredential = {};
        this.logger = di_1.Container.get(logger_1.Logger);
    }
    reset() {
        this.loadedNodes = [];
        this.nodeTypes = {};
        this.credentialTypes = {};
        this.known = { nodes: {}, credentials: {} };
        this.types = { nodes: [], credentials: [] };
    }
    resolvePath(file) {
        return path.resolve(this.directory, file);
    }
    loadClass(sourcePath) {
        const filePath = this.resolvePath(sourcePath);
        const [className] = path.parse(sourcePath).name.split('.');
        try {
            return (0, load_class_in_isolation_1.loadClassInIsolation)(filePath, className);
        }
        catch (error) {
            throw error instanceof TypeError
                ? new n8n_workflow_1.ApplicationError('Class could not be found. Please check if the class is named correctly.', { extra: { className } })
                : error;
        }
    }
    loadNodeFromFile(filePath) {
        const tempNode = this.loadClass(filePath);
        this.addCodex(tempNode, filePath);
        const nodeType = tempNode.description.name;
        if (this.includeNodes.length && !this.includeNodes.includes(nodeType)) {
            return;
        }
        if (this.excludeNodes.includes(nodeType)) {
            return;
        }
        this.fixIconPaths(tempNode.description, filePath);
        let nodeVersion = 1;
        if ('nodeVersions' in tempNode) {
            for (const versionNode of Object.values(tempNode.nodeVersions)) {
                this.fixIconPaths(versionNode.description, filePath);
            }
            for (const version of Object.values(tempNode.nodeVersions)) {
                this.addLoadOptionsMethods(version);
                this.applySpecialNodeParameters(version);
            }
            const currentVersionNode = tempNode.nodeVersions[tempNode.currentVersion];
            this.addCodex(currentVersionNode, filePath);
            nodeVersion = tempNode.currentVersion;
            if (currentVersionNode.hasOwnProperty('executeSingle')) {
                throw new n8n_workflow_1.ApplicationError('"executeSingle" has been removed. Please update the code of this node to use "execute" instead.', { extra: { nodeType } });
            }
        }
        else {
            this.addLoadOptionsMethods(tempNode);
            this.applySpecialNodeParameters(tempNode);
            nodeVersion = Array.isArray(tempNode.description.version)
                ? tempNode.description.version.slice(-1)[0]
                : tempNode.description.version;
        }
        this.known.nodes[nodeType] = {
            className: tempNode.constructor.name,
            sourcePath: filePath,
        };
        this.nodeTypes[nodeType] = {
            type: tempNode,
            sourcePath: filePath,
        };
        this.loadedNodes.push({
            name: nodeType,
            version: nodeVersion,
        });
        this.getVersionedNodeTypeAll(tempNode).forEach(({ description }) => {
            this.types.nodes.push(description);
        });
        for (const credential of this.getCredentialsForNode(tempNode)) {
            if (!this.nodesByCredential[credential.name]) {
                this.nodesByCredential[credential.name] = [];
            }
            this.nodesByCredential[credential.name].push(nodeType);
        }
    }
    getNode(nodeType) {
        const { nodeTypes, known: { nodes: knownNodes }, } = this;
        if (!(nodeType in nodeTypes) && nodeType in knownNodes) {
            const { sourcePath } = knownNodes[nodeType];
            this.loadNodeFromFile(sourcePath);
        }
        if (nodeType in nodeTypes) {
            return nodeTypes[nodeType];
        }
        throw new unrecognized_node_type_error_1.UnrecognizedNodeTypeError(this.packageName, nodeType);
    }
    loadCredentialFromFile(filePath) {
        const tempCredential = this.loadClass(filePath);
        Object.assign(tempCredential, { toJSON });
        this.fixIconPaths(tempCredential, filePath);
        const credentialType = tempCredential.name;
        this.known.credentials[credentialType] = {
            className: tempCredential.constructor.name,
            sourcePath: filePath,
            extends: tempCredential.extends,
            supportedNodes: this.nodesByCredential[credentialType],
        };
        this.credentialTypes[credentialType] = {
            type: tempCredential,
            sourcePath: filePath,
        };
        this.types.credentials.push(tempCredential);
    }
    getCredential(credentialType) {
        const { credentialTypes, known: { credentials: knownCredentials }, } = this;
        if (!(credentialType in credentialTypes) && credentialType in knownCredentials) {
            const { sourcePath } = knownCredentials[credentialType];
            this.loadCredentialFromFile(sourcePath);
        }
        if (credentialType in credentialTypes) {
            return credentialTypes[credentialType];
        }
        throw new unrecognized_credential_type_error_1.UnrecognizedCredentialTypeError(credentialType);
    }
    getCredentialsForNode(object) {
        if ('nodeVersions' in object) {
            const credentials = Object.values(object.nodeVersions).flatMap(({ description }) => description.credentials ?? []);
            return (0, uniqBy_1.default)(credentials, 'name');
        }
        return object.description.credentials ?? [];
    }
    getVersionedNodeTypeAll(object) {
        if ('nodeVersions' in object) {
            const nodeVersions = Object.values(object.nodeVersions).map((element) => {
                element.description.name = object.description.name;
                element.description.codex = object.description.codex;
                return element;
            });
            return (0, uniqBy_1.default)(nodeVersions.reverse(), (node) => {
                const { version } = node.description;
                return Array.isArray(version) ? version.join(',') : version.toString();
            });
        }
        return [object];
    }
    getCodex(filePath) {
        const codexFilePath = this.resolvePath(`${filePath}on`);
        const { categories, subcategories, resources: { primaryDocumentation, credentialDocumentation }, alias, } = module.require(codexFilePath);
        return {
            ...(categories && { categories }),
            ...(subcategories && { subcategories }),
            ...(alias && { alias }),
            resources: {
                primaryDocumentation,
                credentialDocumentation,
            },
        };
    }
    addCodex(node, filePath) {
        const isCustom = this.packageName === 'CUSTOM';
        try {
            let codex;
            if (!isCustom) {
                codex = node.description.codex;
            }
            if (codex === undefined) {
                codex = this.getCodex(filePath);
            }
            if (isCustom) {
                codex.categories = codex.categories
                    ? codex.categories.concat(constants_1.CUSTOM_NODES_CATEGORY)
                    : [constants_1.CUSTOM_NODES_CATEGORY];
            }
            node.description.codex = codex;
        }
        catch {
            this.logger.debug(`No codex available for: ${node.description.name}`);
            if (isCustom) {
                node.description.codex = {
                    categories: [constants_1.CUSTOM_NODES_CATEGORY],
                };
            }
        }
    }
    addLoadOptionsMethods(node) {
        if (node?.methods?.loadOptions) {
            node.description.__loadOptionsMethods = Object.keys(node.methods.loadOptions);
        }
    }
    applySpecialNodeParameters(nodeType) {
        const { properties, polling, supportsCORS } = nodeType.description;
        if (polling) {
            properties.unshift(...constants_1.commonPollingParameters);
        }
        if (nodeType.webhook && supportsCORS) {
            const optionsProperty = properties.find(({ name }) => name === 'options');
            if (optionsProperty)
                optionsProperty.options = [
                    ...constants_1.commonCORSParameters,
                    ...optionsProperty.options,
                ];
            else
                properties.push(...constants_1.commonCORSParameters);
        }
        DirectoryLoader.applyDeclarativeNodeOptionParameters(nodeType);
    }
    getIconPath(icon, filePath) {
        const iconPath = path.join(path.dirname(filePath), icon.replace('file:', ''));
        return `icons/${this.packageName}/${iconPath}`;
    }
    fixIconPaths(obj, filePath) {
        const { icon } = obj;
        if (!icon)
            return;
        if (typeof icon === 'string') {
            if (icon.startsWith('file:')) {
                obj.iconUrl = this.getIconPath(icon, filePath);
                obj.icon = undefined;
            }
        }
        else if (icon.light.startsWith('file:') && icon.dark.startsWith('file:')) {
            obj.iconUrl = {
                light: this.getIconPath(icon.light, filePath),
                dark: this.getIconPath(icon.dark, filePath),
            };
            obj.icon = undefined;
        }
    }
    static applyDeclarativeNodeOptionParameters(nodeType) {
        if (!!nodeType.execute ||
            !!nodeType.trigger ||
            !!nodeType.webhook ||
            !!nodeType.description.polling ||
            (0, n8n_workflow_1.isSubNodeType)(nodeType.description)) {
            return;
        }
        const parameters = nodeType.description.properties;
        if (!parameters) {
            return;
        }
        const existingRequestOptionsIndex = parameters.findIndex((parameter) => parameter.name === 'requestOptions');
        if (existingRequestOptionsIndex !== -1) {
            parameters[existingRequestOptionsIndex] = {
                ...constants_1.commonDeclarativeNodeOptionParameters,
                options: [
                    ...(constants_1.commonDeclarativeNodeOptionParameters.options ?? []),
                    ...(parameters[existingRequestOptionsIndex]?.options ?? []),
                ],
            };
            const options = parameters[existingRequestOptionsIndex]?.options;
            if (options) {
                options.sort((a, b) => {
                    if ('displayName' in a && 'displayName' in b) {
                        if (a.displayName < b.displayName) {
                            return -1;
                        }
                        if (a.displayName > b.displayName) {
                            return 1;
                        }
                    }
                    return 0;
                });
            }
        }
        else {
            parameters.push(constants_1.commonDeclarativeNodeOptionParameters);
        }
        return;
    }
}
exports.DirectoryLoader = DirectoryLoader;
//# sourceMappingURL=directory-loader.js.map