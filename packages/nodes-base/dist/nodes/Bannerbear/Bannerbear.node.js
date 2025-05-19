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
var Bannerbear_node_exports = {};
__export(Bannerbear_node_exports, {
  Bannerbear: () => Bannerbear
});
module.exports = __toCommonJS(Bannerbear_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_ImageDescription = require("./ImageDescription");
var import_TemplateDescription = require("./TemplateDescription");
class Bannerbear {
  constructor() {
    this.description = {
      displayName: "Bannerbear",
      name: "bannerbear",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:bannerbear.png",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Bannerbear API",
      defaults: {
        name: "Bannerbear"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "bannerbearApi",
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
              name: "Image",
              value: "image"
            },
            {
              name: "Template",
              value: "template"
            }
          ],
          default: "image"
        },
        // IMAGE
        ...import_ImageDescription.imageOperations,
        ...import_ImageDescription.imageFields,
        // TEMPLATE
        ...import_TemplateDescription.templateOperations,
        ...import_TemplateDescription.templateFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available templates to display them to user so that they can
        // select them easily
        async getTemplates() {
          const returnData = [];
          const templates = await import_GenericFunctions.bannerbearApiRequest.call(this, "GET", "/templates");
          for (const template of templates) {
            const templateName = template.name;
            const templateId = template.uid;
            returnData.push({
              name: templateName,
              value: templateId
            });
          }
          return returnData;
        },
        // Get all the available modifications to display them to user so that they can
        // select them easily
        async getModificationNames() {
          const templateId = this.getCurrentNodeParameter("templateId");
          const returnData = [];
          const { available_modifications } = await import_GenericFunctions.bannerbearApiRequest.call(
            this,
            "GET",
            `/templates/${templateId}`
          );
          for (const modification of available_modifications) {
            const modificationName = modification.name;
            const modificationId = modification.name;
            returnData.push({
              name: modificationName,
              value: modificationId
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      if (resource === "image") {
        if (operation === "create") {
          const templateId = this.getNodeParameter("templateId", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const modifications = this.getNodeParameter("modificationsUi", i).modificationsValues;
          const body = {
            template: templateId
          };
          if (additionalFields.webhookUrl) {
            body.webhook_url = additionalFields.webhookUrl;
          }
          if (additionalFields.metadata) {
            body.metadata = additionalFields.metadata;
          }
          if (modifications) {
            body.modifications = (0, import_GenericFunctions.keysToSnakeCase)(modifications);
            for (const modification of body.modifications) {
              for (const key of Object.keys(modification)) {
                if (modification[key] === "") {
                  delete modification[key];
                }
              }
            }
          }
          responseData = await import_GenericFunctions.bannerbearApiRequest.call(this, "POST", "/images", body);
          if (additionalFields.waitForImage && responseData.status !== "completed") {
            let maxTries = additionalFields.waitForImageMaxTries || 3;
            const promise = async (uid) => {
              let data = {};
              return await new Promise((resolve, reject) => {
                const timeout = setInterval(async () => {
                  data = await import_GenericFunctions.bannerbearApiRequest.call(this, "GET", `/images/${uid}`);
                  if (data.status === "completed") {
                    clearInterval(timeout);
                    resolve(data);
                  }
                  if (--maxTries === 0) {
                    clearInterval(timeout);
                    reject(new Error("Image did not finish processing after multiple tries."));
                  }
                }, 2e3);
              });
            };
            responseData = await promise(responseData.uid);
          }
        }
        if (operation === "get") {
          const imageId = this.getNodeParameter("imageId", i);
          responseData = await import_GenericFunctions.bannerbearApiRequest.call(this, "GET", `/images/${imageId}`);
        }
      }
      if (resource === "template") {
        if (operation === "get") {
          const templateId = this.getNodeParameter("templateId", i);
          responseData = await import_GenericFunctions.bannerbearApiRequest.call(this, "GET", `/templates/${templateId}`);
        }
        if (operation === "getAll") {
          responseData = await import_GenericFunctions.bannerbearApiRequest.call(this, "GET", "/templates");
        }
      }
      if (Array.isArray(responseData)) {
        returnData.push.apply(returnData, responseData);
      } else {
        returnData.push(responseData);
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bannerbear
});
//# sourceMappingURL=Bannerbear.node.js.map