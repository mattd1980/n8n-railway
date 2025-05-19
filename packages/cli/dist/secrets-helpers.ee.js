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
exports.SecretsHelper = void 0;
const di_1 = require("@n8n/di");
const external_secrets_manager_ee_1 = require("./external-secrets.ee/external-secrets-manager.ee");
let SecretsHelper = class SecretsHelper {
    constructor(service) {
        this.service = service;
    }
    async update() {
        if (!this.service.initialized) {
            await this.service.init();
        }
        await this.service.updateSecrets();
    }
    async waitForInit() {
        if (!this.service.initialized) {
            await this.service.init();
        }
    }
    getSecret(provider, name) {
        return this.service.getSecret(provider, name);
    }
    hasSecret(provider, name) {
        return this.service.hasSecret(provider, name);
    }
    hasProvider(provider) {
        return this.service.hasProvider(provider);
    }
    listProviders() {
        return this.service.getProviderNames() ?? [];
    }
    listSecrets(provider) {
        return this.service.getSecretNames(provider) ?? [];
    }
};
exports.SecretsHelper = SecretsHelper;
exports.SecretsHelper = SecretsHelper = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [external_secrets_manager_ee_1.ExternalSecretsManager])
], SecretsHelper);
//# sourceMappingURL=secrets-helpers.ee.js.map