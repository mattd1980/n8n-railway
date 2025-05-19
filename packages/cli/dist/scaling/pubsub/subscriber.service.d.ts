import type { Redis as SingleNodeClient, Cluster as MultiNodeClient } from 'ioredis';
import { InstanceSettings, Logger } from 'n8n-core';
import { EventService } from '../../events/event.service';
import { RedisClientService } from '../../services/redis-client.service';
import type { PubSub } from './pubsub.types';
export declare class Subscriber {
    private readonly logger;
    private readonly redisClientService;
    private readonly eventService;
    private readonly instanceSettings;
    private readonly client;
    constructor(logger: Logger, redisClientService: RedisClientService, eventService: EventService, instanceSettings: InstanceSettings);
    getClient(): SingleNodeClient | MultiNodeClient;
    shutdown(): void;
    subscribe(channel: PubSub.Channel): Promise<void>;
    private parseMessage;
}
