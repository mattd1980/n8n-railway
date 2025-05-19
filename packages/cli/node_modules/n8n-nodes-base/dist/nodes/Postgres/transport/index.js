"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var transport_exports = {};
__export(transport_exports, {
  configurePostgres: () => configurePostgres
});
module.exports = __toCommonJS(transport_exports);
var import_node_net = require("node:net");
var import_pg_promise = __toESM(require("pg-promise"));
var import_connection_pool_manager = require("../../../utils/connection-pool-manager");
var import_constants = require("../../../utils/constants");
var import_utilities = require("../../../utils/utilities");
const getPostgresConfig = (credentials, options = {}) => {
  const dbConfig = {
    host: credentials.host,
    port: credentials.port,
    database: credentials.database,
    user: credentials.user,
    password: credentials.password,
    keepAlive: true,
    max: credentials.maxConnections
  };
  if (options.connectionTimeout) {
    dbConfig.connectionTimeoutMillis = options.connectionTimeout * 1e3;
  }
  if (options.delayClosingIdleConnection) {
    dbConfig.keepAliveInitialDelayMillis = options.delayClosingIdleConnection * 1e3;
  }
  if (credentials.allowUnauthorizedCerts === true) {
    dbConfig.ssl = {
      rejectUnauthorized: false
    };
  } else {
    dbConfig.ssl = !["disable", void 0].includes(credentials.ssl);
    dbConfig.sslmode = credentials.ssl || "disable";
  }
  return dbConfig;
};
async function configurePostgres(credentials, options = {}) {
  const poolManager = import_connection_pool_manager.ConnectionPoolManager.getInstance();
  const fallBackHandler = async () => {
    const pgp = (0, import_pg_promise.default)({
      // prevent spam in console "WARNING: Creating a duplicate database object for the same connection."
      // duplicate connections created when auto loading parameters, they are closed immediately after, but several could be open at the same time
      noWarnings: true
    });
    if (typeof options.nodeVersion === "number" && options.nodeVersion >= 2.1) {
      [pgp.pg.types.builtins.TIMESTAMP, pgp.pg.types.builtins.TIMESTAMPTZ].forEach((type) => {
        pgp.pg.types.setTypeParser(type, (value) => {
          const parsedDate = new Date(value);
          if (isNaN(parsedDate.getTime())) {
            return value;
          }
          return parsedDate.toISOString();
        });
      });
    }
    if (options.largeNumbersOutput === "numbers") {
      pgp.pg.types.setTypeParser(20, (value) => {
        return parseInt(value, 10);
      });
      pgp.pg.types.setTypeParser(1700, (value) => {
        return parseFloat(value);
      });
    }
    const dbConfig = getPostgresConfig(credentials, options);
    if (!credentials.sshTunnel) {
      const db = pgp(dbConfig);
      return { db, pgp };
    } else {
      if (credentials.sshAuthenticateWith === "privateKey" && credentials.privateKey) {
        credentials.privateKey = (0, import_utilities.formatPrivateKey)(credentials.privateKey);
      }
      const sshClient = await this.helpers.getSSHClient(credentials);
      const proxy = (0, import_node_net.createServer)();
      const proxyPort = await new Promise((resolve) => {
        proxy.listen(0, import_constants.LOCALHOST, () => {
          resolve(proxy.address().port);
        });
      });
      const close = () => {
        proxy.close();
        sshClient.off("end", close);
        sshClient.off("error", close);
      };
      sshClient.on("end", close);
      sshClient.on("error", close);
      await new Promise((resolve, reject) => {
        proxy.on("error", (err) => reject(err));
        proxy.on("connection", (localSocket) => {
          sshClient.forwardOut(
            import_constants.LOCALHOST,
            localSocket.remotePort,
            credentials.host,
            credentials.port,
            (err, clientChannel) => {
              if (err) {
                proxy.close();
                localSocket.destroy();
              } else {
                localSocket.pipe(clientChannel);
                clientChannel.pipe(localSocket);
              }
            }
          );
        });
        resolve();
      }).catch((err) => {
        proxy.close();
        let message = err.message;
        let description = err.description;
        if (err.message.includes("ECONNREFUSED")) {
          message = "Connection refused";
          try {
            description = err.message.split("ECONNREFUSED ")[1].trim();
          } catch (e) {
          }
        }
        if (err.message.includes("ENOTFOUND")) {
          message = "Host not found";
          try {
            description = err.message.split("ENOTFOUND ")[1].trim();
          } catch (e) {
          }
        }
        if (err.message.includes("ETIMEDOUT")) {
          message = "Connection timed out";
          try {
            description = err.message.split("ETIMEDOUT ")[1].trim();
          } catch (e) {
          }
        }
        err.message = message;
        err.description = description;
        throw err;
      });
      const db = pgp({
        ...dbConfig,
        port: proxyPort,
        host: import_constants.LOCALHOST
      });
      return { db, pgp };
    }
  };
  return await poolManager.getConnection({
    credentials,
    nodeType: "postgres",
    nodeVersion: options.nodeVersion,
    fallBackHandler,
    cleanUpHandler: async ({ db }) => {
      if (!db.$pool.ended) await db.$pool.end();
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configurePostgres
});
//# sourceMappingURL=index.js.map