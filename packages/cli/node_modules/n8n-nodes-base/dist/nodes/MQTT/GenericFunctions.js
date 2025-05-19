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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  createClient: () => createClient
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_mqtt = require("mqtt");
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../utils/utilities");
const createClient = async (credentials) => {
  const { protocol, host, port, clean, clientId, username, password } = credentials;
  const clientOptions = {
    protocol,
    host,
    port,
    clean,
    clientId: clientId || `mqttjs_${(0, import_n8n_workflow.randomString)(8).toLowerCase()}`
  };
  if (username && password) {
    clientOptions.username = username;
    clientOptions.password = password;
  }
  if (credentials.ssl) {
    clientOptions.ca = (0, import_utilities.formatPrivateKey)(credentials.ca);
    clientOptions.cert = (0, import_utilities.formatPrivateKey)(credentials.cert);
    clientOptions.key = (0, import_utilities.formatPrivateKey)(credentials.key);
    clientOptions.rejectUnauthorized = credentials.rejectUnauthorized;
  }
  return await new Promise((resolve, reject) => {
    const client = (0, import_mqtt.connect)(clientOptions);
    const onConnect = () => {
      client.removeListener("connect", onConnect);
      client.removeListener("error", onError);
      resolve(client);
    };
    const onError = (error) => {
      client.removeListener("connect", onConnect);
      client.removeListener("error", onError);
      client.end();
      reject(new import_n8n_workflow.ApplicationError(error.message));
    };
    client.once("connect", onConnect);
    client.once("error", onError);
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createClient
});
//# sourceMappingURL=GenericFunctions.js.map