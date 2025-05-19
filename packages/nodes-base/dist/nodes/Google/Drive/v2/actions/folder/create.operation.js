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
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(create_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_interfaces = require("../../helpers/interfaces");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Folder Name",
    name: "name",
    type: "string",
    default: "",
    placeholder: "e.g. New Folder",
    description: "The name of the new folder. If not set, 'Untitled' will be used."
  },
  {
    ...import_common.driveRLC,
    displayName: "Parent Drive",
    description: "The drive where to create the new folder"
  },
  {
    ...import_common.folderRLC,
    displayName: "Parent Folder",
    description: "The parent folder where to create the new folder"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Simplify Output",
        name: "simplifyOutput",
        type: "boolean",
        default: true,
        description: "Whether to return a simplified version of the response instead of all fields"
      },
      {
        displayName: "Folder Color",
        name: "folderColorRgb",
        type: "color",
        default: "",
        description: "The color of the folder as an RGB hex string. If an unsupported color is specified, the closest color in the palette will be used instead."
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["folder"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const name = this.getNodeParameter("name", i) || "Untitled";
  const driveId = this.getNodeParameter("driveId", i, void 0, {
    extractValue: true
  });
  const folderId = this.getNodeParameter("folderId", i, void 0, {
    extractValue: true
  });
  const body = {
    name,
    mimeType: import_interfaces.DRIVE.FOLDER,
    parents: [(0, import_utils.setParentFolder)(folderId, driveId)]
  };
  const folderColorRgb = this.getNodeParameter("options.folderColorRgb", i, "") || void 0;
  if (folderColorRgb) {
    body.folderColorRgb = folderColorRgb;
  }
  const simplifyOutput = this.getNodeParameter("options.simplifyOutput", i, true);
  let fields;
  if (!simplifyOutput) {
    fields = "*";
  }
  const qs = {
    fields,
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
    spaces: "appDataFolder, drive",
    corpora: "allDrives"
  };
  const response = await import_transport.googleApiRequest.call(this, "POST", "/drive/v3/files", body, qs);
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
//# sourceMappingURL=create.operation.js.map