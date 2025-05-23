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
var commonDescription_exports = {};
__export(commonDescription_exports, {
  cellFormat: () => cellFormat,
  dataLocationOnSheet: () => dataLocationOnSheet,
  handlingExtraData: () => handlingExtraData,
  locationDefine: () => locationDefine,
  outputFormatting: () => outputFormatting,
  useAppendOption: () => useAppendOption
});
module.exports = __toCommonJS(commonDescription_exports);
const dataLocationOnSheet = {
  displayName: "Data Location on Sheet",
  name: "dataLocationOnSheet",
  type: "fixedCollection",
  placeholder: "Select Range",
  default: { values: { rangeDefinition: "detectAutomatically" } },
  options: [
    {
      displayName: "Values",
      name: "values",
      values: [
        {
          displayName: "Range Definition",
          name: "rangeDefinition",
          type: "options",
          options: [
            {
              name: "Detect Automatically",
              value: "detectAutomatically",
              description: "Automatically detect the data range"
            },
            {
              name: "Specify Range (A1 Notation)",
              value: "specifyRangeA1",
              description: "Manually specify the data range"
            },
            {
              name: "Specify Range (Rows)",
              value: "specifyRange",
              description: "Manually specify the data range"
            }
          ],
          default: ""
        },
        {
          displayName: "Read Rows Until",
          name: "readRowsUntil",
          type: "options",
          default: "lastRowInSheet",
          options: [
            {
              name: "First Empty Row",
              value: "firstEmptyRow"
            },
            {
              name: "Last Row In Sheet",
              value: "lastRowInSheet"
            }
          ],
          displayOptions: {
            show: {
              rangeDefinition: ["detectAutomatically"]
            }
          }
        },
        {
          displayName: "Header Row",
          name: "headerRow",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          default: 1,
          description: "Index is relative to the set 'Range', first row index is 1",
          hint: "Index of the row which contains the column names",
          displayOptions: {
            show: {
              rangeDefinition: ["specifyRange"]
            }
          }
        },
        {
          displayName: "First Data Row",
          name: "firstDataRow",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          default: 2,
          description: "Index is relative to the set 'Range', first row index is 1",
          hint: "Index of first row which contains the actual data",
          displayOptions: {
            show: {
              rangeDefinition: ["specifyRange"]
            }
          }
        },
        {
          displayName: "Range",
          name: "range",
          type: "string",
          default: "",
          placeholder: "A:Z",
          description: 'The table range to read from or to append data to. See the Google <a href="https://developers.google.com/sheets/api/guides/values#writing">documentation</a> for the details.',
          hint: "You can specify both the rows and the columns, e.g. C4:E7",
          displayOptions: {
            show: {
              rangeDefinition: ["specifyRangeA1"]
            }
          }
        }
      ]
    }
  ]
};
const locationDefine = {
  displayName: "Data Location on Sheet",
  name: "locationDefine",
  type: "fixedCollection",
  placeholder: "Select Range",
  default: { values: {} },
  options: [
    {
      displayName: "Values",
      name: "values",
      values: [
        {
          displayName: "Header Row",
          name: "headerRow",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          default: 1,
          description: "Index is relative to the set 'Range', first row index is 1",
          hint: "Index of the row which contains the column names"
        },
        {
          displayName: "First Data Row",
          name: "firstDataRow",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          default: 2,
          description: "Index is relative to the set 'Range', first row index is 1",
          hint: "Index of first row which contains the actual data"
        }
      ]
    }
  ]
};
const outputFormatting = {
  displayName: "Output Formatting",
  name: "outputFormatting",
  type: "fixedCollection",
  placeholder: "Add Formatting",
  default: { values: { general: "UNFORMATTED_VALUE", date: "FORMATTED_STRING" } },
  options: [
    {
      displayName: "Values",
      name: "values",
      values: [
        {
          displayName: "General Formatting",
          name: "general",
          type: "options",
          options: [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "Values (unformatted)",
              value: "UNFORMATTED_VALUE",
              description: "Numbers stay as numbers, but any currency signs or special formatting is lost"
            },
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "Values (formatted)",
              value: "FORMATTED_VALUE",
              description: "Numbers are turned to text, and displayed as in Google Sheets (e.g. with commas or currency signs)"
            },
            {
              name: "Formulas",
              value: "FORMULA"
            }
          ],
          default: "",
          description: "Determines how values should be rendered in the output"
        },
        {
          displayName: "Date Formatting",
          name: "date",
          type: "options",
          default: "",
          options: [
            {
              name: "Formatted Text",
              value: "FORMATTED_STRING",
              description: "As displayed in Google Sheets, e.g. '01/01/2022'"
            },
            {
              name: "Serial Number",
              value: "SERIAL_NUMBER",
              description: "A number representing the number of days since Dec 30, 1899"
            }
          ]
        }
      ]
    }
  ]
};
const cellFormat = {
  displayName: "Cell Format",
  name: "cellFormat",
  type: "options",
  options: [
    {
      // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
      name: "Let Google Sheets format",
      value: "USER_ENTERED",
      description: "Cells are styled as if you typed the values into Google Sheets directly"
    },
    {
      // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
      name: "Let n8n format",
      value: "RAW",
      description: "Cells have the same types as the input data"
    }
  ],
  default: "USER_ENTERED",
  description: "Determines how data should be interpreted"
};
const handlingExtraData = {
  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
  displayName: "Handling extra fields in input",
  name: "handlingExtraData",
  type: "options",
  options: [
    {
      name: "Insert in New Column(s)",
      value: "insertInNewColumn",
      description: "Create a new column for extra data"
    },
    {
      name: "Ignore Them",
      value: "ignoreIt",
      description: "Ignore extra data"
    },
    {
      name: "Error",
      value: "error",
      description: "Throw an error"
    }
  ],
  displayOptions: {
    show: {
      "/dataMode": ["autoMapInputData"]
    }
  },
  default: "insertInNewColumn",
  description: "What do to with fields that don't match any columns in the Google Sheet"
};
const useAppendOption = {
  displayName: "Minimise API Calls",
  name: "useAppend",
  type: "boolean",
  default: false,
  hint: "Use if your sheet has no gaps between rows or columns",
  description: "Whether to use append instead of update(default), this is more efficient but in some cases data might be misaligned"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cellFormat,
  dataLocationOnSheet,
  handlingExtraData,
  locationDefine,
  outputFormatting,
  useAppendOption
});
//# sourceMappingURL=commonDescription.js.map