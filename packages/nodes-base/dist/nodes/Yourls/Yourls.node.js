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
var Yourls_node_exports = {};
__export(Yourls_node_exports, {
  Yourls: () => Yourls
});
module.exports = __toCommonJS(Yourls_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_UrlDescription = require("./UrlDescription");
class Yourls {
  constructor() {
    this.description = {
      displayName: "Yourls",
      name: "yourls",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:yourls.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Yourls API",
      defaults: {
        name: "Yourls"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "yourlsApi",
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
              name: "URL",
              value: "url"
            }
          ],
          default: "url"
        },
        ...import_UrlDescription.urlOperations,
        ...import_UrlDescription.urlFields
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
        if (resource === "url") {
          if (operation === "shorten") {
            const url = this.getNodeParameter("url", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            qs.url = url;
            qs.action = "shorturl";
            Object.assign(qs, additionalFields);
            responseData = await import_GenericFunctions.yourlsApiRequest.call(this, "GET", {}, qs);
          }
          if (operation === "expand") {
            const shortUrl = this.getNodeParameter("shortUrl", i);
            qs.shorturl = shortUrl;
            qs.action = "expand";
            responseData = await import_GenericFunctions.yourlsApiRequest.call(this, "GET", {}, qs);
          }
          if (operation === "stats") {
            const shortUrl = this.getNodeParameter("shortUrl", i);
            qs.shorturl = shortUrl;
            qs.action = "url-stats";
            responseData = await import_GenericFunctions.yourlsApiRequest.call(this, "GET", {}, qs);
            responseData = responseData.link;
          }
        }
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
  Yourls
});
//# sourceMappingURL=Yourls.node.js.map