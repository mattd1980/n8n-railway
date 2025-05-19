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
var upsert_operation_exports = {};
__export(upsert_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(upsert_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Columns",
    name: "columns",
    type: "resourceMapper",
    noDataExpression: true,
    default: {
      mappingMode: "defineBelow",
      value: null
    },
    required: true,
    typeOptions: {
      loadOptionsDependsOn: ["table.value", "base.value"],
      resourceMapper: {
        resourceMapperMethod: "getColumnsWithRecordId",
        mode: "update",
        fieldWords: {
          singular: "column",
          plural: "columns"
        },
        addAllFields: true,
        multiKeyMatch: true
      }
    }
  },
  ...import_common.insertUpdateOptions
];
const displayOptions = {
  show: {
    resource: ["record"],
    operation: ["upsert"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items, base, table) {
  const returnData = [];
  const endpoint = `${base}/${table}`;
  const dataMode = this.getNodeParameter("columns.mappingMode", 0);
  const columnsToMatchOn = this.getNodeParameter("columns.matchingColumns", 0);
  for (let i = 0; i < items.length; i++) {
    try {
      const records = [];
      const options = this.getNodeParameter("options", i, {});
      if (dataMode === "autoMapInputData") {
        if (columnsToMatchOn.includes("id")) {
          const { id, ...fields } = items[i].json;
          records.push({
            id,
            fields: (0, import_utils.removeIgnored)(fields, options.ignoreFields)
          });
        } else {
          records.push({ fields: (0, import_utils.removeIgnored)(items[i].json, options.ignoreFields) });
        }
      }
      if (dataMode === "defineBelow") {
        const fields = this.getNodeParameter("columns.value", i, []);
        if (columnsToMatchOn.includes("id")) {
          const id = fields.id;
          delete fields.id;
          records.push({ id, fields });
        } else {
          records.push({ fields });
        }
      }
      const body = {
        typecast: options.typecast ? true : false
      };
      if (!columnsToMatchOn.includes("id")) {
        body.performUpsert = { fieldsToMergeOn: columnsToMatchOn };
      }
      let responseData;
      try {
        responseData = await import_transport.batchUpdate.call(this, endpoint, body, records);
      } catch (error) {
        if (error.httpCode === "422" && columnsToMatchOn.includes("id")) {
          const createBody = {
            ...body,
            records: records.map(({ fields }) => ({ fields }))
          };
          responseData = await import_transport.apiRequest.call(this, "POST", endpoint, createBody);
        } else if (error?.description?.includes("Cannot update more than one record")) {
          const conditions = columnsToMatchOn.map((column) => `{${column}} = '${records[0].fields[column]}'`).join(",");
          const response = await import_transport.apiRequestAllItems.call(
            this,
            "GET",
            endpoint,
            {},
            {
              fields: columnsToMatchOn,
              filterByFormula: `AND(${conditions})`
            }
          );
          const matches = response.records;
          const updateRecords = [];
          if (options.updateAllMatches) {
            updateRecords.push(...matches.map(({ id }) => ({ id, fields: records[0].fields })));
          } else {
            updateRecords.push({ id: matches[0].id, fields: records[0].fields });
          }
          responseData = await import_transport.batchUpdate.call(this, endpoint, body, updateRecords);
        } else {
          throw error;
        }
      }
      const executionData = this.helpers.constructExecutionMetaData(
        (0, import_utilities.wrapData)(responseData.records),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    } catch (error) {
      error = (0, import_utils.processAirtableError)(error, void 0, i);
      if (this.continueOnFail()) {
        returnData.push({ json: { message: error.message, error } });
        continue;
      }
      throw error;
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=upsert.operation.js.map