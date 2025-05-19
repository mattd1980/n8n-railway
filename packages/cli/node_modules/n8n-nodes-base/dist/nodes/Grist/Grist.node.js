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
var Grist_node_exports = {};
__export(Grist_node_exports, {
  Grist: () => Grist
});
module.exports = __toCommonJS(Grist_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_OperationDescription = require("./OperationDescription");
class Grist {
  constructor() {
    this.description = {
      displayName: "Grist",
      name: "grist",
      icon: "file:grist.svg",
      subtitle: '={{$parameter["operation"]}}',
      group: ["input"],
      version: 1,
      description: "Consume the Grist API",
      defaults: {
        name: "Grist"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "gristApi",
          required: true,
          testedBy: "gristApiTest"
        }
      ],
      properties: import_OperationDescription.operationFields
    };
    this.methods = {
      loadOptions: {
        async getTableColumns() {
          const docId = this.getNodeParameter("docId", 0);
          const tableId = this.getNodeParameter("tableId", 0);
          const endpoint = `/docs/${docId}/tables/${tableId}/columns`;
          const { columns } = await import_GenericFunctions.gristApiRequest.call(this, "GET", endpoint);
          return columns.map(({ id }) => ({ name: id, value: id }));
        }
      },
      credentialTest: {
        async gristApiTest(credential) {
          const { apiKey, planType, customSubdomain, selfHostedUrl } = credential.data;
          const endpoint = "/orgs";
          const gristapiurl = planType === "free" ? `https://docs.getgrist.com/api${endpoint}` : planType === "paid" ? `https://${customSubdomain}.getgrist.com/api${endpoint}` : `${selfHostedUrl}/api${endpoint}`;
          const options = {
            headers: {
              Authorization: `Bearer ${apiKey}`
            },
            method: "GET",
            uri: gristapiurl,
            qs: { limit: 1 },
            json: true
          };
          try {
            await this.helpers.request(options);
            return {
              status: "OK",
              message: "Authentication successful"
            };
          } catch (error) {
            return {
              status: "Error",
              message: error.message
            };
          }
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    let responseData;
    const returnData = [];
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        if (operation === "create") {
          const body = { records: [] };
          const dataToSend = this.getNodeParameter("dataToSend", 0);
          if (dataToSend === "autoMapInputs") {
            const incomingKeys = Object.keys(items[i].json);
            const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore", i);
            const inputsToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
            const fields = (0, import_GenericFunctions.parseAutoMappedInputs)(incomingKeys, inputsToIgnore, items[i].json);
            body.records.push({ fields });
          } else if (dataToSend === "defineInNode") {
            const { properties } = this.getNodeParameter("fieldsToSend", i, []);
            import_GenericFunctions.throwOnZeroDefinedFields.call(this, properties);
            body.records.push({ fields: (0, import_GenericFunctions.parseDefinedFields)(properties) });
          }
          const docId = this.getNodeParameter("docId", 0);
          const tableId = this.getNodeParameter("tableId", 0);
          const endpoint = `/docs/${docId}/tables/${tableId}/records`;
          responseData = await import_GenericFunctions.gristApiRequest.call(this, "POST", endpoint, body);
          responseData = {
            id: responseData.records[0].id,
            ...body.records[0].fields
          };
        } else if (operation === "delete") {
          const docId = this.getNodeParameter("docId", 0);
          const tableId = this.getNodeParameter("tableId", 0);
          const endpoint = `/docs/${docId}/tables/${tableId}/data/delete`;
          const rawRowIds = this.getNodeParameter("rowId", i).toString();
          const body = rawRowIds.split(",").map((c) => c.trim()).map(Number);
          await import_GenericFunctions.gristApiRequest.call(this, "POST", endpoint, body);
          responseData = { success: true };
        } else if (operation === "update") {
          const body = { records: [] };
          const rowId = this.getNodeParameter("rowId", i);
          const dataToSend = this.getNodeParameter("dataToSend", 0);
          if (dataToSend === "autoMapInputs") {
            const incomingKeys = Object.keys(items[i].json);
            const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore", i);
            const inputsToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
            const fields = (0, import_GenericFunctions.parseAutoMappedInputs)(incomingKeys, inputsToIgnore, items[i].json);
            body.records.push({ id: Number(rowId), fields });
          } else if (dataToSend === "defineInNode") {
            const { properties } = this.getNodeParameter("fieldsToSend", i, []);
            import_GenericFunctions.throwOnZeroDefinedFields.call(this, properties);
            const fields = (0, import_GenericFunctions.parseDefinedFields)(properties);
            body.records.push({ id: Number(rowId), fields });
          }
          const docId = this.getNodeParameter("docId", 0);
          const tableId = this.getNodeParameter("tableId", 0);
          const endpoint = `/docs/${docId}/tables/${tableId}/records`;
          await import_GenericFunctions.gristApiRequest.call(this, "PATCH", endpoint, body);
          responseData = {
            id: rowId,
            ...body.records[0].fields
          };
        } else if (operation === "getAll") {
          const docId = this.getNodeParameter("docId", 0);
          const tableId = this.getNodeParameter("tableId", 0);
          const endpoint = `/docs/${docId}/tables/${tableId}/records`;
          const qs = {};
          const returnAll = this.getNodeParameter("returnAll", i);
          if (!returnAll) {
            qs.limit = this.getNodeParameter("limit", i);
          }
          const { sort, filter } = this.getNodeParameter(
            "additionalOptions",
            i
          );
          if (sort?.sortProperties.length) {
            qs.sort = (0, import_GenericFunctions.parseSortProperties)(sort.sortProperties);
          }
          if (filter?.filterProperties.length) {
            const parsed = (0, import_GenericFunctions.parseFilterProperties)(filter.filterProperties);
            qs.filter = JSON.stringify(parsed);
          }
          responseData = await import_GenericFunctions.gristApiRequest.call(this, "GET", endpoint, {}, qs);
          responseData = responseData.records.map((data) => {
            return { id: data.id, ...data.fields };
          });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionData2 = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData2);
          continue;
        }
        throw error;
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
  Grist
});
//# sourceMappingURL=Grist.node.js.map