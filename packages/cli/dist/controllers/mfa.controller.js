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
exports.MFAController = void 0;
const decorators_1 = require("@n8n/decorators");
const bad_request_error_1 = require("../errors/response-errors/bad-request.error");
const external_hooks_1 = require("../external-hooks");
const mfa_service_1 = require("../mfa/mfa.service");
let MFAController = class MFAController {
    constructor(mfaService, externalHooks) {
        this.mfaService = mfaService;
        this.externalHooks = externalHooks;
    }
    async canEnableMFA(req) {
        await this.externalHooks.run('mfa.beforeSetup', [req.user]);
        return;
    }
    async getQRCode(req) {
        const { email, id, mfaEnabled } = req.user;
        if (mfaEnabled)
            throw new bad_request_error_1.BadRequestError('MFA already enabled. Disable it to generate new secret and recovery codes');
        const { decryptedSecret: secret, decryptedRecoveryCodes: recoveryCodes } = await this.mfaService.getSecretAndRecoveryCodes(id);
        if (secret && recoveryCodes.length) {
            const qrCode = this.mfaService.totp.generateTOTPUri({
                secret,
                label: email,
            });
            return {
                secret,
                recoveryCodes,
                qrCode,
            };
        }
        const newRecoveryCodes = this.mfaService.generateRecoveryCodes();
        const newSecret = this.mfaService.totp.generateSecret();
        const qrCode = this.mfaService.totp.generateTOTPUri({ secret: newSecret, label: email });
        await this.mfaService.saveSecretAndRecoveryCodes(id, newSecret, newRecoveryCodes);
        return {
            secret: newSecret,
            qrCode,
            recoveryCodes: newRecoveryCodes,
        };
    }
    async activateMFA(req) {
        const { mfaCode = null } = req.body;
        const { id, mfaEnabled } = req.user;
        await this.externalHooks.run('mfa.beforeSetup', [req.user]);
        const { decryptedSecret: secret, decryptedRecoveryCodes: recoveryCodes } = await this.mfaService.getSecretAndRecoveryCodes(id);
        if (!mfaCode)
            throw new bad_request_error_1.BadRequestError('Token is required to enable MFA feature');
        if (mfaEnabled)
            throw new bad_request_error_1.BadRequestError('MFA already enabled');
        if (!secret || !recoveryCodes.length) {
            throw new bad_request_error_1.BadRequestError('Cannot enable MFA without generating secret and recovery codes');
        }
        const verified = this.mfaService.totp.verifySecret({ secret, mfaCode, window: 10 });
        if (!verified)
            throw new bad_request_error_1.BadRequestError('MFA code expired. Close the modal and enable MFA again', 997);
        await this.mfaService.enableMfa(id);
    }
    async disableMFA(req) {
        const { id: userId } = req.user;
        const { mfaCode, mfaRecoveryCode } = req.body;
        const mfaCodeDefined = mfaCode && typeof mfaCode === 'string';
        const mfaRecoveryCodeDefined = mfaRecoveryCode && typeof mfaRecoveryCode === 'string';
        if (!mfaCodeDefined === !mfaRecoveryCodeDefined) {
            throw new bad_request_error_1.BadRequestError('Either MFA code or recovery code is required to disable MFA feature');
        }
        if (mfaCodeDefined) {
            await this.mfaService.disableMfaWithMfaCode(userId, mfaCode);
        }
        else if (mfaRecoveryCodeDefined) {
            await this.mfaService.disableMfaWithRecoveryCode(userId, mfaRecoveryCode);
        }
    }
    async verifyMFA(req) {
        const { id } = req.user;
        const { mfaCode } = req.body;
        const { decryptedSecret: secret } = await this.mfaService.getSecretAndRecoveryCodes(id);
        if (!mfaCode)
            throw new bad_request_error_1.BadRequestError('MFA code is required to enable MFA feature');
        if (!secret)
            throw new bad_request_error_1.BadRequestError('No MFA secret se for this user');
        const verified = this.mfaService.totp.verifySecret({ secret, mfaCode });
        if (!verified)
            throw new bad_request_error_1.BadRequestError('MFA secret could not be verified');
    }
};
exports.MFAController = MFAController;
__decorate([
    (0, decorators_1.Post)('/can-enable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MFAController.prototype, "canEnableMFA", null);
__decorate([
    (0, decorators_1.Get)('/qr'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MFAController.prototype, "getQRCode", null);
__decorate([
    (0, decorators_1.Post)('/enable', { rateLimit: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MFAController.prototype, "activateMFA", null);
__decorate([
    (0, decorators_1.Post)('/disable', { rateLimit: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MFAController.prototype, "disableMFA", null);
__decorate([
    (0, decorators_1.Post)('/verify', { rateLimit: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MFAController.prototype, "verifyMFA", null);
exports.MFAController = MFAController = __decorate([
    (0, decorators_1.RestController)('/mfa'),
    __metadata("design:paramtypes", [mfa_service_1.MfaService,
        external_hooks_1.ExternalHooks])
], MFAController);
//# sourceMappingURL=mfa.controller.js.map