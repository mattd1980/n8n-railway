import type { AxiosRequestConfig } from 'axios';
export declare class N8nApiClient {
    readonly apiBaseUrl: string;
    constructor(apiBaseUrl: string);
    waitForInstanceToBecomeOnline(): Promise<void>;
    setupOwnerIfNeeded(loginDetails: {
        email: string;
        password: string;
    }): Promise<void>;
    restApiRequest<T>(endpoint: string, init: Omit<AxiosRequestConfig, 'url'>): Promise<import("axios").AxiosResponse<T, any>>;
    delay(ms: number): Promise<void>;
    protected getRestEndpointUrl(endpoint: string): string;
}
