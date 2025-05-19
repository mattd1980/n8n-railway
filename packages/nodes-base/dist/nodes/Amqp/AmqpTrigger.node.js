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
var AmqpTrigger_node_exports = {};
__export(AmqpTrigger_node_exports, {
  AmqpTrigger: () => AmqpTrigger
});
module.exports = __toCommonJS(AmqpTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_rhea = require("rhea");
class AmqpTrigger {
  constructor() {
    this.description = {
      displayName: "AMQP Trigger",
      name: "amqpTrigger",
      icon: "file:amqp.svg",
      group: ["trigger"],
      version: 1,
      description: "Listens to AMQP 1.0 Messages",
      defaults: {
        name: "AMQP Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "amqp",
          required: true
        }
      ],
      properties: [
        // Node properties which the user gets displayed and
        // can change on the node.
        {
          displayName: "Queue / Topic",
          name: "sink",
          type: "string",
          default: "",
          placeholder: "topic://sourcename.something",
          description: "Name of the queue of topic to listen to"
        },
        {
          displayName: "Clientname",
          name: "clientname",
          type: "string",
          default: "",
          placeholder: "e.g. n8n",
          description: "Leave empty for non-durable topic subscriptions or queues",
          hint: "for durable/persistent topic subscriptions"
        },
        {
          displayName: "Subscription",
          name: "subscription",
          type: "string",
          default: "",
          placeholder: "e.g. order-worker",
          description: "Leave empty for non-durable topic subscriptions or queues",
          hint: "for durable/persistent topic subscriptions"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Container ID",
              name: "containerId",
              type: "string",
              default: "",
              description: "Will be used to pass to the RHEA Backend as container_id"
            },
            {
              displayName: "Convert Body To String",
              name: "jsonConvertByteArrayToString",
              type: "boolean",
              default: false,
              description: 'Whether to convert JSON Body content (["body"]["content"]) from Byte Array to string. Needed for Azure Service Bus.'
            },
            {
              displayName: "JSON Parse Body",
              name: "jsonParseBody",
              type: "boolean",
              default: false,
              description: "Whether to parse the body to an object"
            },
            {
              displayName: "Messages per Cicle",
              name: "pullMessagesNumber",
              type: "number",
              default: 100,
              description: "Number of messages to pull from the bus for every cicle"
            },
            {
              displayName: "Only Body",
              name: "onlyBody",
              type: "boolean",
              default: false,
              description: "Whether to return only the body property"
            },
            {
              displayName: "Parallel Processing",
              name: "parallelProcessing",
              type: "boolean",
              default: true,
              description: "Whether to process messages in parallel"
            },
            {
              displayName: "Reconnect",
              name: "reconnect",
              type: "boolean",
              default: true,
              description: "Whether to automatically reconnect if disconnected"
            },
            {
              displayName: "Reconnect Limit",
              name: "reconnectLimit",
              type: "number",
              default: 50,
              description: "Maximum number of reconnect attempts"
            },
            {
              displayName: "Sleep Time",
              name: "sleepTime",
              type: "number",
              default: 10,
              description: "Milliseconds to sleep after every cicle"
            }
          ]
        }
      ]
    };
  }
  async trigger() {
    const credentials = await this.getCredentials("amqp");
    const sink = this.getNodeParameter("sink", "");
    const clientname = this.getNodeParameter("clientname", "");
    const subscription = this.getNodeParameter("subscription", "");
    const options = this.getNodeParameter("options", {});
    const parallelProcessing = this.getNodeParameter("options.parallelProcessing", true);
    const pullMessagesNumber = options.pullMessagesNumber || 100;
    const containerId = options.containerId;
    const containerReconnect = options.reconnect || true;
    const containerReconnectLimit = options.reconnectLimit || 50;
    if (sink === "") {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Queue or Topic required!");
    }
    let durable = false;
    if (subscription && clientname) {
      durable = true;
    }
    const container = (0, import_rhea.create_container)();
    let lastMsgId = void 0;
    container.on("receiver_open", (context) => {
      context.receiver?.add_credit(pullMessagesNumber);
    });
    container.on("message", async (context) => {
      if (!context.message) {
        return;
      }
      if (context.message.message_id && context.message.message_id === lastMsgId) {
        return;
      }
      lastMsgId = context.message.message_id;
      let data = context.message;
      if (options.jsonConvertByteArrayToString === true && data.body.content !== void 0) {
        const cont = (0, import_n8n_workflow.deepCopy)(data.body.content);
        data.body = String.fromCharCode.apply(null, cont.data);
      }
      if (options.jsonConvertByteArrayToString === true && data.body.content !== void 0) {
        const cont = (0, import_n8n_workflow.deepCopy)(data.body.content);
        data.body = String.fromCharCode.apply(null, cont.data);
      }
      if (options.jsonConvertByteArrayToString === true && data.body.content !== void 0) {
        const content = (0, import_n8n_workflow.deepCopy)(data.body.content);
        data.body = String.fromCharCode.apply(null, content.data);
      }
      if (options.jsonParseBody === true) {
        data.body = (0, import_n8n_workflow.jsonParse)(data.body);
      }
      if (options.onlyBody === true) {
        data = data.body;
      }
      let responsePromise = void 0;
      if (!parallelProcessing) {
        responsePromise = this.helpers.createDeferredPromise();
      }
      if (responsePromise) {
        this.emit([this.helpers.returnJsonArray([data])], void 0, responsePromise);
        await responsePromise.promise;
      } else {
        this.emit([this.helpers.returnJsonArray([data])]);
      }
      if (!context.receiver?.has_credit()) {
        setTimeout(
          () => {
            context.receiver?.add_credit(pullMessagesNumber);
          },
          options.sleepTime || 10
        );
      }
    });
    const connectOptions = {
      host: credentials.hostname,
      hostname: credentials.hostname,
      port: credentials.port,
      reconnect: containerReconnect,
      reconnect_limit: containerReconnectLimit,
      username: credentials.username ? credentials.username : void 0,
      password: credentials.password ? credentials.password : void 0,
      transport: credentials.transportType ? credentials.transportType : void 0,
      container_id: containerId ? containerId : void 0,
      id: containerId ? containerId : void 0
    };
    const connection = container.connect(connectOptions);
    const clientOptions = {
      name: subscription ? subscription : void 0,
      source: {
        address: sink,
        durable: durable ? 2 : void 0,
        expiry_policy: durable ? "never" : void 0
      },
      credit_window: 0
      // prefetch 1
    };
    connection.open_receiver(clientOptions);
    async function closeFunction() {
      container.removeAllListeners("receiver_open");
      container.removeAllListeners("message");
      connection.close();
    }
    const manualTriggerFunction = async () => {
      await new Promise((resolve, reject) => {
        const timeoutHandler = setTimeout(() => {
          container.removeAllListeners("receiver_open");
          container.removeAllListeners("message");
          connection.close();
          reject(
            new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "Aborted because no message received within 15 seconds",
              {
                description: 'This 15sec timeout is only set for "manually triggered execution". Active Workflows will listen indefinitely.'
              }
            )
          );
        }, 15e3);
        container.on("message", (context) => {
          const message = context.message;
          if (Object.keys(message)[0] === "body" && Object.keys(message).length === 1) {
            this.emit([this.helpers.returnJsonArray([message.body])]);
          } else {
            this.emit([this.helpers.returnJsonArray([message])]);
          }
          clearTimeout(timeoutHandler);
          resolve(true);
        });
      });
    };
    return {
      closeFunction,
      manualTriggerFunction
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AmqpTrigger
});
//# sourceMappingURL=AmqpTrigger.node.js.map