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
exports.InstalledPackagesRepository = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const installed_nodes_repository_1 = require("./installed-nodes.repository");
const entities_1 = require("../entities");
let InstalledPackagesRepository = class InstalledPackagesRepository extends typeorm_1.Repository {
    constructor(dataSource, installedNodesRepository) {
        super(entities_1.InstalledPackages, dataSource.manager);
        this.installedNodesRepository = installedNodesRepository;
    }
    async saveInstalledPackageWithNodes(packageLoader) {
        const { packageJson, nodeTypes, loadedNodes } = packageLoader;
        const { name: packageName, version: installedVersion, author } = packageJson;
        let installedPackage;
        await this.manager.transaction(async (manager) => {
            installedPackage = await manager.save(this.create({
                packageName,
                installedVersion,
                authorName: author?.name,
                authorEmail: author?.email,
            }));
            installedPackage.installedNodes = [];
            for (const loadedNode of loadedNodes) {
                const installedNode = this.installedNodesRepository.create({
                    name: nodeTypes[loadedNode.name].type.description.displayName,
                    type: `${packageName}.${loadedNode.name}`,
                    latestVersion: loadedNode.version,
                    package: { packageName },
                });
                installedPackage.installedNodes.push(installedNode);
                await manager.save(installedNode);
            }
        });
        return installedPackage;
    }
};
exports.InstalledPackagesRepository = InstalledPackagesRepository;
exports.InstalledPackagesRepository = InstalledPackagesRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        installed_nodes_repository_1.InstalledNodesRepository])
], InstalledPackagesRepository);
//# sourceMappingURL=installed-packages.repository.js.map