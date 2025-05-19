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
var UrlScanIo_node_exports = {};
__export(UrlScanIo_node_exports, {
  UrlScanIo: () => UrlScanIo
});
module.exports = __toCommonJS(UrlScanIo_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class UrlScanIo {
  constructor() {
    this.description = {
      displayName: "urlscan.io",
      name: "urlScanIo",
      icon: "file:urlScanIo.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Provides various utilities for monitoring websites like health checks or screenshots",
      defaults: {
        name: "urlscan.io"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "urlScanIoApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          noDataExpression: true,
          type: "options",
          options: [
            {
              name: "Scan",
              value: "scan"
            }
          ],
          default: "scan"
        },
        ...import_descriptions.scanOperations,
        ...import_descriptions.scanFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "scan") {
          if (operation === "get") {
            const scanId = this.getNodeParameter("scanId", i);
            responseData = await import_GenericFunctions.urlScanIoApiRequest.call(this, "GET", `/result/${scanId}`);
          } else if (operation === "getAll") {
            const filters = this.getNodeParameter("filters", i);
            const qs = {};
            if (filters?.query) {
              qs.q = filters.query;
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "/search", qs);
            responseData = responseData.map(import_GenericFunctions.normalizeId);
          } else if (operation === "perform") {
            const { tags: rawTags, ...rest } = this.getNodeParameter("additionalFields", i);
            const body = {
              url: this.getNodeParameter("url", i),
              ...rest
            };
            if (rawTags) {
              const tags = rawTags.split(",").map((tag) => tag.trim());
              if (tags.length > 10) {
                throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Please enter at most 10 tags", {
                  itemIndex: i
                });
              }
              body.tags = tags;
            }
            responseData = await import_GenericFunctions.urlScanIoApiRequest.call(this, "POST", "/scan", body);
            responseData = (0, import_GenericFunctions.normalizeId)(responseData);
          }
        }
        Array.isArray(responseData) ? returnData.push(...responseData) : returnData.push(responseData);
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
  UrlScanIo
});
//# sourceMappingURL=UrlScanIo.node.js.map