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
exports.SharedCredentials = void 0;
const typeorm_1 = require("@n8n/typeorm");
const abstract_entity_1 = require("./abstract-entity");
const credentials_entity_1 = require("./credentials-entity");
const project_1 = require("./project");
let SharedCredentials = class SharedCredentials extends abstract_entity_1.WithTimestamps {
};
exports.SharedCredentials = SharedCredentials;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], SharedCredentials.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('CredentialsEntity', 'shared'),
    __metadata("design:type", credentials_entity_1.CredentialsEntity)
], SharedCredentials.prototype, "credentials", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], SharedCredentials.prototype, "credentialsId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Project', 'sharedCredentials'),
    __metadata("design:type", project_1.Project)
], SharedCredentials.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], SharedCredentials.prototype, "projectId", void 0);
exports.SharedCredentials = SharedCredentials = __decorate([
    (0, typeorm_1.Entity)()
], SharedCredentials);
//# sourceMappingURL=shared-credentials.js.map