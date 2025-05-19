"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamlPreferences = void 0;
const zod_1 = require("zod");
const zod_class_1 = require("zod-class");
const SamlLoginBindingSchema = zod_1.z.enum(['redirect', 'post']);
const SignatureConfigSchema = zod_1.z.object({
    prefix: zod_1.z.string().default('ds'),
    location: zod_1.z.object({
        reference: zod_1.z.string(),
        action: zod_1.z.enum(['before', 'after', 'prepend', 'append']),
    }),
});
class SamlPreferences extends zod_class_1.Z.class({
    mapping: zod_1.z
        .object({
        email: zod_1.z.string(),
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        userPrincipalName: zod_1.z.string(),
    })
        .optional(),
    metadata: zod_1.z.string().optional(),
    metadataUrl: zod_1.z.string().optional(),
    ignoreSSL: zod_1.z.boolean().default(false),
    loginBinding: SamlLoginBindingSchema.default('redirect'),
    loginEnabled: zod_1.z.boolean().optional(),
    loginLabel: zod_1.z.string().optional(),
    authnRequestsSigned: zod_1.z.boolean().default(false),
    wantAssertionsSigned: zod_1.z.boolean().default(true),
    wantMessageSigned: zod_1.z.boolean().default(true),
    acsBinding: SamlLoginBindingSchema.default('post'),
    signatureConfig: SignatureConfigSchema.default({
        prefix: 'ds',
        location: {
            reference: '/samlp:Response/saml:Issuer',
            action: 'after',
        },
    }),
    relayState: zod_1.z.string().default(''),
}) {
}
exports.SamlPreferences = SamlPreferences;
//# sourceMappingURL=saml-preferences.dto.js.map