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
var upload_operation_exports = {};
__export(upload_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(upload_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../helpers/utils");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.siteRLC,
    description: "Select the site to retrieve folders from"
  },
  {
    ...import_common.folderRLC,
    description: "Select the folder to upload the file to",
    displayOptions: {
      hide: {
        ...import_common.untilSiteSelected
      }
    }
  },
  {
    displayName: "File Name",
    name: "fileName",
    default: "",
    description: "The name of the file being uploaded",
    placeholder: "e.g. My New File",
    required: true,
    type: "string"
  },
  {
    displayName: "File Contents",
    name: "fileContents",
    default: "",
    description: "Find the name of input field containing the binary data to upload the file in the Input panel on the left, in the Binary tab",
    hint: "The name of the input field containing the binary file data to update the file",
    placeholder: "data",
    required: true,
    routing: {
      send: {
        preSend: [import_utils.uploadFilePreSend]
      }
    },
    type: "string"
  }
];
const displayOptions = {
  show: {
    resource: ["file"],
    operation: ["upload"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=upload.operation.js.map