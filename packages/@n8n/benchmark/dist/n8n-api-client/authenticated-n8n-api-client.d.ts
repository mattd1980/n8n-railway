import type { AxiosRequestConfig } from 'axios';
import { N8nApiClient } from './n8n-api-client';
export declare class AuthenticatedN8nApiClient extends N8nApiClient {
    private readonly authCookie;
    constructor(apiBaseUrl: string, authCookie: string);
    static createUsingUsernameAndPassword(apiClient: N8nApiClient, loginDetails: {
        email: string;
        password: string;
    }): Promise<AuthenticatedN8nApiClient>;
    get<T>(endpoint: string): Promise<import("axios").AxiosResponse<T, any>>;
    post<T>(endpoint: string, data: unknown): Promise<import("axios").AxiosResponse<T, any>>;
    patch<T>(endpoint: string, data: unknown): Promise<import("axios").AxiosResponse<T, any>>;
    delete<T>(endpoint: string): Promise<import("axios").AxiosResponse<T, any>>;
    protected authenticatedRequest<T>(endpoint: string, init: Omit<AxiosRequestConfig, 'url'>): Promise<import("axios").AxiosResponse<T, any>>;
}
