"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedN8nApiClient = void 0;
const n8n_api_client_1 = require("./n8n-api-client");
class AuthenticatedN8nApiClient extends n8n_api_client_1.N8nApiClient {
    constructor(apiBaseUrl, authCookie) {
        super(apiBaseUrl);
        this.authCookie = authCookie;
    }
    static async createUsingUsernameAndPassword(apiClient, loginDetails) {
        const response = await apiClient.restApiRequest('/login', {
            method: 'POST',
            data: {
                emailOrLdapLoginId: loginDetails.email,
                password: loginDetails.password,
            },
        });
        if (response.data === 'n8n is starting up. Please wait') {
            await apiClient.delay(1000);
            return await this.createUsingUsernameAndPassword(apiClient, loginDetails);
        }
        const cookieHeader = response.headers['set-cookie'];
        const authCookie = Array.isArray(cookieHeader) ? cookieHeader.join('; ') : cookieHeader;
        if (!authCookie) {
            throw new Error('Did not receive authentication cookie even tho login succeeded: ' +
                JSON.stringify({
                    status: response.status,
                    headers: response.headers,
                    data: response.data,
                }, null, 2));
        }
        return new AuthenticatedN8nApiClient(apiClient.apiBaseUrl, authCookie);
    }
    async get(endpoint) {
        return await this.authenticatedRequest(endpoint, {
            method: 'GET',
        });
    }
    async post(endpoint, data) {
        return await this.authenticatedRequest(endpoint, {
            method: 'POST',
            data,
        });
    }
    async patch(endpoint, data) {
        return await this.authenticatedRequest(endpoint, {
            method: 'PATCH',
            data,
        });
    }
    async delete(endpoint) {
        return await this.authenticatedRequest(endpoint, {
            method: 'DELETE',
        });
    }
    async authenticatedRequest(endpoint, init) {
        return await this.restApiRequest(endpoint, {
            ...init,
            headers: {
                ...init.headers,
                cookie: this.authCookie,
            },
        });
    }
}
exports.AuthenticatedN8nApiClient = AuthenticatedN8nApiClient;
//# sourceMappingURL=authenticated-n8n-api-client.js.map