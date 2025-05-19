"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var connection_pool_manager_exports = {};
__export(connection_pool_manager_exports, {
  ConnectionPoolManager: () => ConnectionPoolManager
});
module.exports = __toCommonJS(connection_pool_manager_exports);
var import_crypto = require("crypto");
let instance;
const ttl = 5 * 60 * 1e3;
const cleanUpInterval = 60 * 1e3;
class ConnectionPoolManager {
  /**
   * Private constructor that initializes the connection pool manager.
   * Sets up cleanup handlers for process exit and stale connections.
   */
  constructor() {
    this.map = /* @__PURE__ */ new Map();
    process.on("exit", () => this.onShutdown());
    setInterval(() => this.cleanupStaleConnections(), cleanUpInterval);
  }
  /**
   * Gets the singleton instance of the ConnectionPoolManager.
   * Creates a new instance if one doesn't exist.
   */
  static getInstance() {
    if (!instance) {
      instance = new ConnectionPoolManager();
    }
    return instance;
  }
  /**
   * Generates a unique key for connection pool identification.
   * Hashes the credentials and node information for security.
   */
  makeKey({ credentials, nodeType, nodeVersion }) {
    return (0, import_crypto.createHash)("sha1").update(
      JSON.stringify({
        credentials,
        nodeType,
        nodeVersion
      })
    ).digest("base64");
  }
  /**
   * Gets or creates a connection pool for the given options.
   * Updates the last used timestamp for existing connections.
   */
  async getConnection(options) {
    const key = this.makeKey(options);
    let value = this.map.get(key);
    if (!value) {
      value = {
        pool: await options.fallBackHandler(),
        cleanUpHandler: options.cleanUpHandler
      };
    }
    this.map.set(key, { ...value, lastUsed: Date.now() });
    return value.pool;
  }
  /**
   * Removes and cleans up connection pools that haven't been used within the
   * TTL.
   */
  cleanupStaleConnections() {
    const now = Date.now();
    for (const [key, { cleanUpHandler, lastUsed, pool }] of this.map.entries()) {
      if (now - lastUsed > ttl) {
        void cleanUpHandler(pool);
        this.map.delete(key);
      }
    }
  }
  /**
   * Removes and cleans up all existing connection pools.
   */
  async purgeConnections() {
    await Promise.all(
      [...this.map.entries()].map(async ([key, value]) => {
        this.map.delete(key);
        return await value.cleanUpHandler(value.pool);
      })
    );
  }
  /**
   * Cleans up all connection pools when the process is shutting down.
   * Does not wait for cleanup promises to resolve also does not remove the
   * references from the pool.
   *
   * Only call this on process shutdown.
   */
  onShutdown() {
    for (const { cleanUpHandler, pool } of this.map.values()) {
      void cleanUpHandler(pool);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConnectionPoolManager
});
//# sourceMappingURL=connection-pool-manager.js.map