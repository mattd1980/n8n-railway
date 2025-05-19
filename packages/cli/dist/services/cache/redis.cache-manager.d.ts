import type { Cache, Store, Config } from 'cache-manager';
import Redis from 'ioredis';
import type { Cluster, ClusterNode, ClusterOptions, RedisOptions } from 'ioredis';
export declare class NoCacheableError implements Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare const avoidNoCacheable: <T>(p: Promise<T>) => Promise<T | undefined>;
export interface RedisClusterConfig {
    nodes: ClusterNode[];
    options?: ClusterOptions;
}
export type RedisCache = Cache<RedisStore>;
export interface RedisStore extends Store {
    readonly isCacheable: (value: unknown) => boolean;
    get client(): Redis | Cluster;
    hget<T>(key: string, field: string): Promise<T | undefined>;
    hgetall<T>(key: string): Promise<Record<string, T> | undefined>;
    hset(key: string, fieldValueRecord: Record<string, unknown>): Promise<void>;
    hkeys(key: string): Promise<string[]>;
    hvals<T>(key: string): Promise<T[]>;
    hexists(key: string, field: string): Promise<boolean>;
    hdel(key: string, field: string): Promise<number>;
    expire(key: string, ttlSeconds: number): Promise<void>;
}
export declare function redisStoreUsingClient(redisCache: Redis | Cluster, options?: Config): RedisStore;
export declare function redisStore(options?: (RedisOptions | {
    clusterConfig: RedisClusterConfig;
}) & Config): Promise<RedisStore>;
