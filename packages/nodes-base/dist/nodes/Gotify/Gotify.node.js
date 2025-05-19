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
var Gotify_node_exports = {};
__export(Gotify_node_exports, {
  Gotify: () => Gotify
});
module.exports = __toCommonJS(Gotify_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Gotify {
  constructor() {
    this.description = {
      displayName: "Gotify",
      name: "gotify",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:gotify.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Gotify API",
      defaults: {
        name: "Gotify"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "gotifyApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Message",
              value: "message"
            }
          ],
          default: "message"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["message"]
            }
          },
          options: [
            {
              name: "Create",
              value: "create",
              action: "Create a message"
            },
            {
              name: "Delete",
              value: "delete",
              action: "Delete a message"
            },
            {
              name: "Get Many",
              value: "getAll",
              action: "Get many messages"
            }
          ],
          default: "create"
        },
        {
          displayName: "Message",
          name: "message",
          type: "string",
          required: true,
          displayOptions: {
            show: {
              resource: ["message"],
              operation: ["create"]
            }
          },
          default: "",
          description: "The message to send, If using Markdown add the Content Type option"
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          displayOptions: {
            show: {
              resource: ["message"],
              operation: ["create"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Priority",
              name: "priority",
              type: "number",
              default: 1,
              description: "The priority of the message"
            },
            {
              displayName: "Title",
              name: "title",
              type: "string",
              default: "",
              description: "The title of the message"
            }
          ]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          displayOptions: {
            show: {
              resource: ["message"],
              operation: ["create"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Content Type",
              name: "contentType",
              type: "options",
              default: "text/plain",
              description: "The message content type",
              options: [
                {
                  name: "Plain",
                  value: "text/plain"
                },
                {
                  name: "Markdown",
                  value: "text/markdown"
                }
              ]
            }
          ]
        },
        {
          displayName: "Message ID",
          name: "messageId",
          type: "string",
          required: true,
          displayOptions: {
            show: {
              resource: ["message"],
              operation: ["delete"]
            }
          },
          default: ""
        },
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              resource: ["message"],
              operation: ["getAll"]
            }
          },
          default: false,
          description: "Whether to return all results or only up to a given limit"
        },
        {
          displayName: "Limit",
          name: "limit",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          description: "Max number of results to return",
          default: 20,
          displayOptions: {
            show: {
              resource: ["message"],
              operation: ["getAll"],
              returnAll: [false]
            }
          }
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "message") {
          if (operation === "create") {
            const message = this.getNodeParameter("message", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              message
            };
            if (options.contentType) {
              body.extras = {
                "client::display": {
                  contentType: options.contentType
                }
              };
            }
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.gotifyApiRequest.call(this, "POST", "/message", body);
          }
          if (operation === "delete") {
            const messageId = this.getNodeParameter("messageId", i);
            responseData = await import_GenericFunctions.gotifyApiRequest.call(this, "DELETE", `/message/${messageId}`);
            responseData = { success: true };
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.gotifyApiRequestAllItems.call(
                this,
                "messages",
                "GET",
                "/message",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.gotifyApiRequest.call(this, "GET", "/message", {}, qs);
              responseData = responseData.messages;
            }
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Gotify
});
//# sourceMappingURL=Gotify.node.js.map