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
var Mqtt_node_exports = {};
__export(Mqtt_node_exports, {
  Mqtt: () => Mqtt
});
module.exports = __toCommonJS(Mqtt_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Mqtt {
  constructor() {
    this.description = {
      displayName: "MQTT",
      name: "mqtt",
      icon: "file:mqtt.svg",
      group: ["input"],
      version: 1,
      description: "Push messages to MQTT",
      defaults: {
        name: "MQTT"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mqtt",
          required: true,
          testedBy: "mqttConnectionTest"
        }
      ],
      properties: [
        {
          displayName: "Topic",
          name: "topic",
          type: "string",
          required: true,
          default: "",
          description: "The topic to publish to"
        },
        {
          displayName: "Send Input Data",
          name: "sendInputData",
          type: "boolean",
          default: true,
          description: "Whether to send the data the node receives as JSON"
        },
        {
          displayName: "Message",
          name: "message",
          type: "string",
          required: true,
          displayOptions: {
            show: {
              sendInputData: [false]
            }
          },
          default: "",
          description: "The message to publish"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "QoS",
              name: "qos",
              type: "options",
              options: [
                {
                  name: "Received at Most Once",
                  value: 0
                },
                {
                  name: "Received at Least Once",
                  value: 1
                },
                {
                  name: "Exactly Once",
                  value: 2
                }
              ],
              default: 0,
              description: "QoS subscription level"
            },
            {
              displayName: "Retain",
              name: "retain",
              type: "boolean",
              default: false,
              // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
              description: "Normally if a publisher publishes a message to a topic, and no one is subscribed to that topic the message is simply discarded by the broker. However the publisher can tell the broker to keep the last message on that topic by setting the retain flag to true."
            }
          ]
        }
      ]
    };
    this.methods = {
      credentialTest: {
        async mqttConnectionTest(credential) {
          const credentials = credential.data;
          try {
            const client = await (0, import_GenericFunctions.createClient)(credentials);
            client.end();
          } catch (e) {
            const error = (0, import_n8n_workflow.ensureError)(e);
            return {
              status: "Error",
              message: error.message
            };
          }
          return {
            status: "OK",
            message: "Connection successful!"
          };
        }
      }
    };
  }
  async execute() {
    const credentials = await this.getCredentials("mqtt");
    const client = await (0, import_GenericFunctions.createClient)(credentials);
    const publishPromises = [];
    const items = this.getInputData();
    for (let i = 0; i < items.length; i++) {
      const topic = this.getNodeParameter("topic", i);
      const options = this.getNodeParameter("options", i);
      const sendInputData = this.getNodeParameter("sendInputData", i);
      const message = sendInputData ? JSON.stringify(items[i].json) : this.getNodeParameter("message", i);
      publishPromises.push(client.publishAsync(topic, message, options));
    }
    await Promise.all(publishPromises);
    await client.endAsync();
    return [items];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Mqtt
});
//# sourceMappingURL=Mqtt.node.js.map