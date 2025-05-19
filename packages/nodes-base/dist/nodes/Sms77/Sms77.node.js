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
var Sms77_node_exports = {};
__export(Sms77_node_exports, {
  Sms77: () => Sms77
});
module.exports = __toCommonJS(Sms77_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Sms77 {
  constructor() {
    this.description = {
      displayName: "seven",
      name: "sms77",
      icon: "file:seven.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Send SMS and make text-to-speech calls",
      defaults: {
        name: "seven"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "sms77Api",
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
              name: "SMS",
              value: "sms"
            },
            {
              name: "Voice Call",
              value: "voice"
            }
          ],
          default: "sms"
        },
        // operations
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["sms"]
            }
          },
          options: [
            {
              name: "Send",
              value: "send",
              description: "Send SMS",
              action: "Send an SMS"
            }
          ],
          default: "send"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["voice"]
            }
          },
          options: [
            {
              name: "Send",
              value: "send",
              description: "Converts text to voice and calls a given number",
              action: "Convert text to voice"
            }
          ],
          default: "send"
        },
        {
          displayName: "From",
          name: "from",
          type: "string",
          default: "",
          placeholder: "+4901234567890",
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms"]
            }
          },
          description: "The caller ID displayed in the receivers display. Max 16 numeric or 11 alphanumeric characters."
        },
        {
          displayName: "To",
          name: "to",
          type: "string",
          default: "",
          placeholder: "+49876543210, MyGroup",
          required: true,
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms", "voice"]
            }
          },
          description: "The number of your recipient(s) separated by comma. Can be regular numbers or contact/groups from seven."
        },
        {
          displayName: "Message",
          name: "message",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms", "voice"]
            }
          },
          description: "The message to send. Max. 1520 characters"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Option",
          default: {},
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms"]
            }
          },
          options: [
            {
              displayName: "Delay",
              name: "delay",
              type: "dateTime",
              default: "",
              description: "Pick a date for time delayed dispatch"
            },
            {
              displayName: "Foreign ID",
              name: "foreign_id",
              type: "string",
              default: "",
              placeholder: "MyCustomForeignID",
              description: "Custom foreign ID returned in DLR callbacks"
            },
            {
              displayName: "Flash",
              name: "flash",
              type: "boolean",
              default: false,
              // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
              description: "Send as flash message being displayed directly the receiver's display"
            },
            {
              displayName: "Label",
              name: "label",
              type: "string",
              default: "",
              placeholder: "MyCustomLabel",
              description: "Custom label used to group analytics"
            },
            {
              displayName: "Performance Tracking",
              name: "performance_tracking",
              type: "boolean",
              default: false,
              description: "Whether to enable performance tracking for URLs found in the message text"
            },
            {
              displayName: "TTL",
              name: "ttl",
              type: "number",
              default: 2880,
              typeOptions: {
                minValue: 1
              },
              description: "Custom time to live specifying the validity period of a message in minutes"
            }
          ]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Option",
          default: {},
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["voice"]
            }
          },
          options: [
            {
              displayName: "From",
              name: "from",
              type: "string",
              default: "",
              placeholder: "+4901234567890",
              description: "The caller ID. Please use only verified sender IDs, one of your virtual inbound numbers or one of our shared virtual numbers."
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const returnData = [];
    for (let i = 0; i < this.getInputData().length; i++) {
      const resource = this.getNodeParameter("resource", i);
      const operation = this.getNodeParameter("operation", i);
      let responseData;
      try {
        if (resource === "sms") {
          if (operation === "send") {
            const from = this.getNodeParameter("from", i);
            const to = this.getNodeParameter("to", i);
            const text = this.getNodeParameter("message", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              from,
              to,
              text,
              ...options
            };
            responseData = await import_GenericFunctions.sms77ApiRequest.call(this, "POST", "/sms", body);
          }
        }
        if (resource === "voice") {
          if (operation === "send") {
            const to = this.getNodeParameter("to", i);
            const text = this.getNodeParameter("message", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              to,
              text,
              ...options
            };
            responseData = await import_GenericFunctions.sms77ApiRequest.call(this, "POST", "/voice", body);
          }
        }
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData);
        } else if (responseData !== void 0) {
          returnData.push(responseData);
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
  Sms77
});
//# sourceMappingURL=Sms77.node.js.map