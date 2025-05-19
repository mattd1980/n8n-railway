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
var read_operation_exports = {};
__export(read_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(read_operation_exports);
var import_fast_glob = __toESM(require("fast-glob"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../utils/utilities");
var import_utils = require("../helpers/utils");
const properties = [
  {
    displayName: "File(s) Selector",
    name: "fileSelector",
    type: "string",
    default: "",
    required: true,
    placeholder: "e.g. /home/user/Pictures/**/*.png",
    hint: 'Supports patterns, learn more <a href="https://github.com/micromatch/picomatch#basic-globbing" target="_blank">here</a>',
    description: "Specify a file's path or path pattern to read multiple files. Always use forward-slashes for path separator even on Windows."
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "File Extension",
        name: "fileExtension",
        type: "string",
        default: "",
        placeholder: "e.g. zip",
        description: "Extension of the file in the output binary"
      },
      {
        displayName: "File Name",
        name: "fileName",
        type: "string",
        default: "",
        placeholder: "e.g. data.zip",
        description: "Name of the file in the output binary"
      },
      {
        displayName: "Mime Type",
        name: "mimeType",
        type: "string",
        default: "",
        placeholder: "e.g. application/zip",
        description: "Mime type of the file in the output binary"
      },
      {
        displayName: "Put Output File in Field",
        name: "dataPropertyName",
        type: "string",
        default: "data",
        placeholder: "e.g. data",
        description: "By default 'data' is used",
        hint: "The name of the output binary field to put the file in"
      }
    ]
  }
];
const displayOptions = {
  show: {
    operation: ["read"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  let fileSelector;
  for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
    try {
      fileSelector = String(this.getNodeParameter("fileSelector", itemIndex));
      fileSelector = (0, import_utils.escapeSpecialCharacters)(fileSelector);
      if (/^[a-zA-Z]:/.test(fileSelector)) {
        fileSelector = fileSelector.replace(/\\\\/g, "/");
      }
      const options = this.getNodeParameter("options", itemIndex, {});
      let dataPropertyName = "data";
      if (options.dataPropertyName) {
        dataPropertyName = options.dataPropertyName;
      }
      const files = await (0, import_fast_glob.default)(fileSelector);
      const newItems = [];
      for (const filePath of files) {
        const stream = await this.helpers.createReadStream(filePath);
        const binaryData = await this.helpers.prepareBinaryData(stream, filePath);
        if (options.fileName !== void 0) {
          binaryData.fileName = options.fileName;
        }
        if (options.fileExtension !== void 0) {
          binaryData.fileExtension = options.fileExtension;
        }
        if (options.mimeType !== void 0) {
          binaryData.mimeType = options.mimeType;
        }
        newItems.push({
          binary: {
            [dataPropertyName]: binaryData
          },
          json: {
            mimeType: binaryData.mimeType,
            fileType: binaryData.fileType,
            fileName: binaryData.fileName,
            fileExtension: binaryData.fileExtension,
            fileSize: binaryData.fileSize
          },
          pairedItem: {
            item: itemIndex
          }
        });
      }
      returnData.push(...newItems);
    } catch (error) {
      const nodeOperatioinError = import_utils.errorMapper.call(this, error, itemIndex, {
        filePath: fileSelector,
        operation: "read"
      });
      if (this.continueOnFail()) {
        returnData.push({
          json: {
            error: nodeOperatioinError.message
          },
          pairedItem: {
            item: itemIndex
          }
        });
        continue;
      }
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error, { itemIndex });
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
//# sourceMappingURL=read.operation.js.map