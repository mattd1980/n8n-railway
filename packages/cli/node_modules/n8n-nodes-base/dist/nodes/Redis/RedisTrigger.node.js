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
var RedisTrigger_node_exports = {};
__export(RedisTrigger_node_exports, {
  RedisTrigger: () => RedisTrigger
});
module.exports = __toCommonJS(RedisTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("./utils");
class RedisTrigger {
  constructor() {
    this.description = {
      displayName: "Redis Trigger",
      name: "redisTrigger",
      icon: "file:redis.svg",
      group: ["trigger"],
      version: 1,
      description: "Subscribe to redis channel",
      defaults: {
        name: "Redis Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "redis",
          required: true,
          testedBy: "redisConnectionTest"
        }
      ],
      properties: [
        {
          displayName: "Channels",
          name: "channels",
          type: "string",
          default: "",
          required: true,
          description: "Channels to subscribe to, multiple channels be defined with comma. Wildcard character(*) is supported."
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "JSON Parse Body",
              name: "jsonParseBody",
              type: "boolean",
              default: false,
              description: "Whether to try to parse the message to an object"
            },
            {
              displayName: "Only Message",
              name: "onlyMessage",
              type: "boolean",
              default: false,
              description: "Whether to return only the message property"
            }
          ]
        }
      ]
    };
    this.methods = {
      credentialTest: { redisConnectionTest: import_utils.redisConnectionTest }
    };
  }
  async trigger() {
    const credentials = await this.getCredentials("redis");
    const channels = this.getNodeParameter("channels").split(",");
    const options = this.getNodeParameter("options");
    if (!channels) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Channels are mandatory!");
    }
    const client = (0, import_utils.setupRedisClient)(credentials);
    await client.connect();
    await client.ping();
    const onMessage = (message, channel) => {
      if (options.jsonParseBody) {
        try {
          message = JSON.parse(message);
        } catch (error) {
        }
      }
      const data = options.onlyMessage ? { message } : { channel, message };
      this.emit([this.helpers.returnJsonArray(data)]);
    };
    const manualTriggerFunction = async () => await new Promise(async (resolve) => {
      await client.pSubscribe(channels, (message, channel) => {
        onMessage(message, channel);
        resolve();
      });
    });
    if (this.getMode() === "trigger") {
      await client.pSubscribe(channels, onMessage);
    }
    async function closeFunction() {
      await client.pUnsubscribe();
      await client.quit();
    }
    return {
      closeFunction,
      manualTriggerFunction
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisTrigger
});
//# sourceMappingURL=RedisTrigger.node.js.map