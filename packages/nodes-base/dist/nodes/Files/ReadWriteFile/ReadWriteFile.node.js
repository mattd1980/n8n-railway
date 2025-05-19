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
var ReadWriteFile_node_exports = {};
__export(ReadWriteFile_node_exports, {
  ReadWriteFile: () => ReadWriteFile
});
module.exports = __toCommonJS(ReadWriteFile_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var read = __toESM(require("./actions/read.operation"));
var write = __toESM(require("./actions/write.operation"));
class ReadWriteFile {
  constructor() {
    this.description = {
      displayName: "Read/Write Files from Disk",
      name: "readWriteFile",
      icon: "file:readWriteFile.svg",
      group: ["input"],
      version: 1,
      description: "Read or write files from the computer that runs n8n",
      defaults: {
        name: "Read/Write Files from Disk"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Use this node to read and write files on the same computer running n8n. To handle files between different computers please use other nodes (e.g. FTP, HTTP Request, AWS).",
          name: "info",
          type: "notice",
          default: ""
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Read File(s) From Disk",
              value: "read",
              description: "Retrieve one or more files from the computer that runs n8n",
              action: "Read File(s) From Disk"
            },
            {
              name: "Write File to Disk",
              value: "write",
              description: "Create a binary file on the computer that runs n8n",
              action: "Write File to Disk"
            }
          ],
          default: "read"
        },
        ...read.description,
        ...write.description
      ]
    };
  }
  async execute() {
    const operation = this.getNodeParameter("operation", 0, "read");
    const items = this.getInputData();
    let returnData = [];
    if (operation === "read") {
      returnData = await read.execute.call(this, items);
    }
    if (operation === "write") {
      returnData = await write.execute.call(this, items);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReadWriteFile
});
//# sourceMappingURL=ReadWriteFile.node.js.map