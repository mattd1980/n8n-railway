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
exports.TagEntity = void 0;
const typeorm_1 = require("@n8n/typeorm");
const class_validator_1 = require("class-validator");
const abstract_entity_1 = require("./abstract-entity");
let TagEntity = class TagEntity extends abstract_entity_1.WithTimestampsAndStringId {
};
exports.TagEntity = TagEntity;
__decorate([
    (0, typeorm_1.Column)({ length: 24 }),
    (0, typeorm_1.Index)({ unique: true }),
    (0, class_validator_1.IsString)({ message: 'Tag name must be of type string.' }),
    (0, class_validator_1.Length)(1, 24, { message: 'Tag name must be $constraint1 to $constraint2 characters long.' }),
    __metadata("design:type", String)
], TagEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)('WorkflowEntity', 'tags'),
    __metadata("design:type", Array)
], TagEntity.prototype, "workflows", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('WorkflowTagMapping', 'tags'),
    __metadata("design:type", Array)
], TagEntity.prototype, "workflowMappings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('FolderTagMapping', 'tags'),
    __metadata("design:type", Array)
], TagEntity.prototype, "folderMappings", void 0);
exports.TagEntity = TagEntity = __decorate([
    (0, typeorm_1.Entity)()
], TagEntity);
//# sourceMappingURL=tag-entity.js.map