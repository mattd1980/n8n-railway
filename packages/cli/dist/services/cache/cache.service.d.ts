import { GlobalConfig } from '@n8n/config';
import type { MaybeHash, Hash } from '../../services/cache/cache.types';
import { TypedEmitter } from '../../typed-emitter';
type CacheEvents = {
    'metrics.cache.hit': never;
    'metrics.cache.miss': never;
    'metrics.cache.update': never;
};
export declare class CacheService extends TypedEmitter<CacheEvents> {
    private readonly globalConfig;
    constructor(globalConfig: GlobalConfig);
    private cache;
    init(): Promise<void>;
    reset(): Promise<void>;
    isRedis(): boolean;
    isMemory(): boolean;
    set(key: string, value: unknown, ttl?: number): Promise<void>;
    setMany(keysValues: Array<[key: string, value: unknown]>, ttl?: number): Promise<void>;
    setHash(key: string, hash: Hash): Promise<void>;
    expire(key: string, ttlMs: number): Promise<void>;
    get<T = unknown>(key: string, { fallbackValue, refreshFn, }?: {
        fallbackValue?: T;
        refreshFn?: (key: string) => Promise<T | undefined>;
    }): Promise<T | undefined>;
    getMany<T = unknown[]>(keys: string[], { fallbackValue, refreshFn, }?: {
        fallbackValue?: T[];
        refreshFn?: (keys: string[]) => Promise<T[]>;
    }): Promise<T[] | undefined>;
    getHash<T = unknown>(key: string, { fallbackValue, refreshFn, }?: {
        fallbackValue?: T;
        refreshFn?: (key: string) => Promise<MaybeHash<T>>;
    }): Promise<MaybeHash<T>>;
    getHashValue<T = unknown>(cacheKey: string, hashKey: string, { fallbackValue, refreshFn, }?: {
        fallbackValue?: T;
        refreshFn?: (key: string) => Promise<T | undefined>;
    }): Promise<T | undefined>;
    delete(key: string): Promise<void>;
    deleteMany(keys: string[]): Promise<void>;
    deleteFromHash(cacheKey: string, hashKey: string): Promise<void>;
}
export {};
