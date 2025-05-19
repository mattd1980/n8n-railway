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
var ERPNext_node_exports = {};
__export(ERPNext_node_exports, {
  ERPNext: () => ERPNext
});
module.exports = __toCommonJS(ERPNext_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_DocumentDescription = require("./DocumentDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_utils = require("./utils");
class ERPNext {
  constructor() {
    this.description = {
      displayName: "ERPNext",
      name: "erpNext",
      icon: "file:erpnext.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
      description: "Consume ERPNext API",
      defaults: {
        name: "ERPNext"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "erpNextApi",
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
              name: "Document",
              value: "document"
            }
          ],
          default: "document"
        },
        ...import_DocumentDescription.documentOperations,
        ...import_DocumentDescription.documentFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getDocTypes() {
          const data = await import_GenericFunctions.erpNextApiRequestAllItems.call(
            this,
            "data",
            "GET",
            "/api/resource/DocType",
            {}
          );
          const docTypes = data.map(({ name }) => {
            return { name, value: encodeURI(name) };
          });
          return (0, import_utils.processNames)(docTypes);
        },
        async getDocFilters() {
          const docType = this.getCurrentNodeParameter("docType");
          const { data } = await import_GenericFunctions.erpNextApiRequest.call(
            this,
            "GET",
            `/api/resource/DocType/${docType}`,
            {}
          );
          const docFields = data.fields.map(
            ({ label, fieldname }) => {
              return { name: label, value: fieldname };
            }
          );
          docFields.unshift({ name: "*", value: "*" });
          return (0, import_utils.processNames)(docFields);
        },
        async getDocFields() {
          const docType = this.getCurrentNodeParameter("docType");
          const { data } = await import_GenericFunctions.erpNextApiRequest.call(
            this,
            "GET",
            `/api/resource/DocType/${docType}`,
            {}
          );
          const docFields = data.fields.map(
            ({ label, fieldname }) => {
              return { name: label, value: fieldname };
            }
          );
          return (0, import_utils.processNames)(docFields);
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let responseData;
    const body = {};
    const qs = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      if (resource === "document") {
        if (operation === "get") {
          const docType = this.getNodeParameter("docType", i);
          const documentName = this.getNodeParameter("documentName", i);
          responseData = await import_GenericFunctions.erpNextApiRequest.call(
            this,
            "GET",
            `/api/resource/${docType}/${documentName}`
          );
          responseData = responseData.data;
        }
        if (operation === "getAll") {
          const docType = this.getNodeParameter("docType", i);
          const endpoint = `/api/resource/${docType}`;
          const { fields, filters } = this.getNodeParameter("options", i);
          if (fields) {
            if (fields.includes("*")) {
              qs.fields = JSON.stringify(["*"]);
            } else {
              qs.fields = JSON.stringify(fields);
            }
          }
          if (filters) {
            qs.filters = JSON.stringify(
              filters.customProperty.map((filter) => {
                return [docType, filter.field, (0, import_utils.toSQL)(filter.operator), filter.value];
              })
            );
          }
          const returnAll = this.getNodeParameter("returnAll", i);
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", i);
            qs.limit_page_length = limit;
            qs.limit_start = 0;
            responseData = await import_GenericFunctions.erpNextApiRequest.call(this, "GET", endpoint, {}, qs);
            responseData = responseData.data;
          } else {
            responseData = await import_GenericFunctions.erpNextApiRequestAllItems.call(
              this,
              "data",
              "GET",
              endpoint,
              {},
              qs
            );
          }
        } else if (operation === "create") {
          const properties = this.getNodeParameter("properties", i);
          if (!properties.customProperty.length) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "Please enter at least one property for the document to create.",
              { itemIndex: i }
            );
          }
          properties.customProperty.forEach((property) => {
            body[property.field] = property.value;
          });
          const docType = this.getNodeParameter("docType", i);
          responseData = await import_GenericFunctions.erpNextApiRequest.call(
            this,
            "POST",
            `/api/resource/${docType}`,
            body
          );
          responseData = responseData.data;
        } else if (operation === "delete") {
          const docType = this.getNodeParameter("docType", i);
          const documentName = this.getNodeParameter("documentName", i);
          responseData = await import_GenericFunctions.erpNextApiRequest.call(
            this,
            "DELETE",
            `/api/resource/${docType}/${documentName}`
          );
        } else if (operation === "update") {
          const properties = this.getNodeParameter("properties", i);
          if (!properties.customProperty.length) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "Please enter at least one property for the document to update.",
              { itemIndex: i }
            );
          }
          properties.customProperty.forEach((property) => {
            body[property.field] = property.value;
          });
          const docType = this.getNodeParameter("docType", i);
          const documentName = this.getNodeParameter("documentName", i);
          responseData = await import_GenericFunctions.erpNextApiRequest.call(
            this,
            "PUT",
            `/api/resource/${docType}/${documentName}`,
            body
          );
          responseData = responseData.data;
        }
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ERPNext
});
//# sourceMappingURL=ERPNext.node.js.map