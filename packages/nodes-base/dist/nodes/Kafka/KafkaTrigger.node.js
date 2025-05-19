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
var KafkaTrigger_node_exports = {};
__export(KafkaTrigger_node_exports, {
  KafkaTrigger: () => KafkaTrigger
});
module.exports = __toCommonJS(KafkaTrigger_node_exports);
var import_confluent_schema_registry = require("@kafkajs/confluent-schema-registry");
var import_kafkajs = require("kafkajs");
var import_n8n_workflow = require("n8n-workflow");
class KafkaTrigger {
  constructor() {
    this.description = {
      displayName: "Kafka Trigger",
      name: "kafkaTrigger",
      icon: { light: "file:kafka.svg", dark: "file:kafka.dark.svg" },
      group: ["trigger"],
      version: [1, 1.1],
      description: "Consume messages from a Kafka topic",
      defaults: {
        name: "Kafka Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "kafka",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Topic",
          name: "topic",
          type: "string",
          default: "",
          required: true,
          placeholder: "topic-name",
          description: "Name of the queue of topic to consume from"
        },
        {
          displayName: "Group ID",
          name: "groupId",
          type: "string",
          default: "",
          required: true,
          placeholder: "n8n-kafka",
          description: "ID of the consumer group"
        },
        {
          displayName: "Use Schema Registry",
          name: "useSchemaRegistry",
          type: "boolean",
          default: false,
          description: "Whether to use Confluent Schema Registry"
        },
        {
          displayName: "Schema Registry URL",
          name: "schemaRegistryUrl",
          type: "string",
          required: true,
          displayOptions: {
            show: {
              useSchemaRegistry: [true]
            }
          },
          placeholder: "https://schema-registry-domain:8081",
          default: "",
          description: "URL of the schema registry"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          default: {},
          placeholder: "Add option",
          options: [
            {
              displayName: "Allow Topic Creation",
              name: "allowAutoTopicCreation",
              type: "boolean",
              default: false,
              description: "Whether to allow sending message to a previously non exisiting topic"
            },
            {
              displayName: "Auto Commit Threshold",
              name: "autoCommitThreshold",
              type: "number",
              default: 0,
              description: "The consumer will commit offsets after resolving a given number of messages"
            },
            {
              displayName: "Auto Commit Interval",
              name: "autoCommitInterval",
              type: "number",
              default: 0,
              description: "The consumer will commit offsets after a given period, for example, five seconds",
              hint: "Value in milliseconds"
            },
            {
              displayName: "Heartbeat Interval",
              name: "heartbeatInterval",
              type: "number",
              default: 3e3,
              description: "Heartbeats are used to ensure that the consumer's session stays active",
              hint: "The value must be set lower than Session Timeout"
            },
            {
              displayName: "Max Number of Requests",
              name: "maxInFlightRequests",
              type: "number",
              default: 1,
              description: "The maximum number of unacknowledged requests the client will send on a single connection"
            },
            {
              displayName: "Read Messages From Beginning",
              name: "fromBeginning",
              type: "boolean",
              default: true,
              description: "Whether to read message from beginning"
            },
            {
              displayName: "JSON Parse Message",
              name: "jsonParseMessage",
              type: "boolean",
              default: false,
              description: "Whether to try to parse the message to an object"
            },
            {
              displayName: "Parallel Processing",
              name: "parallelProcessing",
              type: "boolean",
              default: true,
              displayOptions: {
                hide: {
                  "@version": [1]
                }
              },
              description: "Whether to process messages in parallel or by keeping the message in order"
            },
            {
              displayName: "Only Message",
              name: "onlyMessage",
              type: "boolean",
              displayOptions: {
                show: {
                  jsonParseMessage: [true]
                }
              },
              default: false,
              description: "Whether to return only the message property"
            },
            {
              displayName: "Return Headers",
              name: "returnHeaders",
              type: "boolean",
              default: false,
              description: "Whether to return the headers received from Kafka"
            },
            {
              displayName: "Session Timeout",
              name: "sessionTimeout",
              type: "number",
              default: 3e4,
              description: "The time to await a response in ms",
              hint: "Value in milliseconds"
            }
          ]
        }
      ]
    };
  }
  async trigger() {
    const topic = this.getNodeParameter("topic");
    const groupId = this.getNodeParameter("groupId");
    const credentials = await this.getCredentials("kafka");
    const brokers = (credentials.brokers ?? "").split(",").map((item) => item.trim());
    const clientId = credentials.clientId;
    const ssl = credentials.ssl;
    const options = this.getNodeParameter("options", {});
    options.nodeVersion = this.getNode().typeVersion;
    const config = {
      clientId,
      brokers,
      ssl,
      logLevel: import_kafkajs.logLevel.ERROR
    };
    if (credentials.authentication === true) {
      if (!(credentials.username && credentials.password)) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          "Username and password are required for authentication"
        );
      }
      config.sasl = {
        username: credentials.username,
        password: credentials.password,
        mechanism: credentials.saslMechanism
      };
    }
    const maxInFlightRequests = this.getNodeParameter("options.maxInFlightRequests", null) === 0 ? null : this.getNodeParameter("options.maxInFlightRequests", null);
    const parallelProcessing = options.parallelProcessing;
    const useSchemaRegistry = this.getNodeParameter("useSchemaRegistry", 0);
    const schemaRegistryUrl = this.getNodeParameter("schemaRegistryUrl", 0);
    const kafka = new import_kafkajs.Kafka(config);
    const consumer = kafka.consumer({
      groupId,
      maxInFlightRequests,
      sessionTimeout: this.getNodeParameter("options.sessionTimeout", 3e4),
      heartbeatInterval: this.getNodeParameter("options.heartbeatInterval", 3e3)
    });
    async function closeFunction() {
      await consumer.disconnect();
    }
    const startConsumer = async () => {
      await consumer.connect();
      await consumer.subscribe({ topic, fromBeginning: options.fromBeginning ? true : false });
      await consumer.run({
        autoCommitInterval: options.autoCommitInterval || null,
        autoCommitThreshold: options.autoCommitThreshold || null,
        eachMessage: async ({ topic: messageTopic, message }) => {
          let data = {};
          let value = message.value?.toString();
          if (options.jsonParseMessage) {
            try {
              value = JSON.parse(value);
            } catch (error) {
            }
          }
          if (useSchemaRegistry) {
            try {
              const registry = new import_confluent_schema_registry.SchemaRegistry({ host: schemaRegistryUrl });
              value = await registry.decode(message.value);
            } catch (error) {
            }
          }
          if (options.returnHeaders && message.headers) {
            data.headers = Object.fromEntries(
              Object.entries(message.headers).map(([headerKey, headerValue]) => [
                headerKey,
                headerValue?.toString("utf8") ?? ""
              ])
            );
          }
          data.message = value;
          data.topic = messageTopic;
          if (options.onlyMessage) {
            data = value;
          }
          let responsePromise = void 0;
          if (!parallelProcessing && options.nodeVersion > 1) {
            responsePromise = this.helpers.createDeferredPromise();
            this.emit([this.helpers.returnJsonArray([data])], void 0, responsePromise);
          } else {
            this.emit([this.helpers.returnJsonArray([data])]);
          }
          if (responsePromise) {
            await responsePromise.promise;
          }
        }
      });
    };
    if (this.getMode() !== "manual") {
      await startConsumer();
      return { closeFunction };
    } else {
      async function manualTriggerFunction() {
        await startConsumer();
      }
      return {
        closeFunction,
        manualTriggerFunction
      };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KafkaTrigger
});
//# sourceMappingURL=KafkaTrigger.node.js.map