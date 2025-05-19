import { createClient } from "redis";
// A minimalistic connection pool to avoid creating multiple connections
class RedisConnectionPool {
    constructor() {
        Object.defineProperty(this, "clients", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    getClient(config = {}) {
        if (!this.clients.has(config))
            this.clients.set(config, createClient(config));
        return this.clients.get(config);
    }
}
export const pool = new RedisConnectionPool();
