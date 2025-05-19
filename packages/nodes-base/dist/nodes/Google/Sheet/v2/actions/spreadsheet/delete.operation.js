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
var delete_operation_exports = {};
__export(delete_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(delete_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_constants = require("../../../../constants");
var import_transport = require("../../transport");
const description = [
  {
    displayName: "Document",
    name: "documentId",
    type: "resourceLocator",
    default: { mode: "list", value: "" },
    required: true,
    modes: [
      {
        displayName: "From List",
        name: "list",
        type: "list",
        typeOptions: {
          searchListMethod: "spreadSheetsSearch",
          searchable: true
        }
      },
      {
        displayName: "By URL",
        name: "url",
        type: "string",
        extractValue: {
          type: "regex",
          regex: import_constants.GOOGLE_DRIVE_FILE_URL_REGEX
        },
        validation: [
          {
            type: "regex",
            properties: {
              regex: import_constants.GOOGLE_DRIVE_FILE_URL_REGEX,
              errorMessage: "Not a valid Google Drive File URL"
            }
          }
        ]
      },
      {
        displayName: "By ID",
        name: "id",
        type: "string",
        validation: [
          {
            type: "regex",
            properties: {
              regex: "[a-zA-Z0-9\\-_]{2,}",
              errorMessage: "Not a valid Google Drive File ID"
            }
          }
        ],
        url: "=https://docs.google.com/spreadsheets/d/{{$value}}/edit"
      }
    ],
    displayOptions: {
      show: {
        resource: ["spreadsheet"],
        operation: ["deleteSpreadsheet"]
      }
    }
  }
];
async function execute() {
  const items = this.getInputData();
  const returnData = [];
  for (let i = 0; i < items.length; i++) {
    const documentId = this.getNodeParameter("documentId", i, void 0, {
      extractValue: true
    });
    await import_transport.apiRequest.call(
      this,
      "DELETE",
      "",
      {},
      {},
      `https://www.googleapis.com/drive/v3/files/${documentId}`
    );
    const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)({ success: true }), {
      itemData: { item: i }
    });
    returnData.push(...executionData);
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=delete.operation.js.map