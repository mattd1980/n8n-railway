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
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(create_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Columns",
    name: "columns",
    type: "resourceMapper",
    default: {
      mappingMode: "defineBelow",
      value: null
    },
    noDataExpression: true,
    required: true,
    typeOptions: {
      loadOptionsDependsOn: ["table.value", "base.value"],
      resourceMapper: {
        resourceMapperMethod: "getColumns",
        mode: "add",
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
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items, base, table) {
  const returnData = [];
  const endpoint = `${base}/${table}`;
  const dataMode = this.getNodeParameter("columns.mappingMode", 0);
  for (let i = 0; i < items.length; i++) {
    try {
      const options = this.getNodeParameter("options", i, {});
      const body = {
        typecast: options.typecast ? true : false
      };
      if (dataMode === "autoMapInputData") {
        body.fields = (0, import_utils.removeIgnored)(items[i].json, options.ignoreFields);
      }
      if (dataMode === "defineBelow") {
        const fields = this.getNodeParameter("columns.value", i, []);
        body.fields = fields;
      }
      const responseData = await import_transport.apiRequest.call(this, "POST", endpoint, body);
      const executionData = this.helpers.constructExecutionMetaData(
        (0, import_utilities.wrapData)(responseData),
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
//# sourceMappingURL=create.operation.js.map