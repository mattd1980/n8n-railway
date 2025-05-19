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
var ReadBinaryFiles_node_exports = {};
__export(ReadBinaryFiles_node_exports, {
  ReadBinaryFiles: () => ReadBinaryFiles
});
module.exports = __toCommonJS(ReadBinaryFiles_node_exports);
var import_fast_glob = __toESM(require("fast-glob"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../utils/utilities");
class ReadBinaryFiles {
  constructor() {
    this.description = {
      hidden: true,
      displayName: "Read Binary Files",
      name: "readBinaryFiles",
      icon: "fa:file-import",
      group: ["input"],
      version: 1,
      description: "Reads binary files from disk",
      defaults: {
        name: "Read Binary Files",
        color: "#44AA44"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "File Selector",
          name: "fileSelector",
          type: "string",
          default: "",
          required: true,
          placeholder: "*.jpg",
          description: "Pattern for files to read"
        },
        {
          displayName: "Property Name",
          name: "dataPropertyName",
          type: "string",
          default: "data",
          required: true,
          description: "Name of the binary property to which to write the data of the read files"
        }
      ]
    };
  }
  async execute() {
    const fileSelector = this.getNodeParameter("fileSelector", 0);
    const dataPropertyName = this.getNodeParameter("dataPropertyName", 0);
    const pairedItem = (0, import_utilities.generatePairedItemData)(this.getInputData().length);
    const files = await (0, import_fast_glob.default)(fileSelector);
    const items = [];
    for (const filePath of files) {
      const stream = await this.helpers.createReadStream(filePath);
      items.push({
        binary: {
          [dataPropertyName]: await this.helpers.prepareBinaryData(stream, filePath)
        },
        json: {},
        pairedItem
      });
    }
    return [items];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReadBinaryFiles
});
//# sourceMappingURL=ReadBinaryFiles.node.js.map