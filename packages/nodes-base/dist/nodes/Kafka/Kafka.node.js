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
var Kafka_node_exports = {};
__export(Kafka_node_exports, {
  Kafka: () => Kafka
});
module.exports = __toCommonJS(Kafka_node_exports);
var import_confluent_schema_registry = require("@kafkajs/confluent-schema-registry");
var import_kafkajs = require("kafkajs");
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../utils/utilities");
class Kafka {
  constructor() {
    this.description = {
      displayName: "Kafka",
      name: "kafka",
      icon: { light: "file:kafka.svg", dark: "file:kafka.dark.svg" },
      group: ["transform"],
      version: 1,
      description: "Sends messages to a Kafka topic",
      defaults: {
        name: "Kafka"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "kafka",
          required: true,
          testedBy: "kafkaConnectionTest"
        }
      ],
      properties: [
        {
          displayName: "Topic",
          name: "topic",
          type: "string",
          default: "",
          placeholder: "topic-name",
          description: "Name of the queue of topic to publish to"
        },
        {
          displayName: "Send Input Data",
          name: "sendInputData",
          type: "boolean",
          default: true,
          description: "Whether to send the data the node receives as JSON to Kafka"
        },
        {
          displayName: "Message",
          name: "message",
          type: "string",
          displayOptions: {
            show: {
              sendInputData: [false]
            }
          },
          default: "",
          description: "The message to be sent"
        },
        {
          displayName: "JSON Parameters",
          name: "jsonParameters",
          type: "boolean",
          default: false
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
          displayName: "Use Key",
          name: "useKey",
          type: "boolean",
          default: false,
          description: "Whether to use a message key"
        },
        {
          displayName: "Key",
          name: "key",
          type: "string",
          required: true,
          displayOptions: {
            show: {
              useKey: [true]
            }
          },
          placeholder: "",
          default: "",
          description: "The message key"
        },
        {
          displayName: "Event Name",
          name: "eventName",
          type: "string",
          required: true,
          displayOptions: {
            show: {
              useSchemaRegistry: [true]
            }
          },
          default: "",
          description: "Namespace and Name of Schema in Schema Registry (namespace.name)"
        },
        {
          displayName: "Headers",
          name: "headersUi",
          placeholder: "Add Header",
          type: "fixedCollection",
          displayOptions: {
            show: {
              jsonParameters: [false]
            }
          },
          typeOptions: {
            multipleValues: true
          },
          default: {},
          options: [
            {
              name: "headerValues",
              displayName: "Header",
              values: [
                {
                  displayName: "Key",
                  name: "key",
                  type: "string",
                  default: ""
                },
                {
                  displayName: "Value",
                  name: "value",
                  type: "string",
                  default: ""
                }
              ]
            }
          ]
        },
        {
          displayName: "Headers (JSON)",
          name: "headerParametersJson",
          type: "json",
          displayOptions: {
            show: {
              jsonParameters: [true]
            }
          },
          default: "",
          description: "Header parameters as JSON (flat object)"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          default: {},
          placeholder: "Add option",
          options: [
            {
              displayName: "Acks",
              name: "acks",
              type: "boolean",
              default: false,
              description: "Whether or not producer must wait for acknowledgement from all replicas"
            },
            {
              displayName: "Compression",
              name: "compression",
              type: "boolean",
              default: false,
              description: "Whether to send the data in a compressed format using the GZIP codec"
            },
            {
              displayName: "Timeout",
              name: "timeout",
              type: "number",
              default: 3e4,
              description: "The time to await a response in ms"
            }
          ]
        }
      ]
    };
    this.methods = {
      credentialTest: {
        async kafkaConnectionTest(credential) {
          const credentials = credential.data;
          try {
            const brokers = (credentials.brokers || "").split(",").map((item) => item.trim());
            const clientId = credentials.clientId;
            const ssl = credentials.ssl;
            const config = {
              clientId,
              brokers,
              ssl
            };
            if (credentials.authentication === true) {
              if (!(credentials.username && credentials.password)) {
                throw new import_n8n_workflow.ApplicationError("Username and password are required for authentication", {
                  level: "warning"
                });
              }
              config.sasl = {
                username: credentials.username,
                password: credentials.password,
                mechanism: credentials.saslMechanism
              };
            }
            const kafka = new import_kafkajs.Kafka(config);
            await kafka.admin().connect();
            await kafka.admin().disconnect();
            return {
              status: "OK",
              message: "Authentication successful"
            };
          } catch (error) {
            return {
              status: "Error",
              message: error.message
            };
          }
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const itemData = (0, import_utilities.generatePairedItemData)(items.length);
    const length = items.length;
    const topicMessages = [];
    let responseData;
    try {
      const options = this.getNodeParameter("options", 0);
      const sendInputData = this.getNodeParameter("sendInputData", 0);
      const useSchemaRegistry = this.getNodeParameter("useSchemaRegistry", 0);
      const timeout = options.timeout;
      let compression = import_kafkajs.CompressionTypes.None;
      const acks = options.acks === true ? 1 : 0;
      if (options.compression === true) {
        compression = import_kafkajs.CompressionTypes.GZIP;
      }
      const credentials = await this.getCredentials("kafka");
      const brokers = (credentials.brokers || "").split(",").map((item) => item.trim());
      const clientId = credentials.clientId;
      const ssl = credentials.ssl;
      const config = {
        clientId,
        brokers,
        ssl
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
      const kafka = new import_kafkajs.Kafka(config);
      const producer = kafka.producer();
      await producer.connect();
      let message;
      for (let i = 0; i < length; i++) {
        if (sendInputData) {
          message = JSON.stringify(items[i].json);
        } else {
          message = this.getNodeParameter("message", i);
        }
        if (useSchemaRegistry) {
          try {
            const schemaRegistryUrl = this.getNodeParameter("schemaRegistryUrl", 0);
            const eventName = this.getNodeParameter("eventName", 0);
            const registry = new import_confluent_schema_registry.SchemaRegistry({ host: schemaRegistryUrl });
            const id = await registry.getLatestSchemaId(eventName);
            message = await registry.encode(id, JSON.parse(message));
          } catch (exception) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "Verify your Schema Registry configuration"
            );
          }
        }
        const topic = this.getNodeParameter("topic", i);
        const jsonParameters = this.getNodeParameter("jsonParameters", i);
        const useKey = this.getNodeParameter("useKey", i);
        const key = useKey ? this.getNodeParameter("key", i) : null;
        let headers;
        if (jsonParameters) {
          headers = this.getNodeParameter("headerParametersJson", i);
          try {
            headers = JSON.parse(headers);
          } catch (exception) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Headers must be a valid json");
          }
        } else {
          const values = this.getNodeParameter("headersUi", i).headerValues;
          headers = {};
          if (values !== void 0) {
            for (const value of values) {
              headers[value.key] = value.value;
            }
          }
        }
        topicMessages.push({
          topic,
          messages: [
            {
              value: message,
              headers,
              key
            }
          ]
        });
      }
      responseData = await producer.sendBatch({
        topicMessages,
        timeout,
        compression,
        acks
      });
      if (responseData.length === 0) {
        responseData.push({
          success: true
        });
      }
      await producer.disconnect();
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData }
      );
      return [executionData];
    } catch (error) {
      if (this.continueOnFail()) {
        return [[{ json: { error: error.message }, pairedItem: itemData }]];
      } else {
        throw error;
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Kafka
});
//# sourceMappingURL=Kafka.node.js.map