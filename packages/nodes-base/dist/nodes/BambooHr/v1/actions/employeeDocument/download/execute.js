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
  download: () => download
});
module.exports = __toCommonJS(execute_exports);
var import_transport = require("../../../transport");
async function download(index) {
  const body = {};
  const requestMethod = "GET";
  const items = this.getInputData();
  const id = this.getNodeParameter("employeeId", index);
  const fileId = this.getNodeParameter("fileId", index);
  const output = this.getNodeParameter("output", index);
  const endpoint = `employees/${id}/files/${fileId}/`;
  const response = await import_transport.apiRequest.call(this, requestMethod, endpoint, body, {}, {
    encoding: null,
    json: false,
    resolveWithFullResponse: true
  });
  let mimeType = response.headers["content-type"];
  mimeType = mimeType ? mimeType.split(";").find((value) => value.includes("/")) : void 0;
  const contentDisposition = response.headers["content-disposition"];
  const fileNameRegex = /(?<=filename=").*\b/;
  const match = fileNameRegex.exec(contentDisposition);
  let fileName = "";
  if (match !== null) {
    fileName = match[0];
  }
  const newItem = {
    json: items[index].json,
    binary: {}
  };
  if (items[index].binary !== void 0 && newItem.binary) {
    Object.assign(newItem.binary, items[index].binary);
  }
  newItem.binary = {
    [output]: await this.helpers.prepareBinaryData(
      response.body,
      fileName,
      mimeType
    )
  };
  return [newItem];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  download
});
//# sourceMappingURL=execute.js.map