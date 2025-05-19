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
var router_exports = {};
__export(router_exports, {
  router: () => router
});
module.exports = __toCommonJS(router_exports);
var import_n8n_workflow = require("n8n-workflow");
var drive = __toESM(require("./drive/Drive.resource"));
var file = __toESM(require("./file/File.resource"));
var fileFolder = __toESM(require("./fileFolder/FileFolder.resource"));
var folder = __toESM(require("./folder/Folder.resource"));
async function router() {
  const items = this.getInputData();
  const returnData = [];
  const resource = this.getNodeParameter("resource", 0);
  const operation = this.getNodeParameter("operation", 0);
  const googleDrive = {
    resource,
    operation
  };
  for (let i = 0; i < items.length; i++) {
    try {
      switch (googleDrive.resource) {
        case "drive":
          returnData.push(...await drive[googleDrive.operation].execute.call(this, i));
          break;
        case "file":
          returnData.push(...await file[googleDrive.operation].execute.call(this, i, items[i]));
          break;
        case "fileFolder":
          returnData.push(...await fileFolder[googleDrive.operation].execute.call(this, i));
          break;
        case "folder":
          returnData.push(...await folder[googleDrive.operation].execute.call(this, i));
          break;
        default:
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource "${resource}" is not known`);
      }
    } catch (error) {
      if (this.continueOnFail()) {
        if (resource === "file" && operation === "download") {
          items[i].json = { error: error.message };
        } else {
          returnData.push({ json: { error: error.message } });
        }
        continue;
      }
      throw error;
    }
  }
  return [returnData];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=router.js.map