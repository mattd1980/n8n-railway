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
var Plivo_node_exports = {};
__export(Plivo_node_exports, {
  Plivo: () => Plivo
});
module.exports = __toCommonJS(Plivo_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CallDescription = require("./CallDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_MmsDescription = require("./MmsDescription");
var import_SmsDescription = require("./SmsDescription");
class Plivo {
  constructor() {
    this.description = {
      displayName: "Plivo",
      name: "plivo",
      icon: "file:plivo.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Send SMS/MMS messages or make phone calls",
      defaults: {
        name: "Plivo"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "plivoApi",
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
              name: "Call",
              value: "call"
            },
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
              name: "MMS",
              value: "mms"
            },
            {
              name: "SMS",
              value: "sms"
            }
          ],
          default: "sms",
          required: true
        },
        ...import_SmsDescription.smsOperations,
        ...import_SmsDescription.smsFields,
        ...import_MmsDescription.mmsOperations,
        ...import_MmsDescription.mmsFields,
        ...import_CallDescription.callOperations,
        ...import_CallDescription.callFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      let responseData;
      if (resource === "sms") {
        if (operation === "send") {
          const body = {
            src: this.getNodeParameter("from", i),
            dst: this.getNodeParameter("to", i),
            text: this.getNodeParameter("message", i)
          };
          responseData = await import_GenericFunctions.plivoApiRequest.call(this, "POST", "/Message", body);
        }
      } else if (resource === "call") {
        if (operation === "make") {
          const body = {
            from: this.getNodeParameter("from", i),
            to: this.getNodeParameter("to", i),
            answer_url: this.getNodeParameter("answer_url", i),
            answer_method: this.getNodeParameter("answer_method", i)
          };
          responseData = await import_GenericFunctions.plivoApiRequest.call(this, "POST", "/Call", body);
        }
      } else if (resource === "mms") {
        if (operation === "send") {
          const body = {
            src: this.getNodeParameter("from", i),
            dst: this.getNodeParameter("to", i),
            text: this.getNodeParameter("message", i),
            type: "mms",
            media_urls: this.getNodeParameter("media_urls", i)
          };
          responseData = await import_GenericFunctions.plivoApiRequest.call(this, "POST", "/Message", body);
        }
      }
      Array.isArray(responseData) ? returnData.push(...responseData) : returnData.push(responseData);
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Plivo
});
//# sourceMappingURL=Plivo.node.js.map