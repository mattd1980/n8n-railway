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
var MqttTrigger_node_exports = {};
__export(MqttTrigger_node_exports, {
  MqttTrigger: () => MqttTrigger
});
module.exports = __toCommonJS(MqttTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class MqttTrigger {
  constructor() {
    this.description = {
      displayName: "MQTT Trigger",
      name: "mqttTrigger",
      icon: "file:mqtt.svg",
      group: ["trigger"],
      version: 1,
      description: "Listens to MQTT events",
      eventTriggerDescription: "",
      defaults: {
        name: "MQTT Trigger"
      },
      triggerPanel: {
        header: "",
        executionsHelp: {
          inactive: "<b>While building your workflow</b>, click the 'execute step' button, then trigger an MQTT event. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Once you're happy with your workflow</b>, <a data-key='activate'>activate</a> it. Then every time a change is detected, the workflow will execute. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor.",
          active: "<b>While building your workflow</b>, click the 'execute step' button, then trigger an MQTT event. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Your workflow will also execute automatically</b>, since it's activated. Every time a change is detected, this node will trigger an execution. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor."
        },
        activationHint: "Once you\u2019ve finished building your workflow, <a data-key='activate'>activate</a> it to have it also listen continuously (you just won\u2019t see those executions here)."
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mqtt",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Topics",
          name: "topics",
          type: "string",
          default: "",
          description: "Topics to subscribe to, multiple can be defined with comma. Wildcard characters are supported (+ - for single level and # - for multi level). By default all subscription used QoS=0. To set a different QoS, write the QoS desired after the topic preceded by a colom. For Example: topicA:1,topicB:2"
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
              description: "Whether to try parse the message to an object"
            },
            {
              displayName: "Only Message",
              name: "onlyMessage",
              type: "boolean",
              default: false,
              description: "Whether to return only the message property"
            },
            {
              displayName: "Parallel Processing",
              name: "parallelProcessing",
              type: "boolean",
              default: true,
              description: "Whether to process messages in parallel or by keeping the message in order"
            }
          ]
        }
      ]
    };
  }
  async trigger() {
    const topics = this.getNodeParameter("topics").split(",");
    if (!topics?.length) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Topics are mandatory!");
    }
    const topicsQoS = {};
    for (const data of topics) {
      const [topic, qosString] = data.split(":");
      let qos = qosString ? parseInt(qosString, 10) : 0;
      if (qos < 0 || qos > 2) qos = 0;
      topicsQoS[topic] = { qos };
    }
    const options = this.getNodeParameter("options");
    const credentials = await this.getCredentials("mqtt");
    const client = await (0, import_GenericFunctions.createClient)(credentials);
    const parsePayload = (topic, payload) => {
      let message = payload.toString();
      if (options.jsonParseBody) {
        try {
          message = JSON.parse(message);
        } catch (e) {
        }
      }
      let result = { message, topic };
      if (options.onlyMessage) {
        result = [message];
      }
      return [this.helpers.returnJsonArray([result])];
    };
    const manualTriggerFunction = async () => await new Promise(async (resolve) => {
      client.once("message", (topic, payload) => {
        this.emit(parsePayload(topic, payload));
        resolve();
      });
      await client.subscribeAsync(topicsQoS);
    });
    if (this.getMode() === "trigger") {
      const donePromise = !options.parallelProcessing ? this.helpers.createDeferredPromise() : void 0;
      client.on("message", async (topic, payload) => {
        this.emit(parsePayload(topic, payload), void 0, donePromise);
        await donePromise?.promise;
      });
      await client.subscribeAsync(topicsQoS);
    }
    async function closeFunction() {
      await client.endAsync();
    }
    return {
      closeFunction,
      manualTriggerFunction
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MqttTrigger
});
//# sourceMappingURL=MqttTrigger.node.js.map