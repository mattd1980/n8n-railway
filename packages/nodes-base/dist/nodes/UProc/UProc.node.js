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
var UProc_node_exports = {};
__export(UProc_node_exports, {
  UProc: () => UProc
});
module.exports = __toCommonJS(UProc_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_GroupDescription = require("./GroupDescription");
var import_ToolDescription = require("./ToolDescription");
class UProc {
  constructor() {
    this.description = {
      displayName: "uProc",
      name: "uproc",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:uproc.png",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["tool"]}}',
      description: "Consume uProc API",
      defaults: {
        name: "uProc"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "uprocApi",
          required: true
        }
      ],
      properties: [
        ...import_GroupDescription.groupOptions,
        ...import_ToolDescription.toolOperations,
        ...import_ToolDescription.toolParameters,
        {
          displayName: "Additional Options",
          name: "additionalOptions",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              group: [
                "audio",
                "communication",
                "company",
                "finance",
                "geographic",
                "image",
                "internet",
                "personal",
                "product",
                "security",
                "text"
              ]
            }
          },
          options: [
            {
              displayName: "Data Webhook",
              name: "dataWebhook",
              type: "string",
              description: "URL to send tool response when tool has resolved your request",
              default: ""
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const group = this.getNodeParameter("group", 0);
    const tool = this.getNodeParameter("tool", 0);
    const additionalOptions = this.getNodeParameter("additionalOptions", 0);
    const dataWebhook = additionalOptions.dataWebhook;
    const fields = import_ToolDescription.toolParameters.filter((field) => {
      return field?.displayOptions?.show?.group && field.displayOptions.show.tool && field.displayOptions.show.group.indexOf(group) !== -1 && field.displayOptions.show.tool.indexOf(tool) !== -1;
    }).map((field) => {
      return field.name;
    });
    for (let i = 0; i < length; i++) {
      try {
        const toolKey = tool.replace(/([A-Z]+)/g, "-$1").toLowerCase();
        const body = {
          processor: toolKey,
          params: {}
        };
        fields.forEach((field) => {
          if (field?.length) {
            const data = this.getNodeParameter(field, i);
            body.params[field] = data + "";
          }
        });
        if (dataWebhook?.length) {
          body.callback = {};
        }
        if (dataWebhook?.length) {
          body.callback.data = dataWebhook;
        }
        responseData = await import_GenericFunctions.uprocApiRequest.call(this, "POST", body);
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData);
        } else {
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
  UProc
});
//# sourceMappingURL=UProc.node.js.map