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
var Peekalink_node_exports = {};
__export(Peekalink_node_exports, {
  Peekalink: () => Peekalink,
  apiUrl: () => apiUrl
});
module.exports = __toCommonJS(Peekalink_node_exports);
var import_n8n_workflow = require("n8n-workflow");
const apiUrl = "https://api.peekalink.io";
class Peekalink extends import_n8n_workflow.Node {
  constructor() {
    super(...arguments);
    this.description = {
      displayName: "Peekalink",
      name: "peekalink",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:peekalink.png",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"]',
      description: "Consume the Peekalink API",
      defaults: {
        name: "Peekalink"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "peekalinkApi",
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
              name: "Is Available",
              value: "isAvailable",
              description: "Check whether preview for a given link is available",
              action: "Check whether the preview for a given link is available"
            },
            {
              name: "Preview",
              value: "preview",
              description: "Return the preview for a link",
              action: "Return the preview for a link"
            }
          ],
          default: "preview"
        },
        {
          displayName: "URL",
          name: "url",
          type: "string",
          default: "",
          required: true
        }
      ]
    };
  }
  async execute(context) {
    const items = context.getInputData();
    const operation = context.getNodeParameter("operation", 0);
    const credentials = await context.getCredentials("peekalinkApi");
    const returnData = await Promise.all(
      items.map(async (_, i) => {
        try {
          const link = context.getNodeParameter("url", i);
          return await context.helpers.request({
            method: "POST",
            uri: operation === "preview" ? apiUrl : `${apiUrl}/is-available/`,
            body: { link },
            headers: { "X-API-Key": credentials.apiKey },
            json: true
          });
        } catch (error) {
          if (context.continueOnFail()) {
            return { error: error.message };
          }
          throw new import_n8n_workflow.NodeApiError(context.getNode(), error);
        }
      })
    );
    return [context.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Peekalink,
  apiUrl
});
//# sourceMappingURL=Peekalink.node.js.map