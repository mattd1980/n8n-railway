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
var addTable_operation_exports = {};
__export(addTable_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(addTable_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  import_common.workbookRLC,
  import_common.worksheetRLC,
  {
    displayName: "Select Range",
    name: "selectRange",
    type: "options",
    options: [
      {
        name: "Automatically",
        value: "auto",
        description: "The whole used range on the selected sheet will be converted into a table"
      },
      {
        name: "Manually",
        value: "manual",
        description: "Select a range that will be converted into a table"
      }
    ],
    default: "auto"
  },
  {
    displayName: "Range",
    name: "range",
    type: "string",
    default: "",
    placeholder: "A1:B2",
    description: "The range of cells that will be converted to a table",
    displayOptions: {
      show: {
        selectRange: ["manual"]
      }
    }
  },
  {
    displayName: "Has Headers",
    name: "hasHeaders",
    type: "boolean",
    default: true,
    description: "Whether the range has column labels. When this property set to false Excel will automatically generate header shifting the data down by one row."
  }
];
const displayOptions = {
  show: {
    resource: ["table"],
    operation: ["addTable"]
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
      const selectRange = this.getNodeParameter("selectRange", i);
      const hasHeaders = this.getNodeParameter("hasHeaders", i);
      let range = "";
      if (selectRange === "auto") {
        const { address } = await import_transport.microsoftApiRequest.call(
          this,
          "GET",
          `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/usedRange`,
          void 0,
          {
            select: "address"
          }
        );
        range = address.split("!")[1];
      } else {
        range = this.getNodeParameter("range", i);
      }
      const responseData = await import_transport.microsoftApiRequest.call(
        this,
        "POST",
        `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/add`,
        {
          address: range,
          hasHeaders
        }
      );
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
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
//# sourceMappingURL=addTable.operation.js.map