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
var AuthIdentity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthIdentity = void 0;
const typeorm_1 = require("@n8n/typeorm");
const abstract_entity_1 = require("./abstract-entity");
const user_1 = require("./user");
let AuthIdentity = AuthIdentity_1 = class AuthIdentity extends abstract_entity_1.WithTimestamps {
    static create(user, providerId, providerType = 'ldap') {
        const identity = new AuthIdentity_1();
        identity.user = user;
        identity.userId = user.id;
        identity.providerId = providerId;
        identity.providerType = providerType;
        return identity;
    }
};
exports.AuthIdentity = AuthIdentity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AuthIdentity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.authIdentities),
    __metadata("design:type", user_1.User)
], AuthIdentity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], AuthIdentity.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], AuthIdentity.prototype, "providerType", void 0);
exports.AuthIdentity = AuthIdentity = AuthIdentity_1 = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['providerId', 'providerType'])
], AuthIdentity);
//# sourceMappingURL=auth-identity.js.map