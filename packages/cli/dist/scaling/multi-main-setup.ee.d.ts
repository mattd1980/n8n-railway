import { GlobalConfig } from '@n8n/config';
import { MultiMainMetadata } from '@n8n/decorators';
import { InstanceSettings, Logger } from 'n8n-core';
import { Publisher } from '../scaling/pubsub/publisher.service';
import { RedisClientService } from '../services/redis-client.service';
import { TypedEmitter } from '../typed-emitter';
type MultiMainEvents = {
    'leader-stepdown': never;
    'leader-takeover': never;
};
export declare class MultiMainSetup extends TypedEmitter<MultiMainEvents> {
    private readonly logger;
    private readonly instanceSettings;
    private readonly publisher;
    private readonly redisClientService;
    private readonly globalConfig;
    private readonly metadata;
    constructor(logger: Logger, instanceSettings: InstanceSettings, publisher: Publisher, redisClientService: RedisClientService, globalConfig: GlobalConfig, metadata: MultiMainMetadata);
    private leaderKey;
    private readonly leaderKeyTtl;
    private leaderCheckInterval;
    init(): Promise<void>;
    shutdown(): Promise<void>;
    private checkLeader;
    private tryBecomeLeader;
    fetchLeaderKey(): Promise<string | null>;
    registerEventHandlers(): void;
}
export {};
