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
exports.FolderTagMappingRepository = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const folder_tag_mapping_1 = require("../entities/folder-tag-mapping");
let FolderTagMappingRepository = class FolderTagMappingRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(folder_tag_mapping_1.FolderTagMapping, dataSource.manager);
    }
    async overwriteTags(folderId, tagIds) {
        return await this.manager.transaction(async (tx) => {
            await tx.delete(folder_tag_mapping_1.FolderTagMapping, { folderId });
            const tags = tagIds.map((tagId) => this.create({ folderId, tagId }));
            return await tx.insert(folder_tag_mapping_1.FolderTagMapping, tags);
        });
    }
};
exports.FolderTagMappingRepository = FolderTagMappingRepository;
exports.FolderTagMappingRepository = FolderTagMappingRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], FolderTagMappingRepository);
//# sourceMappingURL=folder-tag-mapping.repository.js.map