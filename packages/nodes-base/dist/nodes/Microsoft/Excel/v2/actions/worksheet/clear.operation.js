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
var clear_operation_exports = {};
__export(clear_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(clear_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  import_common.workbookRLC,
  import_common.worksheetRLC,
  {
    displayName: "Apply To",
    name: "applyTo",
    type: "options",
    //values in capital case as required by api
    options: [
      {
        name: "All",
        value: "All",
        description: "Clear data in cells and remove all formatting"
      },
      {
        name: "Formats",
        value: "Formats",
        description: "Clear formatting(e.g. font size, color) of cells"
      },
      {
        name: "Contents",
        value: "Contents",
        description: "Clear data contained in cells"
      }
    ],
    default: "All"
  },
  {
    displayName: "Select a Range",
    name: "useRange",
    type: "boolean",
    default: false
  },
  {
    displayName: "Range",
    name: "range",
    type: "string",
    displayOptions: {
      show: {
        useRange: [true]
      }
    },
    placeholder: "e.g. A1:B2",
    default: "",
    description: "The sheet range that would be cleared, specified using a A1-style notation",
    hint: "Leave blank for entire worksheet"
  }
];
const displayOptions = {
  show: {
    resource: ["worksheet"],
    operation: ["clear"]
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
      const worksheetId = this.getNodeParameter("worksheet", i, void 0, {
        extractValue: true
      });
      const applyTo = this.getNodeParameter("applyTo", i);
      const useRange = this.getNodeParameter("useRange", i, false);
      if (!useRange) {
        await import_transport.microsoftApiRequest.call(
          this,
          "POST",
          `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/range/clear`,
          { applyTo }
        );
      } else {
        const range = this.getNodeParameter("range", i, "");
        await import_transport.microsoftApiRequest.call(
          this,
          "POST",
          `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/range(address='${range}')/clear`,
          { applyTo }
        );
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray({ success: true }),
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
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=clear.operation.js.map