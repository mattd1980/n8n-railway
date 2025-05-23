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
exports.CommunityNodeTypesController = void 0;
const decorators_1 = require("@n8n/decorators");
const community_node_types_service_1 = require("../services/community-node-types.service");
let CommunityNodeTypesController = class CommunityNodeTypesController {
    constructor(communityNodeTypesService) {
        this.communityNodeTypesService = communityNodeTypesService;
    }
    async getCommunityNodeAttributes(req) {
        return this.communityNodeTypesService.getCommunityNodeAttributes(req.params.name);
    }
    async getCommunityNodeTypes() {
        return await this.communityNodeTypesService.getDescriptions();
    }
};
exports.CommunityNodeTypesController = CommunityNodeTypesController;
__decorate([
    (0, decorators_1.Get)('/:name'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityNodeTypesController.prototype, "getCommunityNodeAttributes", null);
__decorate([
    (0, decorators_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommunityNodeTypesController.prototype, "getCommunityNodeTypes", null);
exports.CommunityNodeTypesController = CommunityNodeTypesController = __decorate([
    (0, decorators_1.RestController)('/community-node-types'),
    __metadata("design:paramtypes", [community_node_types_service_1.CommunityNodeTypesService])
], CommunityNodeTypesController);
//# sourceMappingURL=community-node-types.controller.js.map