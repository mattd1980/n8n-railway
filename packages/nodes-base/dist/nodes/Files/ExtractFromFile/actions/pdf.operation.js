"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var pdf_operation_exports = {};
__export(pdf_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(pdf_operation_exports);
var import_unset = __toESM(require("lodash/unset"));
var import_n8n_workflow = require("n8n-workflow");
var import_binary = require("../../../../utils/binary");
var import_utilities = require("../../../../utils/utilities");
const properties = [
  {
    displayName: "Input Binary Field",
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    required: true,
    placeholder: "e.g data",
    hint: "The name of the input binary field containing the file to be extracted"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Join Pages",
        name: "joinPages",
        type: "boolean",
        default: true,
        description: "Whether to join the text from all pages or return an array of text from each page"
      },
      {
        displayName: "Keep Source",
        name: "keepSource",
        type: "options",
        default: "json",
        options: [
          {
            name: "JSON",
            value: "json",
            description: "Include JSON data of the input item"
          },
          {
            name: "Binary",
            value: "binary",
            description: "Include binary data of the input item"
          },
          {
            name: "Both",
            value: "both",
            description: "Include both JSON and binary data of the input item"
          }
        ]
      },
      {
        displayName: "Max Pages",
        name: "maxPages",
        type: "number",
        default: 0,
        description: "Maximum number of pages to include"
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "Prowide password, if the PDF is encrypted"
      }
    ]
  }
];
const displayOptions = {
  show: {
    operation: ["pdf"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
    try {
      const item = items[itemIndex];
      const options = this.getNodeParameter("options", itemIndex);
      const binaryPropertyName = this.getNodeParameter("binaryPropertyName", itemIndex);
      const json = await import_binary.extractDataFromPDF.call(
        this,
        binaryPropertyName,
        options.password,
        options.maxPages,
        options.joinPages,
        itemIndex
      );
      const newItem = {
        json: {},
        pairedItem: { item: itemIndex }
      };
      if (options.keepSource && options.keepSource !== "binary") {
        newItem.json = { ...(0, import_n8n_workflow.deepCopy)(item.json), ...json };
      } else {
        newItem.json = json;
      }
      if (options.keepSource === "binary" || options.keepSource === "both") {
        newItem.binary = item.binary;
      } else {
        newItem.binary = (0, import_n8n_workflow.deepCopy)(item.binary);
        (0, import_unset.default)(newItem.binary, binaryPropertyName);
      }
      returnData.push(newItem);
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({
          json: {
            error: error.message
          },
          pairedItem: {
            item: itemIndex
          }
        });
        continue;
      }
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, { itemIndex });
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=pdf.operation.js.map