"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
class N8nApiClient {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
    }
    async waitForInstanceToBecomeOnline() {
        const HEALTH_ENDPOINT = 'healthz';
        const START_TIME = Date.now();
        const INTERVAL_MS = 1000;
        const TIMEOUT_MS = 60_000;
        while (Date.now() - START_TIME < TIMEOUT_MS) {
            try {
                const response = await axios_1.default.request({
                    url: `${this.apiBaseUrl}/${HEALTH_ENDPOINT}`,
                    method: 'GET',
                });
                if (response.status === 200 && response.data.status === 'ok') {
                    return;
                }
            }
            catch { }
            console.log(`n8n instance not online yet, retrying in ${INTERVAL_MS / 1000} seconds...`);
            await this.delay(INTERVAL_MS);
        }
        throw new Error(`n8n instance did not come online within ${TIMEOUT_MS / 1000} seconds`);
    }
    async setupOwnerIfNeeded(loginDetails) {
        const response = await this.restApiRequest('/owner/setup', {
            method: 'POST',
            data: {
                email: loginDetails.email,
                password: loginDetails.password,
                firstName: 'Test',
                lastName: 'User',
            },
            validateStatus: () => true,
        });
        const responsePayload = response.data;
        if (response.status === 200) {
            console.log('Owner setup successful');
        }
        else if (response.status === 400) {
            if (responsePayload.message === 'Instance owner already setup')
                console.log('Owner already set up');
        }
        else if (response.status === 404) {
            console.log('Owner setup endpoint not available yet, retrying in 1s...');
            await this.delay(1000);
            await this.setupOwnerIfNeeded(loginDetails);
        }
        else {
            throw new Error(`Owner setup failed with status ${response.status}: ${responsePayload.message}`);
        }
    }
    async restApiRequest(endpoint, init) {
        try {
            return await axios_1.default.request({
                ...init,
                url: this.getRestEndpointUrl(endpoint),
            });
        }
        catch (e) {
            const error = e;
            console.error(`[ERROR] Request failed ${init.method} ${endpoint}`, error?.response?.data);
            throw error;
        }
    }
    async delay(ms) {
        return await new Promise((resolve) => setTimeout(resolve, ms));
    }
    getRestEndpointUrl(endpoint) {
        return `${this.apiBaseUrl}/rest${endpoint}`;
    }
}
exports.N8nApiClient = N8nApiClient;
//# sourceMappingURL=n8n-api-client.js.map