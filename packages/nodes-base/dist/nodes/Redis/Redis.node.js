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
var Redis_node_exports = {};
__export(Redis_node_exports, {
  Redis: () => Redis
});
module.exports = __toCommonJS(Redis_node_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("./utils");
class Redis {
  constructor() {
    this.description = {
      displayName: "Redis",
      name: "redis",
      icon: "file:redis.svg",
      group: ["input"],
      version: 1,
      description: "Get, send and update data in Redis",
      defaults: {
        name: "Redis"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      usableAsTool: true,
      credentials: [
        {
          name: "redis",
          required: true,
          testedBy: "redisConnectionTest"
        }
      ],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Delete",
              value: "delete",
              description: "Delete a key from Redis",
              action: "Delete a key from Redis"
            },
            {
              name: "Get",
              value: "get",
              description: "Get the value of a key from Redis",
              action: "Get the value of a key from Redis"
            },
            {
              name: "Increment",
              value: "incr",
              description: "Atomically increments a key by 1. Creates the key if it does not exist.",
              action: "Atomically increment a key by 1. Creates the key if it does not exist."
            },
            {
              name: "Info",
              value: "info",
              description: "Returns generic information about the Redis instance",
              action: "Return generic information about the Redis instance"
            },
            {
              name: "Keys",
              value: "keys",
              description: "Returns all the keys matching a pattern",
              action: "Return all keys matching a pattern"
            },
            {
              name: "Pop",
              value: "pop",
              description: "Pop data from a redis list",
              action: "Pop data from a redis list"
            },
            {
              name: "Publish",
              value: "publish",
              description: "Publish message to redis channel",
              action: "Publish message to redis channel"
            },
            {
              name: "Push",
              value: "push",
              description: "Push data to a redis list",
              action: "Push data to a redis list"
            },
            {
              name: "Set",
              value: "set",
              description: "Set the value of a key in redis",
              action: "Set the value of a key in redis"
            }
          ],
          default: "info"
        },
        // ----------------------------------
        //         delete
        // ----------------------------------
        {
          displayName: "Key",
          name: "key",
          type: "string",
          displayOptions: {
            show: {
              operation: ["delete"]
            }
          },
          default: "",
          required: true,
          description: "Name of the key to delete from Redis"
        },
        // ----------------------------------
        //         get
        // ----------------------------------
        {
          displayName: "Name",
          name: "propertyName",
          type: "string",
          displayOptions: {
            show: {
              operation: ["get"]
            }
          },
          default: "propertyName",
          required: true,
          description: 'Name of the property to write received data to. Supports dot-notation. Example: "data.person[0].name".'
        },
        {
          displayName: "Key",
          name: "key",
          type: "string",
          displayOptions: {
            show: {
              operation: ["get"]
            }
          },
          default: "",
          required: true,
          description: "Name of the key to get from Redis"
        },
        {
          displayName: "Key Type",
          name: "keyType",
          type: "options",
          displayOptions: {
            show: {
              operation: ["get"]
            }
          },
          options: [
            {
              name: "Automatic",
              value: "automatic",
              description: "Requests the type before requesting the data (slower)"
            },
            {
              name: "Hash",
              value: "hash",
              description: "Data in key is of type 'hash'"
            },
            {
              name: "List",
              value: "list",
              description: "Data in key is of type 'lists'"
            },
            {
              name: "Sets",
              value: "sets",
              description: "Data in key is of type 'sets'"
            },
            {
              name: "String",
              value: "string",
              description: "Data in key is of type 'string'"
            }
          ],
          default: "automatic",
          description: "The type of the key to get"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          displayOptions: {
            show: {
              operation: ["get"]
            }
          },
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Dot Notation",
              name: "dotNotation",
              type: "boolean",
              default: true,
              // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
              description: '<p>By default, dot-notation is used in property names. This means that "a.b" will set the property "b" underneath "a" so { "a": { "b": value} }.<p></p>If that is not intended this can be deactivated, it will then set { "a.b": value } instead.</p>.'
            }
          ]
        },
        // ----------------------------------
        //         incr
        // ----------------------------------
        {
          displayName: "Key",
          name: "key",
          type: "string",
          displayOptions: {
            show: {
              operation: ["incr"]
            }
          },
          default: "",
          required: true,
          description: "Name of the key to increment"
        },
        {
          displayName: "Expire",
          name: "expire",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["incr"]
            }
          },
          default: false,
          description: "Whether to set a timeout on key"
        },
        {
          displayName: "TTL",
          name: "ttl",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          displayOptions: {
            show: {
              operation: ["incr"],
              expire: [true]
            }
          },
          default: 60,
          description: "Number of seconds before key expiration"
        },
        // ----------------------------------
        //         keys
        // ----------------------------------
        {
          displayName: "Key Pattern",
          name: "keyPattern",
          type: "string",
          displayOptions: {
            show: {
              operation: ["keys"]
            }
          },
          default: "",
          required: true,
          description: "The key pattern for the keys to return"
        },
        {
          displayName: "Get Values",
          name: "getValues",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["keys"]
            }
          },
          default: true,
          description: "Whether to get the value of matching keys"
        },
        // ----------------------------------
        //         set
        // ----------------------------------
        {
          displayName: "Key",
          name: "key",
          type: "string",
          displayOptions: {
            show: {
              operation: ["set"]
            }
          },
          default: "",
          required: true,
          description: "Name of the key to set in Redis"
        },
        {
          displayName: "Value",
          name: "value",
          type: "string",
          displayOptions: {
            show: {
              operation: ["set"]
            }
          },
          default: "",
          description: "The value to write in Redis"
        },
        {
          displayName: "Key Type",
          name: "keyType",
          type: "options",
          displayOptions: {
            show: {
              operation: ["set"]
            }
          },
          options: [
            {
              name: "Automatic",
              value: "automatic",
              description: "Tries to figure out the type automatically depending on the data"
            },
            {
              name: "Hash",
              value: "hash",
              description: "Data in key is of type 'hash'"
            },
            {
              name: "List",
              value: "list",
              description: "Data in key is of type 'lists'"
            },
            {
              name: "Sets",
              value: "sets",
              description: "Data in key is of type 'sets'"
            },
            {
              name: "String",
              value: "string",
              description: "Data in key is of type 'string'"
            }
          ],
          default: "automatic",
          description: "The type of the key to set"
        },
        {
          displayName: "Value Is JSON",
          name: "valueIsJSON",
          type: "boolean",
          displayOptions: {
            show: {
              keyType: ["hash"]
            }
          },
          default: true,
          description: "Whether the value is JSON or key value pairs"
        },
        {
          displayName: "Expire",
          name: "expire",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["set"]
            }
          },
          default: false,
          description: "Whether to set a timeout on key"
        },
        {
          displayName: "TTL",
          name: "ttl",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          displayOptions: {
            show: {
              operation: ["set"],
              expire: [true]
            }
          },
          default: 60,
          description: "Number of seconds before key expiration"
        },
        // ----------------------------------
        //         publish
        // ----------------------------------
        {
          displayName: "Channel",
          name: "channel",
          type: "string",
          displayOptions: {
            show: {
              operation: ["publish"]
            }
          },
          default: "",
          required: true,
          description: "Channel name"
        },
        {
          displayName: "Data",
          name: "messageData",
          type: "string",
          displayOptions: {
            show: {
              operation: ["publish"]
            }
          },
          default: "",
          required: true,
          description: "Data to publish"
        },
        // ----------------------------------
        //         push/pop
        // ----------------------------------
        {
          displayName: "List",
          name: "list",
          type: "string",
          displayOptions: {
            show: {
              operation: ["push", "pop"]
            }
          },
          default: "",
          required: true,
          description: "Name of the list in Redis"
        },
        {
          displayName: "Data",
          name: "messageData",
          type: "string",
          displayOptions: {
            show: {
              operation: ["push"]
            }
          },
          default: "",
          required: true,
          description: "Data to push"
        },
        {
          displayName: "Tail",
          name: "tail",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["push", "pop"]
            }
          },
          default: false,
          description: "Whether to push or pop data from the end of the list"
        },
        {
          displayName: "Name",
          name: "propertyName",
          type: "string",
          displayOptions: {
            show: {
              operation: ["pop"]
            }
          },
          default: "propertyName",
          description: 'Optional name of the property to write received data to. Supports dot-notation. Example: "data.person[0].name".'
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          displayOptions: {
            show: {
              operation: ["pop"]
            }
          },
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Dot Notation",
              name: "dotNotation",
              type: "boolean",
              default: true,
              // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
              description: '<p>By default, dot-notation is used in property names. This means that "a.b" will set the property "b" underneath "a" so { "a": { "b": value} }.<p></p>If that is not intended this can be deactivated, it will then set { "a.b": value } instead.</p>.'
            }
          ]
        }
      ]
    };
    this.methods = {
      credentialTest: { redisConnectionTest: import_utils.redisConnectionTest }
    };
  }
  async execute() {
    const credentials = await this.getCredentials("redis");
    const client = (0, import_utils.setupRedisClient)(credentials);
    await client.connect();
    await client.ping();
    const operation = this.getNodeParameter("operation", 0);
    const returnItems = [];
    if (operation === "info") {
      try {
        const result = await client.info();
        returnItems.push({ json: (0, import_utils.convertInfoToObject)(result) });
      } catch (error) {
        if (this.continueOnFail()) {
          returnItems.push({
            json: {
              error: error.message
            }
          });
        } else {
          await client.quit();
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), error);
        }
      }
    } else if (["delete", "get", "keys", "set", "incr", "publish", "push", "pop"].includes(operation)) {
      const items = this.getInputData();
      let item;
      for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        try {
          item = { json: {}, pairedItem: { item: itemIndex } };
          if (operation === "delete") {
            const keyDelete = this.getNodeParameter("key", itemIndex);
            await client.del(keyDelete);
            returnItems.push(items[itemIndex]);
          } else if (operation === "get") {
            const propertyName = this.getNodeParameter("propertyName", itemIndex);
            const keyGet = this.getNodeParameter("key", itemIndex);
            const keyType = this.getNodeParameter("keyType", itemIndex);
            const value = await (0, import_utils.getValue)(client, keyGet, keyType) ?? null;
            const options = this.getNodeParameter("options", itemIndex, {});
            if (options.dotNotation === false) {
              item.json[propertyName] = value;
            } else {
              (0, import_set.default)(item.json, propertyName, value);
            }
            returnItems.push(item);
          } else if (operation === "keys") {
            const keyPattern = this.getNodeParameter("keyPattern", itemIndex);
            const getValues = this.getNodeParameter("getValues", itemIndex, true);
            const keys = await client.keys(keyPattern);
            if (!getValues) {
              returnItems.push({ json: { keys } });
              continue;
            }
            for (const keyName of keys) {
              item.json[keyName] = await (0, import_utils.getValue)(client, keyName);
            }
            returnItems.push(item);
          } else if (operation === "set") {
            const keySet = this.getNodeParameter("key", itemIndex);
            const value = this.getNodeParameter("value", itemIndex);
            const keyType = this.getNodeParameter("keyType", itemIndex);
            const valueIsJSON = this.getNodeParameter("valueIsJSON", itemIndex, true);
            const expire = this.getNodeParameter("expire", itemIndex, false);
            const ttl = this.getNodeParameter("ttl", itemIndex, -1);
            await import_utils.setValue.call(this, client, keySet, value, expire, ttl, keyType, valueIsJSON);
            returnItems.push(items[itemIndex]);
          } else if (operation === "incr") {
            const keyIncr = this.getNodeParameter("key", itemIndex);
            const expire = this.getNodeParameter("expire", itemIndex, false);
            const ttl = this.getNodeParameter("ttl", itemIndex, -1);
            const incrementVal = await client.incr(keyIncr);
            if (expire && ttl > 0) {
              await client.expire(keyIncr, ttl);
            }
            returnItems.push({ json: { [keyIncr]: incrementVal } });
          } else if (operation === "publish") {
            const channel = this.getNodeParameter("channel", itemIndex);
            const messageData = this.getNodeParameter("messageData", itemIndex);
            await client.publish(channel, messageData);
            returnItems.push(items[itemIndex]);
          } else if (operation === "push") {
            const redisList = this.getNodeParameter("list", itemIndex);
            const messageData = this.getNodeParameter("messageData", itemIndex);
            const tail = this.getNodeParameter("tail", itemIndex, false);
            await client[tail ? "rPush" : "lPush"](redisList, messageData);
            returnItems.push(items[itemIndex]);
          } else if (operation === "pop") {
            const redisList = this.getNodeParameter("list", itemIndex);
            const tail = this.getNodeParameter("tail", itemIndex, false);
            const propertyName = this.getNodeParameter(
              "propertyName",
              itemIndex,
              "propertyName"
            );
            const value = await client[tail ? "rPop" : "lPop"](redisList);
            let outputValue;
            try {
              outputValue = value && JSON.parse(value);
            } catch {
              outputValue = value;
            }
            const options = this.getNodeParameter("options", itemIndex, {});
            if (options.dotNotation === false) {
              item.json[propertyName] = outputValue;
            } else {
              (0, import_set.default)(item.json, propertyName, outputValue);
            }
            returnItems.push(item);
          }
        } catch (error) {
          if (this.continueOnFail()) {
            returnItems.push({
              json: {
                error: error.message
              },
              pairedItem: {
                item: itemIndex
              }
            });
            continue;
          }
          await client.quit();
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, { itemIndex });
        }
      }
    }
    await client.quit();
    return [returnItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Redis
});
//# sourceMappingURL=Redis.node.js.map