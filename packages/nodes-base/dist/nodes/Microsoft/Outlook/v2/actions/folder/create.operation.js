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
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(create_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Name",
    name: "displayName",
    description: "Name of the folder",
    type: "string",
    required: true,
    default: "",
    placeholder: "e.g. My Folder"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [{ ...import_descriptions.folderRLC, displayName: "Parent Folder", required: false }]
  }
];
const displayOptions = {
  show: {
    resource: ["folder"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const displayName = this.getNodeParameter("displayName", index);
  const folderId = (0, import_utils.decodeOutlookId)(
    this.getNodeParameter("options.folderId", index, "", {
      extractValue: true
    })
  );
  const body = {
    displayName
  };
  let endpoint;
  if (folderId) {
    endpoint = `/mailFolders/${folderId}/childFolders`;
  } else {
    endpoint = "/mailFolders";
  }
  const responseData = await import_transport.microsoftApiRequest.call(this, "POST", endpoint, body);
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData),
    { itemData: { item: index } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=create.operation.js.map