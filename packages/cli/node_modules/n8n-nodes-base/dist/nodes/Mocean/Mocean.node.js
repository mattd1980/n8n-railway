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
var Mocean_node_exports = {};
__export(Mocean_node_exports, {
  Mocean: () => Mocean
});
module.exports = __toCommonJS(Mocean_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Mocean {
  constructor() {
    this.description = {
      displayName: "Mocean",
      name: "mocean",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      icon: { light: "file:mocean.svg", dark: "file:mocean.dark.svg" },
      group: ["transform"],
      version: 1,
      description: "Send SMS and voice messages via Mocean",
      defaults: {
        name: "Mocean"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "moceanApi",
          required: true,
          testedBy: "moceanApiTest"
        }
      ],
      properties: [
        // Node properties which the user gets displayed and
        // can change on the node.
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "SMS",
              value: "sms"
            },
            {
              name: "Voice",
              value: "voice"
            }
          ],
          default: "sms"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["sms", "voice"]
            }
          },
          options: [
            {
              name: "Send",
              value: "send",
              description: "Send SMS/Voice message",
              action: "Send an SMS"
            }
          ],
          default: "send"
        },
        {
          displayName: "From",
          name: "from",
          type: "string",
          default: "",
          placeholder: "Sender Number",
          required: true,
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms", "voice"]
            }
          },
          description: "Number to which to send the message"
        },
        {
          displayName: "To",
          name: "to",
          type: "string",
          default: "",
          placeholder: "Receipient number",
          required: true,
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms", "voice"]
            }
          },
          description: "Number from which to send the message"
        },
        {
          displayName: "Language",
          name: "language",
          type: "options",
          options: [
            {
              name: "Chinese Mandarin (China)",
              value: "cmn-CN"
            },
            {
              name: "English (United Kingdom)",
              value: "en-GB"
            },
            {
              name: "English (United States)",
              value: "en-US"
            },
            {
              name: "Japanese (Japan)",
              value: "ja-JP"
            },
            {
              name: "Korean (Korea)",
              value: "ko-KR"
            }
          ],
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["voice"]
            }
          },
          default: "en-US"
        },
        {
          displayName: "Message",
          name: "message",
          type: "string",
          default: "",
          placeholder: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms", "voice"]
            }
          },
          description: "Message to send"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Field",
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Delivery Report URL",
              name: "dlrUrl",
              type: "string",
              default: "",
              placeholder: ""
            }
          ]
        }
      ]
    };
    this.methods = {
      credentialTest: {
        async moceanApiTest(credential) {
          const credentials = credential.data;
          const query = {};
          query["mocean-api-key"] = credentials["mocean-api-key"];
          query["mocean-api-secret"] = credentials["mocean-api-secret"];
          const options = {
            method: "GET",
            qs: query,
            uri: "https://rest.moceanapi.com/rest/2/account/balance",
            json: true
          };
          try {
            await this.helpers.request(options);
          } catch (error) {
            return {
              status: "Error",
              message: `Connection details not valid: ${error.message}`
            };
          }
          return {
            status: "OK",
            message: "Authentication successful!"
          };
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let endpoint;
    let operation;
    let requestMethod;
    let resource;
    let text;
    let dlrUrl;
    let dataKey;
    let body;
    let qs;
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      body = {};
      qs = {};
      try {
        resource = this.getNodeParameter("resource", itemIndex, "");
        operation = this.getNodeParameter("operation", itemIndex, "");
        text = this.getNodeParameter("message", itemIndex, "");
        requestMethod = "POST";
        body["mocean-from"] = this.getNodeParameter("from", itemIndex, "");
        body["mocean-to"] = this.getNodeParameter("to", itemIndex, "");
        if (resource === "voice") {
          const language = this.getNodeParameter("language", itemIndex);
          const command = [
            {
              action: "say",
              language,
              text
            }
          ];
          dataKey = "voice";
          body["mocean-command"] = JSON.stringify(command);
          endpoint = "/rest/2/voice/dial";
        } else if (resource === "sms") {
          dlrUrl = this.getNodeParameter("options.dlrUrl", itemIndex, "");
          dataKey = "messages";
          body["mocean-text"] = text;
          if (dlrUrl !== "") {
            body["mocean-dlr-url"] = dlrUrl;
            body["mocean-dlr-mask"] = "1";
          }
          endpoint = "/rest/2/sms";
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `Unknown resource ${resource}`, {
            itemIndex
          });
        }
        if (operation === "send") {
          const responseData = await import_GenericFunctions.moceanApiRequest.call(this, requestMethod, endpoint, body, qs);
          for (const item of responseData[dataKey]) {
            item.type = resource;
            returnData.push(item);
          }
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `Unknown operation ${operation}`, {
            itemIndex
          });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
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
  Mocean
});
//# sourceMappingURL=Mocean.node.js.map