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
exports.Folder = void 0;
const typeorm_1 = require("@n8n/typeorm");
const abstract_entity_1 = require("./abstract-entity");
const project_1 = require("./project");
const tag_entity_1 = require("./tag-entity");
let Folder = class Folder extends abstract_entity_1.WithTimestampsAndStringId {
};
exports.Folder = Folder;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Folder.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Folder.prototype, "parentFolderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Folder, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'parentFolderId' }),
    __metadata("design:type", Object)
], Folder.prototype, "parentFolder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Folder, (folder) => folder.parentFolder),
    __metadata("design:type", Array)
], Folder.prototype, "subFolders", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_1.Project),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_1.Project)
], Folder.prototype, "homeProject", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('WorkflowEntity', 'parentFolder'),
    __metadata("design:type", Array)
], Folder.prototype, "workflows", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.TagEntity),
    (0, typeorm_1.JoinTable)({
        name: 'folder_tag',
        joinColumn: {
            name: 'folderId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tagId',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Folder.prototype, "tags", void 0);
exports.Folder = Folder = __decorate([
    (0, typeorm_1.Entity)()
], Folder);
//# sourceMappingURL=folder.js.map