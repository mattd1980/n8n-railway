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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeTypesController = void 0;
const decorators_1 = require("@n8n/decorators");
const promises_1 = require("fs/promises");
const get_1 = __importDefault(require("lodash/get"));
const config_1 = __importDefault(require("../config"));
const node_types_1 = require("../node-types");
let NodeTypesController = class NodeTypesController {
    constructor(nodeTypes) {
        this.nodeTypes = nodeTypes;
    }
    async getNodeInfo(req) {
        const nodeInfos = (0, get_1.default)(req, 'body.nodeInfos', []);
        const defaultLocale = config_1.default.getEnv('defaultLocale');
        if (defaultLocale === 'en') {
            return nodeInfos.reduce((acc, { name, version }) => {
                const { description } = this.nodeTypes.getByNameAndVersion(name, version);
                acc.push(description);
                return acc;
            }, []);
        }
        const populateTranslation = async (name, version, nodeTypes) => {
            const { description, sourcePath } = this.nodeTypes.getWithSourcePath(name, version);
            const translationPath = await this.nodeTypes.getNodeTranslationPath({
                nodeSourcePath: sourcePath,
                longNodeType: description.name,
                locale: defaultLocale,
            });
            try {
                const translation = await (0, promises_1.readFile)(translationPath, 'utf8');
                description.translation = JSON.parse(translation);
            }
            catch {
            }
            nodeTypes.push(description);
        };
        const nodeTypes = [];
        const promises = nodeInfos.map(async ({ name, version }) => await populateTranslation(name, version, nodeTypes));
        await Promise.all(promises);
        return nodeTypes;
    }
};
exports.NodeTypesController = NodeTypesController;
__decorate([
    (0, decorators_1.Post)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NodeTypesController.prototype, "getNodeInfo", null);
exports.NodeTypesController = NodeTypesController = __decorate([
    (0, decorators_1.RestController)('/node-types'),
    __metadata("design:paramtypes", [node_types_1.NodeTypes])
], NodeTypesController);
//# sourceMappingURL=node-types.controller.js.map