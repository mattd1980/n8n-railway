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
exports.MfaService = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const n8n_core_1 = require("n8n-core");
const uuid_1 = require("uuid");
const invalid_mfa_code_error_1 = require("../errors/response-errors/invalid-mfa-code.error");
const invalid_mfa_recovery_code_error_1 = require("../errors/response-errors/invalid-mfa-recovery-code-error");
const totp_service_1 = require("./totp.service");
let MfaService = class MfaService {
    constructor(authUserRepository, totp, cipher) {
        this.authUserRepository = authUserRepository;
        this.totp = totp;
        this.cipher = cipher;
    }
    generateRecoveryCodes(n = 10) {
        return Array.from(Array(n)).map(() => (0, uuid_1.v4)());
    }
    async saveSecretAndRecoveryCodes(userId, secret, recoveryCodes) {
        const { encryptedSecret, encryptedRecoveryCodes } = this.encryptSecretAndRecoveryCodes(secret, recoveryCodes);
        const user = await this.authUserRepository.findOneByOrFail({ id: userId });
        user.mfaSecret = encryptedSecret;
        user.mfaRecoveryCodes = encryptedRecoveryCodes;
        await this.authUserRepository.save(user);
    }
    encryptSecretAndRecoveryCodes(rawSecret, rawRecoveryCodes) {
        const encryptedSecret = this.cipher.encrypt(rawSecret), encryptedRecoveryCodes = rawRecoveryCodes.map((code) => this.cipher.encrypt(code));
        return {
            encryptedRecoveryCodes,
            encryptedSecret,
        };
    }
    decryptSecretAndRecoveryCodes(mfaSecret, mfaRecoveryCodes) {
        return {
            decryptedSecret: this.cipher.decrypt(mfaSecret),
            decryptedRecoveryCodes: mfaRecoveryCodes.map((code) => this.cipher.decrypt(code)),
        };
    }
    async getSecretAndRecoveryCodes(userId) {
        const { mfaSecret, mfaRecoveryCodes } = await this.authUserRepository.findOneByOrFail({
            id: userId,
        });
        return this.decryptSecretAndRecoveryCodes(mfaSecret ?? '', mfaRecoveryCodes ?? []);
    }
    async validateMfa(userId, mfaCode, mfaRecoveryCode) {
        const user = await this.authUserRepository.findOneByOrFail({ id: userId });
        if (mfaCode) {
            const decryptedSecret = this.cipher.decrypt(user.mfaSecret);
            return this.totp.verifySecret({ secret: decryptedSecret, mfaCode });
        }
        if (mfaRecoveryCode) {
            const validCodes = user.mfaRecoveryCodes.map((code) => this.cipher.decrypt(code));
            const index = validCodes.indexOf(mfaRecoveryCode);
            if (index === -1)
                return false;
            validCodes.splice(index, 1);
            user.mfaRecoveryCodes = validCodes.map((code) => this.cipher.encrypt(code));
            await this.authUserRepository.save(user);
            return true;
        }
        return false;
    }
    async enableMfa(userId) {
        const user = await this.authUserRepository.findOneByOrFail({ id: userId });
        user.mfaEnabled = true;
        return await this.authUserRepository.save(user);
    }
    async disableMfaWithMfaCode(userId, mfaCode) {
        const isValidToken = await this.validateMfa(userId, mfaCode, undefined);
        if (!isValidToken) {
            throw new invalid_mfa_code_error_1.InvalidMfaCodeError();
        }
        await this.disableMfaForUser(userId);
    }
    async disableMfaWithRecoveryCode(userId, recoveryCode) {
        const isValidToken = await this.validateMfa(userId, undefined, recoveryCode);
        if (!isValidToken) {
            throw new invalid_mfa_recovery_code_error_1.InvalidMfaRecoveryCodeError();
        }
        await this.disableMfaForUser(userId);
    }
    async disableMfaForUser(userId) {
        await this.authUserRepository.update(userId, {
            mfaEnabled: false,
            mfaSecret: null,
            mfaRecoveryCodes: [],
        });
    }
};
exports.MfaService = MfaService;
exports.MfaService = MfaService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [db_1.AuthUserRepository,
        totp_service_1.TOTPService,
        n8n_core_1.Cipher])
], MfaService);
//# sourceMappingURL=mfa.service.js.map