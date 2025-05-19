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
var share_operation_exports = {};
__export(share_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(share_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.folderNoRootRLC,
    description: "The folder to share"
  },
  import_common.permissionsOptions,
  import_common.shareOptions
];
const displayOptions = {
  show: {
    resource: ["folder"],
    operation: ["share"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const returnData = [];
  const folderId = this.getNodeParameter("folderNoRootId", i, void 0, {
    extractValue: true
  });
  const permissions = this.getNodeParameter("permissionsUi", i);
  const shareOption = this.getNodeParameter("options", i);
  const body = {};
  const qs = {
    supportsAllDrives: true
  };
  if (permissions.permissionsValues) {
    Object.assign(body, permissions.permissionsValues);
  }
  Object.assign(qs, shareOption);
  const response = await import_transport.googleApiRequest.call(
    this,
    "POST",
    `/drive/v3/files/${folderId}/permissions`,
    body,
    qs
  );
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(response),
    { itemData: { item: i } }
  );
  returnData.push(...executionData);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=share.operation.js.map