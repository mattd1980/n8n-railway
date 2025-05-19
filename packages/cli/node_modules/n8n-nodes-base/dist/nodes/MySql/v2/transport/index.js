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
  createPool: () => createPool
});
module.exports = __toCommonJS(transport_exports);
var import_promise = __toESM(require("mysql2/promise"));
var import_node_net = require("node:net");
var import_constants = require("../../../../utils/constants");
var import_utilities = require("../../../../utils/utilities");
async function createPool(credentials, options) {
  const connectionOptions = {
    host: credentials.host,
    port: credentials.port,
    database: credentials.database,
    user: credentials.user,
    password: credentials.password,
    multipleStatements: true,
    supportBigNumbers: true,
    decimalNumbers: false
  };
  if (credentials.ssl) {
    connectionOptions.ssl = {};
    if (credentials.caCertificate) {
      connectionOptions.ssl.ca = (0, import_utilities.formatPrivateKey)(credentials.caCertificate);
    }
    if (credentials.clientCertificate || credentials.clientPrivateKey) {
      connectionOptions.ssl.cert = (0, import_utilities.formatPrivateKey)(credentials.clientCertificate);
      connectionOptions.ssl.key = (0, import_utilities.formatPrivateKey)(credentials.clientPrivateKey);
    }
  }
  if (options?.nodeVersion && options.nodeVersion >= 2.1) {
    connectionOptions.dateStrings = true;
  }
  if (options?.connectionLimit) {
    connectionOptions.connectionLimit = options.connectionLimit;
  }
  if (options?.connectTimeout) {
    connectionOptions.connectTimeout = options.connectTimeout;
  }
  if (options?.largeNumbersOutput === "text") {
    connectionOptions.bigNumberStrings = true;
  }
  if (options?.decimalNumbers === true) {
    connectionOptions.decimalNumbers = true;
  }
  if (!credentials.sshTunnel) {
    return import_promise.default.createPool(connectionOptions);
  } else {
    if (credentials.sshAuthenticateWith === "privateKey" && credentials.privateKey) {
      credentials.privateKey = (0, import_utilities.formatPrivateKey)(credentials.privateKey);
    }
    const sshClient = await this.helpers.getSSHClient(credentials);
    const localPort = await new Promise((resolve) => {
      const tempServer = (0, import_node_net.createServer)();
      tempServer.listen(0, import_constants.LOCALHOST, () => {
        resolve(tempServer.address().port);
        tempServer.close();
      });
    });
    const stream = await new Promise((resolve, reject) => {
      sshClient.forwardOut(
        import_constants.LOCALHOST,
        localPort,
        credentials.host,
        credentials.port,
        (err, clientChannel) => {
          if (err) return reject(err);
          resolve(clientChannel);
        }
      );
    });
    return import_promise.default.createPool({
      ...connectionOptions,
      stream
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPool
});
//# sourceMappingURL=index.js.map