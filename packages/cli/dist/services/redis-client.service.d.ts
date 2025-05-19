import { GlobalConfig } from '@n8n/config';
import ioRedis from 'ioredis';
import type { Cluster, RedisOptions } from 'ioredis';
import { Logger } from 'n8n-core';
import { TypedEmitter } from '../typed-emitter';
import type { RedisClientType } from '../scaling/redis/redis.types';
type RedisEventMap = {
    'connection-lost': number;
    'connection-recovered': never;
};
export declare class RedisClientService extends TypedEmitter<RedisEventMap> {
    private readonly logger;
    private readonly globalConfig;
    private readonly clients;
    private readonly config;
    private lostConnection;
    constructor(logger: Logger, globalConfig: GlobalConfig);
    isConnected(): boolean;
    createClient(arg: {
        type: RedisClientType;
        extraOptions?: RedisOptions;
    }): ioRedis | Cluster;
    toValidPrefix(prefix: string): string;
    private createRegularClient;
    private createClusterClient;
    private getOptions;
    private retryStrategy;
    private clusterNodes;
    emit<Event extends keyof RedisEventMap>(event: Event, ...args: Array<RedisEventMap[Event]>): boolean;
    private registerListeners;
    private formatTimeout;
}
export {};
