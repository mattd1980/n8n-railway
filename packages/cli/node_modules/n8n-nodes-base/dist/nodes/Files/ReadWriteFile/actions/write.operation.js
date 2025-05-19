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
var write_operation_exports = {};
__export(write_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(write_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../utils/utilities");
var import_utils = require("../helpers/utils");
const properties = [
  {
    displayName: "File Path and Name",
    name: "fileName",
    type: "string",
    default: "",
    required: true,
    placeholder: "e.g. /data/example.jpg",
    description: "Path and name of the file that should be written. Also include the file extension."
  },
  {
    displayName: "Input Binary Field",
    name: "dataPropertyName",
    type: "string",
    default: "data",
    placeholder: "e.g. data",
    required: true,
    hint: "The name of the input binary field containing the file to be written"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Append",
        name: "append",
        type: "boolean",
        default: false,
        description: "Whether to append to an existing file. While it's commonly used with text files, it's not limited to them, however, it wouldn't be applicable for file types that have a specific structure like most binary formats."
      }
    ]
  }
];
const displayOptions = {
  show: {
    operation: ["write"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items) {
  const returnData = [];
  let fileName;
  let item;
  for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
    try {
      const dataPropertyName = this.getNodeParameter("dataPropertyName", itemIndex);
      fileName = this.getNodeParameter("fileName", itemIndex);
      const options = this.getNodeParameter("options", itemIndex, {});
      const flag = options.append ? "a" : "w";
      item = items[itemIndex];
      const newItem = {
        json: {},
        pairedItem: {
          item: itemIndex
        }
      };
      Object.assign(newItem.json, item.json);
      const binaryData = this.helpers.assertBinaryData(itemIndex, dataPropertyName);
      let fileContent;
      if (binaryData.id) {
        fileContent = await this.helpers.getBinaryStream(binaryData.id);
      } else {
        fileContent = Buffer.from(binaryData.data, import_n8n_workflow.BINARY_ENCODING);
      }
      await this.helpers.writeContentToFile(fileName, fileContent, flag);
      if (item.binary !== void 0) {
        newItem.binary = {};
        Object.assign(newItem.binary, item.binary);
      }
      newItem.json.fileName = fileName;
      returnData.push(newItem);
    } catch (error) {
      const nodeOperatioinError = import_utils.errorMapper.call(this, error, itemIndex, {
        filePath: fileName,
        operation: "write"
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
//# sourceMappingURL=write.operation.js.map