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
var download_operation_exports = {};
__export(download_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(download_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.siteRLC,
    description: "Select the site to retrieve folders from"
  },
  {
    ...import_common.folderRLC,
    description: "Select the folder to download the file from",
    displayOptions: {
      hide: {
        ...import_common.untilSiteSelected
      }
    }
  },
  {
    ...import_common.fileRLC,
    description: "Select the file to download",
    displayOptions: {
      hide: {
        ...import_common.untilSiteSelected,
        ...import_common.untilFolderSelected
      }
    }
  }
];
const displayOptions = {
  show: {
    resource: ["file"],
    operation: ["download"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=download.operation.js.map