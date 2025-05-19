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
var import_utilities = require("../../../../../../utils/utilities");
var import_GoogleSheets = require("../../helpers/GoogleSheets.utils");
var import_transport = require("../../transport");
const description = [
  {
    displayName: "Title",
    name: "title",
    type: "string",
    required: true,
    default: "n8n-sheet",
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["create"]
      }
    },
    description: "The name of the sheet"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Hidden",
        name: "hidden",
        type: "boolean",
        default: false,
        description: "Whether the sheet is hidden in the UI, false if it's visible"
      },
      {
        displayName: "Right To Left",
        name: "rightToLeft",
        type: "boolean",
        default: false,
        description: "Whether the sheet is an RTL sheet instead of an LTR sheet"
      },
      {
        displayName: "Sheet ID",
        name: "sheetId",
        type: "number",
        default: 0,
        description: "The ID of the sheet. Must be non-negative. This field cannot be changed once set."
      },
      {
        displayName: "Sheet Index",
        name: "index",
        type: "number",
        default: 0,
        description: "The index of the sheet within the spreadsheet"
      },
      {
        displayName: "Tab Color",
        name: "tabColor",
        type: "color",
        default: "0aa55c",
        description: "The color of the tab in the UI"
      }
    ]
  }
];
async function execute(sheet, sheetName) {
  let responseData;
  const returnData = [];
  const items = this.getInputData();
  const existingSheetNames = await (0, import_GoogleSheets.getExistingSheetNames)(sheet);
  for (let i = 0; i < items.length; i++) {
    const sheetTitle = this.getNodeParameter("title", i, {});
    if (existingSheetNames.includes(sheetTitle)) {
      continue;
    }
    const options = this.getNodeParameter("options", i, {});
    const properties = { ...options };
    properties.title = sheetTitle;
    if (options.tabColor) {
      const { red, green, blue } = (0, import_GoogleSheets.hexToRgb)(options.tabColor);
      properties.tabColor = { red: red / 255, green: green / 255, blue: blue / 255 };
    }
    const requests = [
      {
        addSheet: {
          properties
        }
      }
    ];
    responseData = await import_transport.apiRequest.call(
      this,
      "POST",
      `/v4/spreadsheets/${sheetName}:batchUpdate`,
      { requests }
    );
    Object.assign(responseData, responseData.replies[0].addSheet.properties);
    delete responseData.replies;
    existingSheetNames.push(sheetTitle);
    const executionData = this.helpers.constructExecutionMetaData(
      (0, import_utilities.wrapData)(responseData),
      { itemData: { item: i } }
    );
    returnData.push(...executionData);
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=create.operation.js.map