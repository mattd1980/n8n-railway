"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityNodeTypesService = void 0;
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const community_packages_service_1 = require("./community-packages.service");
const community_nodes_request_utils_1 = require("../utils/community-nodes-request-utils");
const UPDATE_INTERVAL = 8 * 60 * 60 * 1000;
const N8N_VETTED_NODE_TYPES_STAGING_URL = 'https://api-staging.n8n.io/api/community-nodes';
const N8N_VETTED_NODE_TYPES_PRODUCTION_URL = 'https://api.n8n.io/api/community-nodes';
let CommunityNodeTypesService = class CommunityNodeTypesService {
    constructor(logger, globalConfig, communityPackagesService) {
        this.logger = logger;
        this.globalConfig = globalConfig;
        this.communityPackagesService = communityPackagesService;
        this.communityNodes = {};
        this.lastUpdateTimestamp = 0;
    }
    async fetchNodeTypes() {
        try {
            let data = [];
            if (this.globalConfig.nodes.communityPackages.enabled &&
                this.globalConfig.nodes.communityPackages.verifiedEnabled) {
                const environment = this.globalConfig.license.tenantId === 1 ? 'production' : 'staging';
                const url = environment === 'production'
                    ? N8N_VETTED_NODE_TYPES_PRODUCTION_URL
                    : N8N_VETTED_NODE_TYPES_STAGING_URL;
                data = await (0, community_nodes_request_utils_1.paginatedRequest)(url);
            }
            this.updateData(data);
        }
        catch (error) {
            this.logger.error('Failed to fetch community node types', { error: (0, n8n_workflow_1.ensureError)(error) });
        }
    }
    updateData(data) {
        if (!data?.length)
            return;
        this.resetData();
        for (const entry of data) {
            this.communityNodes[entry.attributes.name] = entry.attributes;
        }
        this.lastUpdateTimestamp = Date.now();
    }
    resetData() {
        this.communityNodes = {};
    }
    updateRequired() {
        if (!this.lastUpdateTimestamp)
            return true;
        return Date.now() - this.lastUpdateTimestamp > UPDATE_INTERVAL;
    }
    async getDescriptions() {
        const nodesDescriptions = [];
        if (this.updateRequired() || !Object.keys(this.communityNodes).length) {
            await this.fetchNodeTypes();
        }
        const installedPackages = ((await this.communityPackagesService.getAllInstalledPackages()) ?? []).map((p) => p.packageName);
        for (const node of Object.values(this.communityNodes)) {
            if (installedPackages.includes(node.name.split('.')[0]))
                continue;
            nodesDescriptions.push(node.nodeDescription);
        }
        return nodesDescriptions;
    }
    getCommunityNodeAttributes(type) {
        const node = this.communityNodes[type];
        if (!node)
            return null;
        const { nodeDescription, ...attributes } = node;
        return attributes;
    }
    findVetted(packageName) {
        const vettedTypes = Object.keys(this.communityNodes);
        const nodeName = vettedTypes.find((t) => t.includes(packageName));
        if (!nodeName)
            return;
        return this.communityNodes[nodeName];
    }
};
exports.CommunityNodeTypesService = CommunityNodeTypesService;
exports.CommunityNodeTypesService = CommunityNodeTypesService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [n8n_core_1.Logger,
        config_1.GlobalConfig,
        community_packages_service_1.CommunityPackagesService])
], CommunityNodeTypesService);
//# sourceMappingURL=community-node-types.service.js.map