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
var readRows_operation_exports = {};
__export(readRows_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(readRows_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  import_common.workbookRLC,
  import_common.worksheetRLC,
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
    placeholder: "e.g. A1:B2",
    default: "",
    description: "The sheet range to read the data from specified using a A1-style notation, has to be specific e.g A1:B5, generic ranges like A:B are not supported",
    hint: "Leave blank to return entire sheet",
    displayOptions: {
      show: {
        useRange: [true]
      }
    }
  },
  {
    displayName: "Header Row",
    name: "keyRow",
    type: "number",
    typeOptions: {
      minValue: 0
    },
    default: 0,
    hint: "Index of the row which contains the column names",
    description: "Relative to selected 'Range', first row index is 0",
    displayOptions: {
      show: {
        useRange: [true]
      }
    }
  },
  {
    displayName: "First Data Row",
    name: "dataStartRow",
    type: "number",
    typeOptions: {
      minValue: 0
    },
    default: 1,
    hint: "Index of first row which contains the actual data",
    description: "Relative to selected 'Range', first row index is 0",
    displayOptions: {
      show: {
        useRange: [true]
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "RAW Data",
        name: "rawData",
        type: "boolean",
        // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-boolean
        default: 0,
        description: "Whether the data should be returned RAW instead of parsed into keys according to their header"
      },
      {
        displayName: "Data Property",
        name: "dataProperty",
        type: "string",
        default: "data",
        required: true,
        displayOptions: {
          show: {
            rawData: [true]
          }
        },
        description: "The name of the property into which to write the RAW data"
      },
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "",
        description: "Fields the response will containt. Multiple can be added separated by ,.",
        displayOptions: {
          show: {
            rawData: [true]
          }
        }
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["worksheet"],
    operation: ["readRows"]
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
      const options = this.getNodeParameter("options", i, {});
      const range = this.getNodeParameter("range", i, "");
      (0, import_utils.checkRange)(this.getNode(), range);
      const rawData = options.rawData || false;
      if (rawData && options.fields) {
        qs.$select = options.fields;
      }
      let responseData;
      if (range) {
        responseData = await import_transport.microsoftApiRequest.call(
          this,
          "GET",
          `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/range(address='${range}')`,
          {},
          qs
        );
      } else {
        responseData = await import_transport.microsoftApiRequest.call(
          this,
          "GET",
          `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/usedRange`,
          {},
          qs
        );
      }
      if (!rawData) {
        const keyRow = this.getNodeParameter("keyRow", i, 0);
        const firstDataRow = this.getNodeParameter("dataStartRow", i, 1);
        returnData.push(
          ...import_utils.prepareOutput.call(this, this.getNode(), responseData, {
            rawData,
            keyRow,
            firstDataRow
          })
        );
      } else {
        const dataProperty = options.dataProperty || "data";
        returnData.push(
          ...import_utils.prepareOutput.call(this, this.getNode(), responseData, {
            rawData,
            dataProperty
          })
        );
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
//# sourceMappingURL=readRows.operation.js.map