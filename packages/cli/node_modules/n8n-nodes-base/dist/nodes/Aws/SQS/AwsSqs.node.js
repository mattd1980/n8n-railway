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
var AwsSqs_node_exports = {};
__export(AwsSqs_node_exports, {
  AwsSqs: () => AwsSqs
});
module.exports = __toCommonJS(AwsSqs_node_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
var import_url = require("url");
var import_GenericFunctions = require("../GenericFunctions");
class AwsSqs {
  constructor() {
    this.description = {
      displayName: "AWS SQS",
      name: "awsSqs",
      icon: "file:sqs.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"]}}',
      description: "Sends messages to AWS SQS",
      defaults: {
        name: "AWS SQS"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "aws",
          required: true
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
              name: "Send Message",
              value: "sendMessage",
              description: "Send a message to a queue",
              action: "Send a message to a queue"
            }
          ],
          default: "sendMessage"
        },
        {
          displayName: "Queue Name or ID",
          name: "queue",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getQueues"
          },
          displayOptions: {
            show: {
              operation: ["sendMessage"]
            }
          },
          options: [],
          default: "",
          required: true,
          description: 'Queue to send a message to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Queue Type",
          name: "queueType",
          type: "options",
          options: [
            {
              name: "FIFO",
              value: "fifo",
              description: "FIFO SQS queue"
            },
            {
              name: "Standard",
              value: "standard",
              description: "Standard SQS queue"
            }
          ],
          default: "standard"
        },
        {
          displayName: "Send Input Data",
          name: "sendInputData",
          type: "boolean",
          default: true,
          description: "Whether to send the data the node receives as JSON to SQS"
        },
        {
          displayName: "Message",
          name: "message",
          type: "string",
          displayOptions: {
            show: {
              operation: ["sendMessage"],
              sendInputData: [false]
            }
          },
          required: true,
          default: "",
          description: "Message to send to the queue"
        },
        {
          displayName: "Message Group ID",
          name: "messageGroupId",
          type: "string",
          default: "",
          description: "Tag that specifies that a message belongs to a specific message group. Applies only to FIFO (first-in-first-out) queues.",
          displayOptions: {
            show: {
              queueType: ["fifo"]
            }
          },
          required: true
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          displayOptions: {
            show: {
              operation: ["sendMessage"]
            }
          },
          default: {},
          placeholder: "Add option",
          options: [
            {
              displayName: "Delay Seconds",
              name: "delaySeconds",
              type: "number",
              displayOptions: {
                show: {
                  "/queueType": ["standard"]
                }
              },
              description: "How long, in seconds, to delay a message for",
              default: 0,
              typeOptions: {
                minValue: 0,
                maxValue: 900
              }
            },
            {
              displayName: "Message Attributes",
              name: "messageAttributes",
              placeholder: "Add Attribute",
              type: "fixedCollection",
              typeOptions: {
                multipleValues: true
              },
              description: "Attributes to set",
              default: {},
              options: [
                {
                  name: "binary",
                  displayName: "Binary",
                  values: [
                    {
                      displayName: "Name",
                      name: "name",
                      type: "string",
                      default: "",
                      description: "Name of the attribute"
                    },
                    {
                      displayName: "Property Name",
                      name: "dataPropertyName",
                      type: "string",
                      default: "data",
                      description: "Name of the binary property which contains the data for the message attribute"
                    }
                  ]
                },
                {
                  name: "number",
                  displayName: "Number",
                  values: [
                    {
                      displayName: "Name",
                      name: "name",
                      type: "string",
                      default: "",
                      description: "Name of the attribute"
                    },
                    {
                      displayName: "Value",
                      name: "value",
                      type: "number",
                      default: 0,
                      description: "Number value of the attribute"
                    }
                  ]
                },
                {
                  name: "string",
                  displayName: "String",
                  values: [
                    {
                      displayName: "Name",
                      name: "name",
                      type: "string",
                      default: "",
                      description: "Name of the attribute"
                    },
                    {
                      displayName: "Value",
                      name: "value",
                      type: "string",
                      default: "",
                      description: "String value of attribute"
                    }
                  ]
                }
              ]
            },
            {
              displayName: "Message Deduplication ID",
              name: "messageDeduplicationId",
              type: "string",
              default: "",
              description: "Token used for deduplication of sent messages. Applies only to FIFO (first-in-first-out) queues.",
              displayOptions: {
                show: {
                  "/queueType": ["fifo"]
                }
              }
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available queues to display them to user so that it can be selected easily
        async getQueues() {
          const params = ["Version=2012-11-05", "Action=ListQueues"];
          let data;
          try {
            data = await import_GenericFunctions.awsApiRequestSOAP.call(this, "sqs", "GET", `?${params.join("&")}`);
          } catch (error) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
          }
          let queues = data.ListQueuesResponse.ListQueuesResult.QueueUrl;
          if (!queues) {
            return [];
          }
          if (!Array.isArray(queues)) {
            queues = [queues];
          }
          return queues.map((queueUrl) => {
            const urlParts = queueUrl.split("/");
            const name = urlParts[urlParts.length - 1];
            return {
              name,
              value: queueUrl
            };
          });
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        const queueUrl = this.getNodeParameter("queue", i);
        const queuePath = new import_url.URL(queueUrl).pathname;
        const params = ["Version=2012-11-05", `Action=${(0, import_change_case.pascalCase)(operation)}`];
        const options = this.getNodeParameter("options", i, {});
        const sendInputData = this.getNodeParameter("sendInputData", i);
        let message = sendInputData ? JSON.stringify(items[i].json) : this.getNodeParameter("message", i);
        if (typeof message === "object") {
          message = JSON.stringify(message);
        }
        params.push(`MessageBody=${encodeURIComponent(message)}`);
        if (options.delaySeconds) {
          params.push(`DelaySeconds=${options.delaySeconds}`);
        }
        const queueType = this.getNodeParameter("queueType", i, {});
        if (queueType === "fifo") {
          const messageDeduplicationId = this.getNodeParameter(
            "options.messageDeduplicationId",
            i,
            ""
          );
          if (messageDeduplicationId) {
            params.push(`MessageDeduplicationId=${messageDeduplicationId}`);
          }
          const messageGroupId = this.getNodeParameter("messageGroupId", i);
          if (messageGroupId) {
            params.push(`MessageGroupId=${messageGroupId}`);
          }
        }
        let attributeCount = 0;
        this.getNodeParameter("options.messageAttributes.string", i, []).forEach((attribute) => {
          attributeCount++;
          params.push(`MessageAttribute.${attributeCount}.Name=${attribute.name}`);
          params.push(`MessageAttribute.${attributeCount}.Value.StringValue=${attribute.value}`);
          params.push(`MessageAttribute.${attributeCount}.Value.DataType=String`);
        });
        this.getNodeParameter("options.messageAttributes.binary", i, []).forEach((attribute) => {
          attributeCount++;
          const dataPropertyName = attribute.dataPropertyName;
          const binaryData = this.helpers.assertBinaryData(i, dataPropertyName);
          params.push(`MessageAttribute.${attributeCount}.Name=${attribute.name}`);
          params.push(`MessageAttribute.${attributeCount}.Value.BinaryValue=${binaryData.data}`);
          params.push(`MessageAttribute.${attributeCount}.Value.DataType=Binary`);
        });
        this.getNodeParameter("options.messageAttributes.number", i, []).forEach((attribute) => {
          attributeCount++;
          params.push(`MessageAttribute.${attributeCount}.Name=${attribute.name}`);
          params.push(`MessageAttribute.${attributeCount}.Value.StringValue=${attribute.value}`);
          params.push(`MessageAttribute.${attributeCount}.Value.DataType=Number`);
        });
        let responseData;
        try {
          responseData = await import_GenericFunctions.awsApiRequestSOAP.call(
            this,
            "sqs",
            "GET",
            `${queuePath}?${params.join("&")}`
          );
        } catch (error) {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
        }
        const result = responseData.SendMessageResponse.SendMessageResult;
        returnData.push(result);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.description });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AwsSqs
});
//# sourceMappingURL=AwsSqs.node.js.map