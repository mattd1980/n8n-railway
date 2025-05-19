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
var WriteBinaryFile_node_exports = {};
__export(WriteBinaryFile_node_exports, {
  WriteBinaryFile: () => WriteBinaryFile
});
module.exports = __toCommonJS(WriteBinaryFile_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class WriteBinaryFile {
  constructor() {
    this.description = {
      hidden: true,
      displayName: "Write Binary File",
      name: "writeBinaryFile",
      icon: "fa:file-export",
      group: ["output"],
      version: 1,
      description: "Writes a binary file to disk",
      defaults: {
        name: "Write Binary File",
        color: "#CC2233"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "File Name",
          name: "fileName",
          type: "string",
          default: "",
          required: true,
          placeholder: "/data/example.jpg",
          description: "Path to which the file should be written"
        },
        {
          displayName: "Property Name",
          name: "dataPropertyName",
          type: "string",
          default: "data",
          required: true,
          description: "Name of the binary property which contains the data for the file to be written"
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
              description: "Whether to append to an existing file"
            }
          ]
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
        const dataPropertyName = this.getNodeParameter("dataPropertyName", itemIndex);
        const fileName = this.getNodeParameter("fileName", itemIndex);
        const options = this.getNodeParameter("options", 0, {});
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
  WriteBinaryFile
});
//# sourceMappingURL=WriteBinaryFile.node.js.map