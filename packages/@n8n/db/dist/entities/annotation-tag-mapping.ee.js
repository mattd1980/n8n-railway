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
exports.AnnotationTagMapping = void 0;
const typeorm_1 = require("@n8n/typeorm");
let AnnotationTagMapping = class AnnotationTagMapping {
};
exports.AnnotationTagMapping = AnnotationTagMapping;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], AnnotationTagMapping.prototype, "annotationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('ExecutionAnnotation', 'tagMappings'),
    (0, typeorm_1.JoinColumn)({ name: 'annotationId' }),
    __metadata("design:type", Array)
], AnnotationTagMapping.prototype, "annotations", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], AnnotationTagMapping.prototype, "tagId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('AnnotationTagEntity', 'annotationMappings'),
    (0, typeorm_1.JoinColumn)({ name: 'tagId' }),
    __metadata("design:type", Array)
], AnnotationTagMapping.prototype, "tags", void 0);
exports.AnnotationTagMapping = AnnotationTagMapping = __decorate([
    (0, typeorm_1.Entity)({ name: 'execution_annotation_tags' })
], AnnotationTagMapping);
//# sourceMappingURL=annotation-tag-mapping.ee.js.map