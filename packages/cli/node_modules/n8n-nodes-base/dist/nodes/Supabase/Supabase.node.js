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
var Supabase_node_exports = {};
__export(Supabase_node_exports, {
  Supabase: () => Supabase
});
module.exports = __toCommonJS(Supabase_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_RowDescription = require("./RowDescription");
class Supabase {
  constructor() {
    this.description = {
      displayName: "Supabase",
      name: "supabase",
      icon: "file:supabase.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Add, get, delete and update data in a table",
      defaults: {
        name: "Supabase"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      usableAsTool: true,
      credentials: [
        {
          name: "supabaseApi",
          required: true,
          testedBy: "supabaseApiCredentialTest"
        }
      ],
      properties: [
        {
          displayName: "Use Custom Schema",
          name: "useCustomSchema",
          type: "boolean",
          default: false,
          noDataExpression: true,
          description: 'Whether to use a database schema different from the default "public" schema (requires schema exposure in the <a href="https://supabase.com/docs/guides/api/using-custom-schemas?queryGroups=language&language=curl#exposing-custom-schemas">Supabase API</a>)'
        },
        {
          displayName: "Schema",
          name: "schema",
          type: "string",
          default: "public",
          description: "Name of database schema to use for table",
          noDataExpression: false,
          displayOptions: { show: { useCustomSchema: [true] } }
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Row",
              value: "row"
            }
          ],
          default: "row"
        },
        ...import_RowDescription.rowOperations,
        ...import_RowDescription.rowFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getTables() {
          const returnData = [];
          const { paths } = await import_GenericFunctions.supabaseApiRequest.call(this, "GET", "/");
          for (const path of Object.keys(paths)) {
            if (path === "/") continue;
            returnData.push({
              name: path.replace("/", ""),
              value: path.replace("/", "")
            });
          }
          return returnData;
        },
        async getTableColumns() {
          const returnData = [];
          const tableName = this.getCurrentNodeParameter("tableId");
          const { definitions } = await import_GenericFunctions.supabaseApiRequest.call(this, "GET", "/");
          for (const column of Object.keys(definitions[tableName].properties)) {
            returnData.push({
              name: `${column} - (${definitions[tableName].properties[column].type})`,
              value: column
            });
          }
          return returnData;
        }
      },
      credentialTest: {
        async supabaseApiCredentialTest(credential) {
          try {
            await import_GenericFunctions.validateCredentials.call(this, credential.data);
          } catch (error) {
            return {
              status: "Error",
              message: "The Service Key is invalid"
            };
          }
          return {
            status: "OK",
            message: "Connection successful!"
          };
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let qs = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "row") {
      const tableId = this.getNodeParameter("tableId", 0);
      if (operation === "create") {
        const records = [];
        for (let i = 0; i < length; i++) {
          const record = {};
          const dataToSend = this.getNodeParameter("dataToSend", 0);
          if (dataToSend === "autoMapInputData") {
            const incomingKeys = Object.keys(items[i].json);
            const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore", i);
            const inputDataToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
            for (const key of incomingKeys) {
              if (inputDataToIgnore.includes(key)) continue;
              record[key] = items[i].json[key];
            }
          } else {
            const fields = this.getNodeParameter("fieldsUi.fieldValues", i, []);
            for (const field of fields) {
              record[`${field.fieldId}`] = field.fieldValue;
            }
          }
          records.push(record);
        }
        const endpoint = `/${tableId}`;
        try {
          const createdRows = await import_GenericFunctions.supabaseApiRequest.call(
            this,
            "POST",
            endpoint,
            records
          );
          createdRows.forEach((row, i) => {
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(row),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          });
        } catch (error) {
          if (this.continueOnFail()) {
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ error: error.description }),
              { itemData: (0, import_GenericFunctions.mapPairedItemsFrom)(records) }
            );
            returnData.push(...executionData);
          } else {
            throw error;
          }
        }
      }
      if (operation === "delete") {
        const filterType = this.getNodeParameter("filterType", 0);
        for (let i = 0; i < length; i++) {
          let endpoint = `/${tableId}`;
          if (filterType === "manual") {
            const matchType = this.getNodeParameter("matchType", 0);
            const keys = this.getNodeParameter("filters.conditions", i, []);
            if (!keys.length) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "At least one select condition must be defined",
                { itemIndex: i }
              );
            }
            if (matchType === "allFilters") {
              const data = keys.reduce((obj, value) => (0, import_GenericFunctions.buildQuery)(obj, value), {});
              Object.assign(qs, data);
            }
            if (matchType === "anyFilter") {
              const data = keys.map((key) => (0, import_GenericFunctions.buildOrQuery)(key));
              Object.assign(qs, { or: `(${data.join(",")})` });
            }
          }
          if (filterType === "string") {
            const filterString = this.getNodeParameter("filterString", i);
            endpoint = `${endpoint}?${encodeURI(filterString)}`;
          }
          let rows;
          try {
            rows = await import_GenericFunctions.supabaseApiRequest.call(this, "DELETE", endpoint, {}, qs);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData2 = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.description }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData2);
              continue;
            }
            throw error;
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(rows),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "get") {
        const endpoint = `/${tableId}`;
        for (let i = 0; i < length; i++) {
          const keys = this.getNodeParameter("filters.conditions", i, []);
          const data = keys.reduce((obj, value) => (0, import_GenericFunctions.buildGetQuery)(obj, value), {});
          Object.assign(qs, data);
          let rows;
          if (!keys.length) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "At least one select condition must be defined",
              { itemIndex: i }
            );
          }
          try {
            rows = await import_GenericFunctions.supabaseApiRequest.call(this, "GET", endpoint, {}, qs);
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
            this.helpers.returnJsonArray(rows),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
      if (operation === "getAll") {
        const returnAll = this.getNodeParameter("returnAll", 0);
        const filterType = this.getNodeParameter("filterType", 0);
        let endpoint = `/${tableId}`;
        for (let i = 0; i < length; i++) {
          qs = {};
          if (filterType === "manual") {
            const matchType = this.getNodeParameter("matchType", 0);
            const keys = this.getNodeParameter("filters.conditions", i, []);
            if (keys.length !== 0) {
              if (matchType === "allFilters") {
                const data = keys.map((key) => (0, import_GenericFunctions.buildOrQuery)(key));
                Object.assign(qs, { and: `(${data.join(",")})` });
              }
              if (matchType === "anyFilter") {
                const data = keys.map((key) => (0, import_GenericFunctions.buildOrQuery)(key));
                Object.assign(qs, { or: `(${data.join(",")})` });
              }
            }
          }
          if (filterType === "string") {
            const filterString = this.getNodeParameter("filterString", i);
            endpoint = `${endpoint}?${encodeURI(filterString)}`;
          }
          if (!returnAll) {
            qs.limit = this.getNodeParameter("limit", 0);
          }
          let rows = [];
          try {
            let responseLength = 0;
            do {
              const newRows = await import_GenericFunctions.supabaseApiRequest.call(this, "GET", endpoint, {}, qs);
              responseLength = newRows.length;
              rows = rows.concat(newRows);
              qs.offset = rows.length;
            } while (responseLength >= 1e3);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(rows),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.description }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
              continue;
            }
            throw error;
          }
        }
      }
      if (operation === "update") {
        const filterType = this.getNodeParameter("filterType", 0);
        let endpoint = `/${tableId}`;
        for (let i = 0; i < length; i++) {
          if (filterType === "manual") {
            const matchType = this.getNodeParameter("matchType", 0);
            const keys = this.getNodeParameter("filters.conditions", i, []);
            if (!keys.length) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "At least one select condition must be defined",
                { itemIndex: i }
              );
            }
            if (matchType === "allFilters") {
              const data = keys.reduce((obj, value) => (0, import_GenericFunctions.buildQuery)(obj, value), {});
              Object.assign(qs, data);
            }
            if (matchType === "anyFilter") {
              const data = keys.map((key) => (0, import_GenericFunctions.buildOrQuery)(key));
              Object.assign(qs, { or: `(${data.join(",")})` });
            }
          }
          if (filterType === "string") {
            const filterString = this.getNodeParameter("filterString", i);
            endpoint = `${endpoint}?${encodeURI(filterString)}`;
          }
          const record = {};
          const dataToSend = this.getNodeParameter("dataToSend", 0);
          if (dataToSend === "autoMapInputData") {
            const incomingKeys = Object.keys(items[i].json);
            const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore", i);
            const inputDataToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
            for (const key of incomingKeys) {
              if (inputDataToIgnore.includes(key)) continue;
              record[key] = items[i].json[key];
            }
          } else {
            const fields = this.getNodeParameter("fieldsUi.fieldValues", i, []);
            for (const field of fields) {
              record[`${field.fieldId}`] = field.fieldValue;
            }
          }
          let updatedRow;
          try {
            updatedRow = await import_GenericFunctions.supabaseApiRequest.call(this, "PATCH", endpoint, record, qs);
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(updatedRow),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } catch (error) {
            if (this.continueOnFail()) {
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ error: error.description }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
              continue;
            }
            throw error;
          }
        }
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Supabase
});
//# sourceMappingURL=Supabase.node.js.map