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
exports.AuthProviderSyncHistory = void 0;
const typeorm_1 = require("@n8n/typeorm");
const abstract_entity_1 = require("./abstract-entity");
let AuthProviderSyncHistory = class AuthProviderSyncHistory {
};
exports.AuthProviderSyncHistory = AuthProviderSyncHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AuthProviderSyncHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], AuthProviderSyncHistory.prototype, "providerType", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], AuthProviderSyncHistory.prototype, "runMode", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], AuthProviderSyncHistory.prototype, "status", void 0);
__decorate([
    (0, abstract_entity_1.DateTimeColumn)(),
    __metadata("design:type", Date)
], AuthProviderSyncHistory.prototype, "startedAt", void 0);
__decorate([
    (0, abstract_entity_1.DateTimeColumn)(),
    __metadata("design:type", Date)
], AuthProviderSyncHistory.prototype, "endedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AuthProviderSyncHistory.prototype, "scanned", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AuthProviderSyncHistory.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AuthProviderSyncHistory.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AuthProviderSyncHistory.prototype, "disabled", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AuthProviderSyncHistory.prototype, "error", void 0);
exports.AuthProviderSyncHistory = AuthProviderSyncHistory = __decorate([
    (0, typeorm_1.Entity)()
], AuthProviderSyncHistory);
//# sourceMappingURL=auth-provider-sync-history.js.map