"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const redis_1 = require("redis");
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
            this.clients.set(config, (0, redis_1.createClient)(config));
        return this.clients.get(config);
    }
}
exports.pool = new RedisConnectionPool();
