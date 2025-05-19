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
var CircleCi_node_exports = {};
__export(CircleCi_node_exports, {
  CircleCi: () => CircleCi
});
module.exports = __toCommonJS(CircleCi_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_PipelineDescription = require("./PipelineDescription");
class CircleCi {
  constructor() {
    this.description = {
      displayName: "CircleCI",
      name: "circleCi",
      icon: { light: "file:circleCi.svg", dark: "file:circleCi.dark.svg" },
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume CircleCI API",
      defaults: {
        name: "CircleCI"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "circleCiApi",
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
              name: "Pipeline",
              value: "pipeline"
            }
          ],
          default: "pipeline"
        },
        ...import_PipelineDescription.pipelineOperations,
        ...import_PipelineDescription.pipelineFields
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
        if (resource === "pipeline") {
          if (operation === "get") {
            const vcs = this.getNodeParameter("vcs", i);
            let slug = this.getNodeParameter("projectSlug", i);
            const pipelineNumber = this.getNodeParameter("pipelineNumber", i);
            slug = slug.replace(new RegExp(/\//g), "%2F");
            const endpoint = `/project/${vcs}/${slug}/pipeline/${pipelineNumber}`;
            responseData = await import_GenericFunctions.circleciApiRequest.call(this, "GET", endpoint, {}, qs);
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
          }
          if (operation === "getAll") {
            const vcs = this.getNodeParameter("vcs", i);
            const filters = this.getNodeParameter("filters", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            let slug = this.getNodeParameter("projectSlug", i);
            slug = slug.replace(new RegExp(/\//g), "%2F");
            if (filters.branch) {
              qs.branch = filters.branch;
            }
            const endpoint = `/project/${vcs}/${slug}/pipeline`;
            if (returnAll) {
              responseData = await import_GenericFunctions.circleciApiRequestAllItems.call(
                this,
                "items",
                "GET",
                endpoint,
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.circleciApiRequest.call(this, "GET", endpoint, {}, qs);
              responseData = responseData.items;
              responseData = responseData.splice(0, qs.limit);
            }
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
          }
          if (operation === "trigger") {
            const vcs = this.getNodeParameter("vcs", i);
            let slug = this.getNodeParameter("projectSlug", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            slug = slug.replace(new RegExp(/\//g), "%2F");
            const endpoint = `/project/${vcs}/${slug}/pipeline`;
            const body = {};
            if (additionalFields.branch) {
              body.branch = additionalFields.branch;
            }
            if (additionalFields.tag) {
              body.tag = additionalFields.tag;
            }
            responseData = await import_GenericFunctions.circleciApiRequest.call(this, "POST", endpoint, body, qs);
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
          }
        }
        returnData.push(...responseData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message, json: {}, itemIndex: i });
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
  CircleCi
});
//# sourceMappingURL=CircleCi.node.js.map