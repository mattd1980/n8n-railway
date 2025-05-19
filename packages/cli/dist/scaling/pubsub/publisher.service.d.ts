import type { Redis as SingleNodeClient, Cluster as MultiNodeClient } from 'ioredis';
import { InstanceSettings, Logger } from 'n8n-core';
import { RedisClientService } from '../../services/redis-client.service';
import type { PubSub } from './pubsub.types';
export declare class Publisher {
    private readonly logger;
    private readonly redisClientService;
    private readonly instanceSettings;
    private readonly client;
    constructor(logger: Logger, redisClientService: RedisClientService, instanceSettings: InstanceSettings);
    getClient(): SingleNodeClient | MultiNodeClient;
    shutdown(): void;
    publishCommand(msg: PubSub.Command): Promise<void>;
    publishWorkerResponse(msg: PubSub.WorkerResponse): Promise<void>;
    setIfNotExists(key: string, value: string, ttl: number): Promise<boolean>;
    setExpiration(key: string, ttl: number): Promise<void>;
    get(key: string): Promise<string | null>;
    clear(key: string): Promise<void>;
}
