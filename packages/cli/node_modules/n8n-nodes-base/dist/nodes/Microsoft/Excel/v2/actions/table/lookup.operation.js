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
var lookup_operation_exports = {};
__export(lookup_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(lookup_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  import_common.workbookRLC,
  import_common.worksheetRLC,
  import_common.tableRLC,
  {
    displayName: "Lookup Column",
    name: "lookupColumn",
    type: "string",
    default: "",
    placeholder: "Email",
    required: true,
    description: "The name of the column in which to look for value"
  },
  {
    displayName: "Lookup Value",
    name: "lookupValue",
    type: "string",
    default: "",
    placeholder: "frank@example.com",
    required: true,
    description: "The value to look for in column"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Return All Matches",
        name: "returnAllMatches",
        type: "boolean",
        default: false,
        // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
        description: "By default only the first result gets returned. If options gets set all found matches get returned."
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["table"],
    operation: ["lookup"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  for (let i = 0; i < items.length; i++) {
    const qs = {};
    try {
      const workbookId = this.getNodeParameter("workbook", i, void 0, {
        extractValue: true
      });
      const worksheetId = this.getNodeParameter("worksheet", i, void 0, {
        extractValue: true
      });
      const tableId = this.getNodeParameter("table", i, void 0, {
        extractValue: true
      });
      const lookupColumn = this.getNodeParameter("lookupColumn", i);
      const lookupValue = this.getNodeParameter("lookupValue", i);
      const options = this.getNodeParameter("options", i);
      let responseData = await import_transport.microsoftApiRequestAllItemsSkip.call(
        this,
        "value",
        "GET",
        `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/rows`,
        {},
        {}
      );
      qs.$select = "name";
      let columns = await import_transport.microsoftApiRequestAllItemsSkip.call(
        this,
        "value",
        "GET",
        `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/columns`,
        {},
        qs
      );
      columns = columns.map((column) => column.name);
      if (!columns.includes(lookupColumn)) {
        throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData, {
          message: `Column ${lookupColumn} does not exist on the table selected`
        });
      }
      const result = [];
      for (let index = 0; index < responseData.length; index++) {
        const object = {};
        for (let y = 0; y < columns.length; y++) {
          object[columns[y]] = responseData[index].values[0][y];
        }
        result.push({ ...object });
      }
      if (options.returnAllMatches) {
        responseData = result.filter((data) => {
          return data[lookupColumn]?.toString() === lookupValue;
        });
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } else {
        responseData = result.find((data) => {
          return data[lookupColumn]?.toString() === lookupValue;
        });
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
//# sourceMappingURL=lookup.operation.js.map