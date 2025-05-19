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
var getColumns_operation_exports = {};
__export(getColumns_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getColumns_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  import_common.workbookRLC,
  import_common.worksheetRLC,
  import_common.tableRLC,
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "RAW Data",
    name: "rawData",
    type: "boolean",
    default: false,
    description: "Whether the data should be returned RAW instead of parsed into keys according to their header"
  },
  {
    displayName: "Data Property",
    name: "dataProperty",
    type: "string",
    default: "data",
    displayOptions: {
      show: {
        rawData: [true]
      }
    },
    description: "The name of the property into which to write the RAW data"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        rawData: [true]
      }
    },
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "",
        description: "A comma-separated list of the fields to include in the response"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["table"],
    operation: ["getColumns"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  for (let i = 0; i < items.length; i++) {
    try {
      const qs = {};
      const workbookId = this.getNodeParameter("workbook", i, void 0, {
        extractValue: true
      });
      const worksheetId = this.getNodeParameter("worksheet", i, void 0, {
        extractValue: true
      });
      const tableId = this.getNodeParameter("table", i, void 0, {
        extractValue: true
      });
      const returnAll = this.getNodeParameter("returnAll", i);
      const rawData = this.getNodeParameter("rawData", i);
      if (rawData) {
        const filters = this.getNodeParameter("filters", i);
        if (filters.fields) {
          qs.$select = filters.fields;
        }
      }
      let responseData;
      if (returnAll) {
        responseData = await import_transport.microsoftApiRequestAllItemsSkip.call(
          this,
          "value",
          "GET",
          `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/columns`,
          {},
          qs
        );
      } else {
        qs.$top = this.getNodeParameter("limit", i);
        responseData = await import_transport.microsoftApiRequest.call(
          this,
          "GET",
          `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/columns`,
          {},
          qs
        );
        responseData = responseData.value;
      }
      if (!rawData) {
        responseData = responseData.map((column) => ({ name: column.name }));
      } else {
        const dataProperty = this.getNodeParameter("dataProperty", i);
        responseData = { [dataProperty]: responseData };
      }
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
//# sourceMappingURL=getColumns.operation.js.map