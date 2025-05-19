import { RedisClientOptions } from "redis";
declare class RedisConnectionPool {
    clients: Map<any, any>;
    getClient(config?: RedisClientOptions): any;
}
export declare const pool: RedisConnectionPool;
export {};
