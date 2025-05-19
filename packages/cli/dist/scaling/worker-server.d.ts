import { GlobalConfig } from '@n8n/config';
import { InstanceSettings, Logger } from 'n8n-core';
import { CredentialsOverwrites } from '../credentials-overwrites';
import { DbConnection } from '../databases/db-connection';
import { ExternalHooks } from '../external-hooks';
import { PrometheusMetricsService } from '../metrics/prometheus-metrics.service';
import { RedisClientService } from '../services/redis-client.service';
export type WorkerServerEndpointsConfig = {
    health: boolean;
    overwrites: boolean;
    metrics: boolean;
};
export declare class WorkerServer {
    private readonly globalConfig;
    private readonly logger;
    private readonly dbConnection;
    private readonly credentialsOverwrites;
    private readonly externalHooks;
    private readonly instanceSettings;
    private readonly prometheusMetricsService;
    private readonly redisClientService;
    private readonly port;
    private readonly address;
    private readonly server;
    private readonly app;
    private endpointsConfig;
    private overwritesLoaded;
    constructor(globalConfig: GlobalConfig, logger: Logger, dbConnection: DbConnection, credentialsOverwrites: CredentialsOverwrites, externalHooks: ExternalHooks, instanceSettings: InstanceSettings, prometheusMetricsService: PrometheusMetricsService, redisClientService: RedisClientService);
    init(endpointsConfig: WorkerServerEndpointsConfig): Promise<void>;
    private mountEndpoints;
    private readiness;
    private handleOverwrites;
}
