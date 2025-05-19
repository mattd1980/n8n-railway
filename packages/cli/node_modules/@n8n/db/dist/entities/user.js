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
exports.User = void 0;
const typeorm_1 = require("@n8n/typeorm");
const class_validator_1 = require("class-validator");
const abstract_entity_1 = require("./abstract-entity");
const transformers_1 = require("../utils/transformers");
const no_url_validator_1 = require("../utils/validators/no-url.validator");
const no_xss_validator_1 = require("../utils/validators/no-xss.validator");
let User = class User extends abstract_entity_1.WithTimestamps {
    preUpsertHook() {
        this.email = this.email?.toLowerCase() ?? null;
    }
    computeIsPending() {
        this.isPending = this.password === null && this.role !== 'global:owner';
    }
    toJSON() {
        const { password, ...rest } = this;
        return rest;
    }
    createPersonalProjectName() {
        if (this.firstName && this.lastName && this.email) {
            return `${this.firstName} ${this.lastName} <${this.email}>`;
        }
        else if (this.email) {
            return `<${this.email}>`;
        }
        else {
            return 'Unnamed Project';
        }
    }
    toIUser() {
        const { id, email, firstName, lastName } = this;
        return { id, email, firstName, lastName };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 254,
        nullable: true,
        transformer: transformers_1.lowerCaser,
    }),
    (0, typeorm_1.Index)({ unique: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 32, nullable: true }),
    (0, no_xss_validator_1.NoXss)(),
    (0, no_url_validator_1.NoUrl)(),
    (0, class_validator_1.IsString)({ message: 'First name must be of type string.' }),
    (0, class_validator_1.Length)(1, 32, { message: 'First name must be $constraint1 to $constraint2 characters long.' }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 32, nullable: true }),
    (0, no_xss_validator_1.NoXss)(),
    (0, no_url_validator_1.NoUrl)(),
    (0, class_validator_1.IsString)({ message: 'Last name must be of type string.' }),
    (0, class_validator_1.Length)(1, 32, { message: 'Last name must be $constraint1 to $constraint2 characters long.' }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsString)({ message: 'Password must be of type string.' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)({
        nullable: true,
        transformer: transformers_1.objectRetriever,
    }),
    __metadata("design:type", Object)
], User.prototype, "personalizationAnswers", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)({ nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "settings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('AuthIdentity', 'user'),
    __metadata("design:type", Array)
], User.prototype, "authIdentities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('ApiKey', 'user'),
    __metadata("design:type", Array)
], User.prototype, "apiKeys", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('SharedWorkflow', 'user'),
    __metadata("design:type", Array)
], User.prototype, "sharedWorkflows", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('SharedCredentials', 'user'),
    __metadata("design:type", Array)
], User.prototype, "sharedCredentials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('ProjectRelation', 'user'),
    __metadata("design:type", Array)
], User.prototype, "projectRelations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "disabled", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "preUpsertHook", null);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "mfaEnabled", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    (0, typeorm_1.AfterUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "computeIsPending", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.js.map