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
exports.Project = void 0;
const typeorm_1 = require("@n8n/typeorm");
const abstract_entity_1 = require("./abstract-entity");
let Project = class Project extends abstract_entity_1.WithTimestampsAndStringId {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 36 }),
    __metadata("design:type", String)
], Project.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('ProjectRelation', 'project'),
    __metadata("design:type", Array)
], Project.prototype, "projectRelations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('SharedCredentials', 'project'),
    __metadata("design:type", Array)
], Project.prototype, "sharedCredentials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('SharedWorkflow', 'project'),
    __metadata("design:type", Array)
], Project.prototype, "sharedWorkflows", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)()
], Project);
//# sourceMappingURL=project.js.map