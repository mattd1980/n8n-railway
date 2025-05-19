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
var Msg91_node_exports = {};
__export(Msg91_node_exports, {
  Msg91: () => Msg91
});
module.exports = __toCommonJS(Msg91_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Msg91 {
  constructor() {
    this.description = {
      displayName: "MSG91",
      name: "msg91",
      icon: { light: "file:msg91.svg", dark: "file:msg91.dark.svg" },
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Sends transactional SMS via MSG91",
      defaults: {
        name: "MSG91"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "msg91Api",
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
          displayName: "Sender ID",
          name: "from",
          type: "string",
          default: "",
          placeholder: "4155238886",
          required: true,
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms"]
            }
          },
          description: "The number from which to send the message"
        },
        {
          displayName: "To",
          name: "to",
          type: "string",
          default: "",
          placeholder: "+14155238886",
          required: true,
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms"]
            }
          },
          description: "The number, with coutry code, to which to send the message"
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
              resource: ["sms"]
            }
          },
          description: "The message to send"
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let operation;
    let resource;
    let body;
    let qs;
    let requestMethod;
    let endpoint;
    for (let i = 0; i < items.length; i++) {
      endpoint = "";
      body = {};
      qs = {};
      resource = this.getNodeParameter("resource", i);
      operation = this.getNodeParameter("operation", i);
      if (resource === "sms") {
        if (operation === "send") {
          requestMethod = "GET";
          endpoint = "/sendhttp.php";
          qs.route = 4;
          qs.country = 0;
          qs.sender = this.getNodeParameter("from", i);
          qs.mobiles = this.getNodeParameter("to", i);
          qs.message = this.getNodeParameter("message", i);
        } else {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            `The operation "${operation}" is not known!`,
            { itemIndex: i }
          );
        }
      } else {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
          itemIndex: i
        });
      }
      const responseData = await import_GenericFunctions.msg91ApiRequest.call(this, requestMethod, endpoint, body, qs);
      returnData.push({ requestId: responseData });
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Msg91
});
//# sourceMappingURL=Msg91.node.js.map