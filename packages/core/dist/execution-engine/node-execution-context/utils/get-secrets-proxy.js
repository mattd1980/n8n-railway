"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecretsProxy = getSecretsProxy;
const n8n_workflow_1 = require("n8n-workflow");
function buildSecretsValueProxy(value) {
    return new Proxy(value, {
        get(_target, valueName) {
            if (typeof valueName !== 'string') {
                return;
            }
            if (!(valueName in value)) {
                throw new n8n_workflow_1.ExpressionError('Could not load secrets', {
                    description: 'The credential in use tries to use secret from an external store that could not be found',
                });
            }
            const retValue = value[valueName];
            if (typeof retValue === 'object' && retValue !== null) {
                return buildSecretsValueProxy(retValue);
            }
            return retValue;
        },
    });
}
function getSecretsProxy(additionalData) {
    const secretsHelpers = additionalData.secretsHelpers;
    return new Proxy({}, {
        get(_target, providerName) {
            if (typeof providerName !== 'string') {
                return {};
            }
            if (secretsHelpers.hasProvider(providerName)) {
                return new Proxy({}, {
                    get(_target2, secretName) {
                        if (typeof secretName !== 'string') {
                            return;
                        }
                        if (!secretsHelpers.hasSecret(providerName, secretName)) {
                            throw new n8n_workflow_1.ExpressionError('Could not load secrets', {
                                description: 'The credential in use tries to use secret from an external store that could not be found',
                            });
                        }
                        const retValue = secretsHelpers.getSecret(providerName, secretName);
                        if (typeof retValue === 'object' && retValue !== null) {
                            return buildSecretsValueProxy(retValue);
                        }
                        return retValue;
                    },
                    set() {
                        return false;
                    },
                    ownKeys() {
                        return secretsHelpers.listSecrets(providerName);
                    },
                });
            }
            throw new n8n_workflow_1.ExpressionError('Could not load secrets', {
                description: 'The credential in use pulls secrets from an external store that is not reachable',
            });
        },
        set() {
            return false;
        },
        ownKeys() {
            return secretsHelpers.listProviders();
        },
    });
}
//# sourceMappingURL=get-secrets-proxy.js.map