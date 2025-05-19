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
var addWorksheet_operation_exports = {};
__export(addWorksheet_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(addWorksheet_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  import_common.workbookRLC,
  {
    displayName: "Options",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "The name of the sheet to be added. The name should be unique. If not specified, Excel will determine the name of the new worksheet."
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["workbook"],
    operation: ["addWorksheet"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  for (let i = 0; i < items.length; i++) {
    try {
      const workbookId = this.getNodeParameter("workbook", i, void 0, {
        extractValue: true
      });
      const additionalFields = this.getNodeParameter("additionalFields", i);
      const body = {};
      if (additionalFields.name) {
        body.name = additionalFields.name;
      }
      const { id } = await import_transport.microsoftApiRequest.call(
        this,
        "POST",
        `/drive/items/${workbookId}/workbook/createSession`,
        { persistChanges: true }
      );
      const responseData = await import_transport.microsoftApiRequest.call(
        this,
        "POST",
        `/drive/items/${workbookId}/workbook/worksheets/add`,
        body,
        {},
        "",
        { "workbook-session-id": id }
      );
      await import_transport.microsoftApiRequest.call(
        this,
        "POST",
        `/drive/items/${workbookId}/workbook/closeSession`,
        {},
        {},
        "",
        { "workbook-session-id": id }
      );
      if (Array.isArray(responseData)) {
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } else if (responseData !== void 0) {
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      }
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
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=addWorksheet.operation.js.map