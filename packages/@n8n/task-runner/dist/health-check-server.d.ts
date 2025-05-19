export declare class HealthCheckServer {
    private server;
    start(host: string, port: number): Promise<void>;
    stop(): Promise<void>;
}
