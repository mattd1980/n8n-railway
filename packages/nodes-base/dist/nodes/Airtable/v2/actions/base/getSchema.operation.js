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
var getSchema_operation_exports = {};
__export(getSchema_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getSchema_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.baseRLC,
    description: "The Airtable Base to retrieve the schema from"
  }
];
const displayOptions = {
  show: {
    resource: ["base"],
    operation: ["getSchema"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  let returnData = [];
  for (let i = 0; i < items.length; i++) {
    try {
      const baseId = this.getNodeParameter("base", i, void 0, {
        extractValue: true
      });
      const responseData = await import_transport.apiRequest.call(
        this,
        "GET",
        `meta/bases/${baseId}/tables`
      );
      const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)(responseData.tables), {
        itemData: { item: i }
      });
      returnData = returnData.concat(executionData);
    } catch (error) {
      error = (0, import_utils.processAirtableError)(error, void 0, i);
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message } });
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
//# sourceMappingURL=getSchema.operation.js.map