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
exports.AnnotationTagEntity = void 0;
const typeorm_1 = require("@n8n/typeorm");
const class_validator_1 = require("class-validator");
const abstract_entity_1 = require("./abstract-entity");
let AnnotationTagEntity = class AnnotationTagEntity extends abstract_entity_1.WithTimestampsAndStringId {
};
exports.AnnotationTagEntity = AnnotationTagEntity;
__decorate([
    (0, typeorm_1.Column)({ length: 24 }),
    (0, typeorm_1.Index)({ unique: true }),
    (0, class_validator_1.IsString)({ message: 'Tag name must be of type string.' }),
    (0, class_validator_1.Length)(1, 24, { message: 'Tag name must be $constraint1 to $constraint2 characters long.' }),
    __metadata("design:type", String)
], AnnotationTagEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)('ExecutionAnnotation', 'tags'),
    __metadata("design:type", Array)
], AnnotationTagEntity.prototype, "annotations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('AnnotationTagMapping', 'tags'),
    __metadata("design:type", Array)
], AnnotationTagEntity.prototype, "annotationMappings", void 0);
exports.AnnotationTagEntity = AnnotationTagEntity = __decorate([
    (0, typeorm_1.Entity)()
], AnnotationTagEntity);
//# sourceMappingURL=annotation-tag-entity.ee.js.map