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
var copy_operation_exports = {};
__export(copy_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(copy_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.fileRLC,
    description: "The file to copy"
  },
  {
    displayName: "File Name",
    name: "name",
    type: "string",
    default: "",
    placeholder: "e.g. My File",
    description: "The name of the new file. If not set, \u201CCopy of {original file name}\u201D will be used."
  },
  {
    displayName: "Copy In The Same Folder",
    name: "sameFolder",
    type: "boolean",
    default: true,
    description: "Whether to copy the file in the same folder as the original file"
  },
  {
    ...import_common.driveRLC,
    displayName: "Parent Drive",
    description: "The drive where to save the copied file",
    displayOptions: { show: { sameFolder: [false] } }
  },
  {
    ...import_common.folderRLC,
    displayName: "Parent Folder",
    description: "The folder where to save the copied file",
    displayOptions: { show: { sameFolder: [false] } }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Copy Requires Writer Permission",
        name: "copyRequiresWriterPermission",
        type: "boolean",
        default: false,
        description: "Whether the options to copy, print, or download this file, should be disabled for readers and commenters"
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "A short description of the file"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["file"],
    operation: ["copy"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const file = this.getNodeParameter("fileId", i);
  const fileId = file.value;
  const options = this.getNodeParameter("options", i, {});
  let name = this.getNodeParameter("name", i);
  name = name ? name : `Copy of ${file.cachedResultName}`;
  const copyRequiresWriterPermission = options.copyRequiresWriterPermission || false;
  const qs = {
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
    spaces: "appDataFolder, drive",
    corpora: "allDrives"
  };
  const parents = [];
  const sameFolder = this.getNodeParameter("sameFolder", i);
  if (!sameFolder) {
    const driveId = this.getNodeParameter("driveId", i, void 0, {
      extractValue: true
    });
    const folderId = this.getNodeParameter("folderId", i, void 0, {
      extractValue: true
    });
    parents.push((0, import_utils.setParentFolder)(folderId, driveId));
  }
  const body = { copyRequiresWriterPermission, parents, name };
  if (options.description) {
    body.description = options.description;
  }
  const response = await import_transport.googleApiRequest.call(
    this,
    "POST",
    `/drive/v3/files/${fileId}/copy`,
    body,
    qs
  );
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(response),
    { itemData: { item: i } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=copy.operation.js.map