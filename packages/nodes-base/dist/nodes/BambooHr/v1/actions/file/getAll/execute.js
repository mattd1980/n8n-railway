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
var execute_exports = {};
__export(execute_exports, {
  getAll: () => getAll
});
module.exports = __toCommonJS(execute_exports);
var import_transport = require("../../../transport");
async function getAll(index) {
  const body = {};
  const requestMethod = "GET";
  const endpoint = "files/view";
  const simplifyOutput = this.getNodeParameter("simplifyOutput", index);
  const returnAll = this.getNodeParameter("returnAll", 0, false);
  const limit = this.getNodeParameter("limit", 0, 0);
  const responseData = await import_transport.apiRequest.call(this, requestMethod, endpoint, body);
  const onlyFilesArray = [];
  if (simplifyOutput) {
    for (let i = 0; i < responseData.categories.length; i++) {
      if (responseData.categories[i].hasOwnProperty("files")) {
        for (let j = 0; j < responseData.categories[i].files.length; j++) {
          onlyFilesArray.push(responseData.categories[i].files[j]);
        }
      }
    }
    if (!returnAll && onlyFilesArray.length > limit) {
      return this.helpers.returnJsonArray(onlyFilesArray.slice(0, limit));
    } else {
      return this.helpers.returnJsonArray(onlyFilesArray);
    }
  }
  if (!returnAll && responseData.categories.length > limit) {
    return this.helpers.returnJsonArray(responseData.categories.slice(0, limit));
  }
  return this.helpers.returnJsonArray(responseData.categories);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAll
});
//# sourceMappingURL=execute.js.map