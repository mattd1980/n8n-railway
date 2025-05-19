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
var Netlify_node_exports = {};
__export(Netlify_node_exports, {
  Netlify: () => Netlify
});
module.exports = __toCommonJS(Netlify_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_DeployDescription = require("./DeployDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_SiteDescription = require("./SiteDescription");
class Netlify {
  constructor() {
    this.description = {
      displayName: "Netlify",
      name: "netlify",
      icon: "file:netlify.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Netlify API",
      defaults: {
        name: "Netlify"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "netlifyApi",
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
              name: "Deploy",
              value: "deploy"
            },
            {
              name: "Site",
              value: "site"
            }
          ],
          default: "deploy",
          required: true
        },
        ...import_DeployDescription.deployOperations,
        ...import_DeployDescription.deployFields,
        ...import_SiteDescription.siteOperations,
        ...import_SiteDescription.siteFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getSites() {
          const returnData = [];
          const sites = await import_GenericFunctions.netlifyApiRequest.call(this, "GET", "/sites");
          for (const site of sites) {
            returnData.push({
              name: site.name,
              value: site.site_id
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const length = items.length;
    let responseData;
    const returnData = [];
    const qs = {};
    const body = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "deploy") {
          if (operation === "cancel") {
            const deployId = this.getNodeParameter("deployId", i);
            responseData = await import_GenericFunctions.netlifyApiRequest.call(
              this,
              "POST",
              `/deploys/${deployId}/cancel`,
              body,
              qs
            );
          }
          if (operation === "create") {
            const siteId = this.getNodeParameter("siteId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            if (body.title) {
              qs.title = body.title;
              delete body.title;
            }
            responseData = await import_GenericFunctions.netlifyApiRequest.call(
              this,
              "POST",
              `/sites/${siteId}/deploys`,
              body,
              qs
            );
          }
          if (operation === "get") {
            const siteId = this.getNodeParameter("siteId", i);
            const deployId = this.getNodeParameter("deployId", i);
            responseData = await import_GenericFunctions.netlifyApiRequest.call(
              this,
              "GET",
              `/sites/${siteId}/deploys/${deployId}`,
              body,
              qs
            );
          }
          if (operation === "getAll") {
            const siteId = this.getNodeParameter("siteId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.netlifyRequestAllItems.call(
                this,
                "GET",
                `/sites/${siteId}/deploys`
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.netlifyApiRequest.call(
                this,
                "GET",
                `/sites/${siteId}/deploys`,
                {},
                { per_page: limit }
              );
            }
          }
        }
        if (resource === "site") {
          if (operation === "delete") {
            const siteId = this.getNodeParameter("siteId", i);
            responseData = await import_GenericFunctions.netlifyApiRequest.call(this, "DELETE", `/sites/${siteId}`);
          }
          if (operation === "get") {
            const siteId = this.getNodeParameter("siteId", i);
            responseData = await import_GenericFunctions.netlifyApiRequest.call(this, "GET", `/sites/${siteId}`);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.netlifyRequestAllItems.call(
                this,
                "GET",
                "/sites",
                {},
                { filter: "all" }
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.netlifyApiRequest.call(
                this,
                "GET",
                "/sites",
                {},
                { filter: "all", per_page: limit }
              );
            }
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
  Netlify
});
//# sourceMappingURL=Netlify.node.js.map