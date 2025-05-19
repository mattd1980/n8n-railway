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
exports.ExecutionAnnotation = void 0;
const typeorm_1 = require("@n8n/typeorm");
const execution_entity_1 = require("./execution-entity");
let ExecutionAnnotation = class ExecutionAnnotation {
};
exports.ExecutionAnnotation = ExecutionAnnotation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExecutionAnnotation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], ExecutionAnnotation.prototype, "vote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], ExecutionAnnotation.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.RelationId)((annotation) => annotation.execution),
    __metadata("design:type", String)
], ExecutionAnnotation.prototype, "executionId", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.OneToOne)('ExecutionEntity', 'annotation', {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'executionId' }),
    __metadata("design:type", execution_entity_1.ExecutionEntity)
], ExecutionAnnotation.prototype, "execution", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)('AnnotationTagEntity', 'annotations'),
    (0, typeorm_1.JoinTable)({
        name: 'execution_annotation_tags',
        joinColumn: {
            name: 'annotationId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tagId',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], ExecutionAnnotation.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('AnnotationTagMapping', 'annotations'),
    __metadata("design:type", Array)
], ExecutionAnnotation.prototype, "tagMappings", void 0);
exports.ExecutionAnnotation = ExecutionAnnotation = __decorate([
    (0, typeorm_1.Entity)({ name: 'execution_annotations' })
], ExecutionAnnotation);
//# sourceMappingURL=execution-annotation.ee.js.map