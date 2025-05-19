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
var ReadBinaryFile_node_exports = {};
__export(ReadBinaryFile_node_exports, {
  ReadBinaryFile: () => ReadBinaryFile
});
module.exports = __toCommonJS(ReadBinaryFile_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class ReadBinaryFile {
  constructor() {
    this.description = {
      displayName: "Read Binary File",
      name: "readBinaryFile",
      icon: "fa:file-import",
      group: ["input"],
      version: 1,
      hidden: true,
      description: "Reads a binary file from disk",
      defaults: {
        name: "Read Binary File",
        color: "#449922"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "File Path",
          name: "filePath",
          type: "string",
          default: "",
          required: true,
          placeholder: "/data/example.jpg",
          description: "Path of the file to read"
        },
        {
          displayName: "Property Name",
          name: "dataPropertyName",
          type: "string",
          default: "data",
          required: true,
          description: "Name of the binary property to which to write the data of the read file"
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let item;
    for (let itemIndex = 0; itemIndex < length; itemIndex++) {
      try {
        item = items[itemIndex];
        const newItem = {
          json: item.json,
          binary: {},
          pairedItem: {
            item: itemIndex
          }
        };
        if (item.binary !== void 0 && newItem.binary) {
          Object.assign(newItem.binary, item.binary);
        }
        const filePath = this.getNodeParameter("filePath", itemIndex);
        const stream = await this.helpers.createReadStream(filePath);
        const dataPropertyName = this.getNodeParameter("dataPropertyName", itemIndex);
        newItem.binary[dataPropertyName] = await this.helpers.prepareBinaryData(stream, filePath);
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
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReadBinaryFile
});
//# sourceMappingURL=ReadBinaryFile.node.js.map