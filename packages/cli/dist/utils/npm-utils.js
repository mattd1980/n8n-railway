"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIntegrity = verifyIntegrity;
const axios_1 = __importDefault(require("axios"));
const n8n_workflow_1 = require("n8n-workflow");
const REQUEST_TIMEOUT = 30000;
async function verifyIntegrity(packageName, version, registryUrl, expectedIntegrity) {
    const timeoutOption = { timeout: REQUEST_TIMEOUT };
    try {
        const url = `${registryUrl.replace(/\/+$/, '')}/${encodeURIComponent(packageName)}`;
        const metadata = await axios_1.default.get(`${url}/${version}`, timeoutOption);
        if (metadata?.data?.dist?.integrity !== expectedIntegrity) {
            throw new n8n_workflow_1.UnexpectedError('Checksum verification failed. Package integrity does not match.');
        }
    }
    catch (error) {
        throw new n8n_workflow_1.UnexpectedError('Checksum verification failed', { cause: error });
    }
}
//# sourceMappingURL=npm-utils.js.map