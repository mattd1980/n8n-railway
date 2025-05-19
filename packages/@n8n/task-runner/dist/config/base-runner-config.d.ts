declare class HealthcheckServerConfig {
    enabled: boolean;
    host: string;
    port: number;
}
export declare class BaseRunnerConfig {
    taskBrokerUri: string;
    grantToken: string;
    maxPayloadSize: number;
    maxConcurrency: number;
    idleTimeout: number;
    timezone: string;
    taskTimeout: number;
    healthcheckServer: HealthcheckServerConfig;
}
export {};
