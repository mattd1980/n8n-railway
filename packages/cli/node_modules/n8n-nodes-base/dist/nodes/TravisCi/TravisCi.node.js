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
var TravisCi_node_exports = {};
__export(TravisCi_node_exports, {
  TravisCi: () => TravisCi
});
module.exports = __toCommonJS(TravisCi_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_BuildDescription = require("./BuildDescription");
var import_GenericFunctions = require("./GenericFunctions");
class TravisCi {
  constructor() {
    this.description = {
      displayName: "TravisCI",
      name: "travisCi",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:travisci.png",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume TravisCI API",
      defaults: {
        name: "TravisCI"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "travisCiApi",
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
              name: "Build",
              value: "build"
            }
          ],
          default: "build"
        },
        ...import_BuildDescription.buildOperations,
        ...import_BuildDescription.buildFields
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
        if (resource === "build") {
          if (operation === "get") {
            const buildId = this.getNodeParameter("buildId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.include) {
              qs.include = additionalFields.include;
            }
            responseData = await import_GenericFunctions.travisciApiRequest.call(this, "GET", `/build/${buildId}`, {}, qs);
          }
          if (operation === "getAll") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            if (additionalFields.sortBy) {
              qs.sort_by = additionalFields.sortBy;
            }
            if (additionalFields.sortBy && additionalFields.order) {
              qs.sort_by = `${additionalFields.sortBy}:${additionalFields.order}`;
            }
            if (additionalFields.include) {
              qs.include = additionalFields.include;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.travisciApiRequestAllItems.call(
                this,
                "builds",
                "GET",
                "/builds",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.travisciApiRequest.call(this, "GET", "/builds", {}, qs);
              responseData = responseData.builds;
            }
          }
          if (operation === "cancel") {
            const buildId = this.getNodeParameter("buildId", i);
            responseData = await import_GenericFunctions.travisciApiRequest.call(
              this,
              "POST",
              `/build/${buildId}/cancel`,
              {},
              qs
            );
          }
          if (operation === "restart") {
            const buildId = this.getNodeParameter("buildId", i);
            responseData = await import_GenericFunctions.travisciApiRequest.call(
              this,
              "POST",
              `/build/${buildId}/restart`,
              {},
              qs
            );
          }
          if (operation === "trigger") {
            let slug = this.getNodeParameter("slug", i);
            const branch = this.getNodeParameter("branch", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            slug = slug.replace(new RegExp(/\//g), "%2F");
            const request = {
              branch
            };
            if (additionalFields.message) {
              request.message = additionalFields.message;
            }
            if (additionalFields.mergeMode) {
              request.merge_mode = additionalFields.mergeMode;
            }
            responseData = await import_GenericFunctions.travisciApiRequest.call(
              this,
              "POST",
              `/repo/${slug}/requests`,
              JSON.stringify({ request })
            );
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
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
  TravisCi
});
//# sourceMappingURL=TravisCi.node.js.map