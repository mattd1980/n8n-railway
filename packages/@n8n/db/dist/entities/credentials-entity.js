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
exports.CredentialsEntity = void 0;
const typeorm_1 = require("@n8n/typeorm");
const class_validator_1 = require("class-validator");
const abstract_entity_1 = require("./abstract-entity");
let CredentialsEntity = class CredentialsEntity extends abstract_entity_1.WithTimestampsAndStringId {
    toJSON() {
        const { shared, ...rest } = this;
        return rest;
    }
};
exports.CredentialsEntity = CredentialsEntity;
__decorate([
    (0, typeorm_1.Column)({ length: 128 }),
    (0, class_validator_1.IsString)({ message: 'Credential `name` must be of type string.' }),
    (0, class_validator_1.Length)(3, 128, {
        message: 'Credential name must be $constraint1 to $constraint2 characters long.',
    }),
    __metadata("design:type", String)
], CredentialsEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", String)
], CredentialsEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, class_validator_1.IsString)({ message: 'Credential `type` must be of type string.' }),
    (0, typeorm_1.Column)({
        length: 128,
    }),
    __metadata("design:type", String)
], CredentialsEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('SharedCredentials', 'credentials'),
    __metadata("design:type", Array)
], CredentialsEntity.prototype, "shared", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CredentialsEntity.prototype, "isManaged", void 0);
exports.CredentialsEntity = CredentialsEntity = __decorate([
    (0, typeorm_1.Entity)()
], CredentialsEntity);
//# sourceMappingURL=credentials-entity.js.map