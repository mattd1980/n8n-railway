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
exports.FolderTagMapping = void 0;
const typeorm_1 = require("@n8n/typeorm");
let FolderTagMapping = class FolderTagMapping {
};
exports.FolderTagMapping = FolderTagMapping;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], FolderTagMapping.prototype, "folderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Folder', 'tagMappings'),
    (0, typeorm_1.JoinColumn)({ name: 'folderId' }),
    __metadata("design:type", Array)
], FolderTagMapping.prototype, "folders", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], FolderTagMapping.prototype, "tagId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('TagEntity', 'folderMappings'),
    (0, typeorm_1.JoinColumn)({ name: 'tagId' }),
    __metadata("design:type", Array)
], FolderTagMapping.prototype, "tags", void 0);
exports.FolderTagMapping = FolderTagMapping = __decorate([
    (0, typeorm_1.Entity)({ name: 'folder_tag' })
], FolderTagMapping);
//# sourceMappingURL=folder-tag-mapping.js.map