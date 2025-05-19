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
var utils_exports = {};
__export(utils_exports, {
  convertInfoToObject: () => convertInfoToObject,
  getValue: () => getValue,
  redisConnectionTest: () => redisConnectionTest,
  setValue: () => setValue,
  setupRedisClient: () => setupRedisClient
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_redis = require("redis");
function setupRedisClient(credentials) {
  return (0, import_redis.createClient)({
    socket: {
      host: credentials.host,
      port: credentials.port,
      tls: credentials.ssl === true
    },
    database: credentials.database,
    username: credentials.user || void 0,
    password: credentials.password || void 0
  });
}
async function redisConnectionTest(credential) {
  const credentials = credential.data;
  try {
    const client = setupRedisClient(credentials);
    await client.connect();
    await client.ping();
    return {
      status: "OK",
      message: "Connection successful!"
    };
  } catch (error) {
    return {
      status: "Error",
      message: error.message
    };
  }
}
function getParsedValue(value) {
  if (value.match(/^[\d\.]+$/) === null) {
    return value;
  } else {
    return parseFloat(value);
  }
}
function convertInfoToObject(stringData) {
  const returnData = {};
  let key, value;
  for (const line of stringData.split("\n")) {
    if (["#", ""].includes(line.charAt(0))) {
      continue;
    }
    [key, value] = line.split(":");
    if (key === void 0 || value === void 0) {
      continue;
    }
    value = value.trim();
    if (value.includes("=")) {
      returnData[key] = {};
      let key2, value2;
      for (const keyValuePair of value.split(",")) {
        [key2, value2] = keyValuePair.split("=");
        returnData[key][key2] = getParsedValue(value2);
      }
    } else {
      returnData[key] = getParsedValue(value);
    }
  }
  return returnData;
}
async function getValue(client, keyName, type) {
  if (type === void 0 || type === "automatic") {
    type = await client.type(keyName);
  }
  if (type === "string") {
    return await client.get(keyName);
  } else if (type === "hash") {
    return await client.hGetAll(keyName);
  } else if (type === "list") {
    return await client.lRange(keyName, 0, -1);
  } else if (type === "sets") {
    return await client.sMembers(keyName);
  }
}
async function setValue(client, keyName, value, expire, ttl, type, valueIsJSON) {
  if (type === void 0 || type === "automatic") {
    if (typeof value === "string") {
      type = "string";
    } else if (Array.isArray(value)) {
      type = "list";
    } else if (typeof value === "object") {
      type = "hash";
    } else {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Could not identify the type to set. Please set it manually!"
      );
    }
  }
  if (type === "string") {
    await client.set(keyName, value.toString());
  } else if (type === "hash") {
    if (valueIsJSON) {
      let values;
      if (typeof value === "string") {
        try {
          values = JSON.parse(value);
        } catch {
          values = value;
        }
      } else {
        values = value;
      }
      for (const key of Object.keys(values)) {
        await client.hSet(keyName, key, values[key].toString());
      }
    } else {
      const values = value.toString().split(" ");
      await client.hSet(keyName, values);
    }
  } else if (type === "list") {
    for (let index = 0; index < value.length; index++) {
      await client.lSet(keyName, index, value[index].toString());
    }
  } else if (type === "sets") {
    await client.sAdd(keyName, value);
  }
  if (expire) {
    await client.expire(keyName, ttl);
  }
  return;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertInfoToObject,
  getValue,
  redisConnectionTest,
  setValue,
  setupRedisClient
});
//# sourceMappingURL=utils.js.map