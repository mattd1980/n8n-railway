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
var deleteFile_operation_exports = {};
__export(deleteFile_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(deleteFile_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.fileRLC,
    description: "The file to delete"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Delete Permanently",
        name: "deletePermanently",
        type: "boolean",
        default: false,
        description: "Whether to delete the file immediately. If false, the file will be moved to the trash."
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["file"],
    operation: ["deleteFile"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const fileId = this.getNodeParameter("fileId", i, void 0, {
    extractValue: true
  });
  const deletePermanently = this.getNodeParameter("options.deletePermanently", i, false);
  const qs = {
    supportsAllDrives: true
  };
  if (deletePermanently) {
    await import_transport.googleApiRequest.call(this, "DELETE", `/drive/v3/files/${fileId}`, void 0, qs);
  } else {
    await import_transport.googleApiRequest.call(this, "PATCH", `/drive/v3/files/${fileId}`, { trashed: true }, qs);
  }
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray({
      id: fileId,
      success: true
    }),
    { itemData: { item: i } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=deleteFile.operation.js.map