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
var deleteWorkbook_operation_exports = {};
__export(deleteWorkbook_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(deleteWorkbook_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [import_common.workbookRLC];
const displayOptions = {
  show: {
    resource: ["workbook"],
    operation: ["deleteWorkbook"]
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
      try {
        await import_transport.microsoftApiRequest.call(this, "DELETE", `/drive/items/${workbookId}`);
      } catch (error) {
        if (error?.description.includes("Lock token does not match existing lock")) {
          const errorDescription = "Lock token does not match existing lock, this error could happen if the file is opened in the browser or the Office client, please close file and try again.";
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
            itemIndex: i,
            description: errorDescription
          });
        } else {
          throw error;
        }
      }
      const responseData = { success: true };
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
//# sourceMappingURL=deleteWorkbook.operation.js.map