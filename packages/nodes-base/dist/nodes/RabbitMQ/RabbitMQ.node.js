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
var RabbitMQ_node_exports = {};
__export(RabbitMQ_node_exports, {
  RabbitMQ: () => RabbitMQ
});
module.exports = __toCommonJS(RabbitMQ_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class RabbitMQ {
  constructor() {
    this.description = {
      displayName: "RabbitMQ",
      name: "rabbitmq",
      icon: "file:rabbitmq.svg",
      group: ["transform"],
      version: [1, 1.1],
      description: "Sends messages to a RabbitMQ topic",
      defaults: {
        name: "RabbitMQ"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "rabbitmq",
          required: true,
          testedBy: "rabbitmqConnectionTest"
        }
      ],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "hidden",
          noDataExpression: true,
          default: "sendMessage",
          displayOptions: {
            show: {
              "@version": [1]
            }
          },
          // To remove when action view is fixed
          options: [
            {
              name: "Send a Message to RabbitMQ",
              value: "sendMessage",
              action: "Send a Message to RabbitMQ"
            },
            {
              name: "Delete From Queue",
              value: "deleteMessage",
              action: "Delete From Queue"
            }
          ]
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          default: "sendMessage",
          displayOptions: {
            show: {
              "@version": [1.1]
            }
          },
          options: [
            {
              name: "Send a Message to RabbitMQ",
              value: "sendMessage",
              action: "Send a Message to RabbitMQ"
            },
            {
              name: "Delete From Queue",
              value: "deleteMessage",
              action: "Delete From Queue"
            }
          ]
        },
        {
          displayName: "Will delete an item from the queue triggered earlier in the workflow by a RabbitMQ Trigger node",
          name: "deleteMessage",
          type: "notice",
          default: "",
          displayOptions: {
            show: {
              operation: ["deleteMessage"]
            }
          }
        },
        {
          displayName: "Mode",
          name: "mode",
          type: "options",
          displayOptions: {
            hide: {
              operation: ["deleteMessage"]
            }
          },
          options: [
            {
              name: "Queue",
              value: "queue",
              description: "Publish data to queue"
            },
            {
              name: "Exchange",
              value: "exchange",
              description: "Publish data to exchange"
            }
          ],
          default: "queue",
          description: "To where data should be moved"
        },
        // ----------------------------------
        //         Queue
        // ----------------------------------
        {
          displayName: "Queue / Topic",
          name: "queue",
          type: "string",
          displayOptions: {
            show: {
              mode: ["queue"]
            },
            hide: {
              operation: ["deleteMessage"]
            }
          },
          default: "",
          placeholder: "queue-name",
          description: "Name of the queue to publish to"
        },
        // ----------------------------------
        //         Exchange
        // ----------------------------------
        {
          displayName: "Exchange",
          name: "exchange",
          type: "string",
          displayOptions: {
            show: {
              mode: ["exchange"]
            }
          },
          default: "",
          placeholder: "exchange-name",
          description: "Name of the exchange to publish to"
        },
        {
          displayName: "Type",
          name: "exchangeType",
          type: "options",
          displayOptions: {
            show: {
              mode: ["exchange"]
            }
          },
          options: [
            {
              name: "Direct",
              value: "direct",
              description: "Direct exchange type"
            },
            {
              name: "Topic",
              value: "topic",
              description: "Topic exchange type"
            },
            {
              name: "Headers",
              value: "headers",
              description: "Headers exchange type"
            },
            {
              name: "Fanout",
              value: "fanout",
              description: "Fanout exchange type"
            }
          ],
          default: "fanout",
          description: "Type of exchange"
        },
        {
          displayName: "Routing Key",
          name: "routingKey",
          type: "string",
          displayOptions: {
            show: {
              mode: ["exchange"]
            }
          },
          default: "",
          placeholder: "routing-key",
          description: "The routing key for the message"
        },
        // ----------------------------------
        //         Default
        // ----------------------------------
        {
          displayName: "Send Input Data",
          name: "sendInputData",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["sendMessage"]
            }
          },
          default: true,
          description: "Whether to send the data the node receives as JSON"
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
          displayName: "Options",
          name: "options",
          type: "collection",
          default: {},
          displayOptions: {
            show: {
              operation: ["sendMessage"]
            }
          },
          placeholder: "Add option",
          options: [
            {
              displayName: "Alternate Exchange",
              name: "alternateExchange",
              type: "string",
              displayOptions: {
                show: {
                  "/mode": ["exchange"]
                }
              },
              default: "",
              description: "An exchange to send messages to if this exchange can\u2019t route them to any queues"
            },
            {
              displayName: "Arguments",
              name: "arguments",
              placeholder: "Add Argument",
              description: 'Arguments to add, See <a href="https://amqp-node.github.io/amqplib/channel_api.html#channel_publish" target="_blank">here</a> for valid options',
              type: "fixedCollection",
              typeOptions: {
                multipleValues: true
              },
              default: {},
              options: [
                {
                  name: "argument",
                  displayName: "Argument",
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
              displayName: "Auto Delete Queue",
              name: "autoDelete",
              type: "boolean",
              default: false,
              description: "Whether the queue will be deleted when the number of consumers drops to zero"
            },
            {
              displayName: "Durable",
              name: "durable",
              type: "boolean",
              default: true,
              description: "Whether the queue will survive broker restarts"
            },
            {
              displayName: "Exclusive",
              name: "exclusive",
              type: "boolean",
              displayOptions: {
                show: {
                  "/mode": ["queue"]
                }
              },
              default: false,
              description: "Whether to scope the queue to the connection"
            },
            {
              displayName: "Headers",
              name: "headers",
              placeholder: "Add Header",
              description: "Headers to add",
              type: "fixedCollection",
              typeOptions: {
                multipleValues: true
              },
              default: {},
              options: [
                {
                  name: "header",
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
            }
          ]
        }
      ]
    };
    this.methods = {
      credentialTest: {
        async rabbitmqConnectionTest(credential) {
          try {
            const connection = await (0, import_GenericFunctions.rabbitmqConnect)(credential.data);
            await connection.close();
          } catch (error) {
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
    let channel;
    try {
      const items = this.getInputData();
      const operation = this.getNodeParameter("operation", 0);
      if (operation === "deleteMessage") {
        this.sendResponse(items[0].json);
        return [items];
      }
      const mode = this.getNodeParameter("mode", 0) || "queue";
      const returnItems = [];
      if (mode === "queue") {
        const queue = this.getNodeParameter("queue", 0);
        const options = this.getNodeParameter("options", 0, {});
        channel = await import_GenericFunctions.rabbitmqConnectQueue.call(this, queue, options);
        const sendInputData = this.getNodeParameter("sendInputData", 0);
        let message;
        const queuePromises = [];
        for (let i = 0; i < items.length; i++) {
          if (sendInputData) {
            message = JSON.stringify(items[i].json);
          } else {
            message = this.getNodeParameter("message", i);
          }
          let headers = {};
          if (options.headers && options.headers.header.length) {
            const itemOptions = this.getNodeParameter("options", i, {});
            const additionalHeaders = {};
            itemOptions.headers.header.forEach(
              (header) => {
                additionalHeaders[header.key] = header.value;
              }
            );
            headers = additionalHeaders;
          }
          queuePromises.push(
            channel.sendToQueue(queue, Buffer.from(message), {
              headers,
              ...(0, import_GenericFunctions.parsePublishArguments)(options)
            })
          );
        }
        const promisesResponses = await Promise.allSettled(queuePromises);
        promisesResponses.forEach((response) => {
          if (response.status !== "fulfilled") {
            if (!this.continueOnFail()) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), response);
            } else {
              returnItems.push({
                json: {
                  error: response.reason
                }
              });
              return;
            }
          }
          returnItems.push({
            json: {
              success: response.value
            }
          });
        });
        await channel.close();
        await channel.connection.close();
      } else if (mode === "exchange") {
        const exchange = this.getNodeParameter("exchange", 0);
        const routingKey = this.getNodeParameter("routingKey", 0);
        const options = this.getNodeParameter("options", 0, {});
        channel = await import_GenericFunctions.rabbitmqConnectExchange.call(this, exchange, options);
        const sendInputData = this.getNodeParameter("sendInputData", 0);
        let message;
        const exchangePromises = [];
        for (let i = 0; i < items.length; i++) {
          if (sendInputData) {
            message = JSON.stringify(items[i].json);
          } else {
            message = this.getNodeParameter("message", i);
          }
          let headers = {};
          if (options.headers && options.headers.header.length) {
            const itemOptions = this.getNodeParameter("options", i, {});
            const additionalHeaders = {};
            itemOptions.headers.header.forEach(
              (header) => {
                additionalHeaders[header.key] = header.value;
              }
            );
            headers = additionalHeaders;
          }
          exchangePromises.push(
            channel.publish(exchange, routingKey, Buffer.from(message), {
              headers,
              ...(0, import_GenericFunctions.parsePublishArguments)(options)
            })
          );
        }
        const promisesResponses = await Promise.allSettled(exchangePromises);
        promisesResponses.forEach((response) => {
          if (response.status !== "fulfilled") {
            if (!this.continueOnFail()) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), response);
            } else {
              returnItems.push({
                json: {
                  error: response.reason
                }
              });
              return;
            }
          }
          returnItems.push({
            json: {
              success: response.value
            }
          });
        });
        await channel.close();
        await channel.connection.close();
      } else {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The operation "${mode}" is not known!`);
      }
      return [returnItems];
    } catch (error) {
      if (channel) {
        await channel.close();
        await channel.connection.close();
      }
      throw error;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RabbitMQ
});
//# sourceMappingURL=RabbitMQ.node.js.map