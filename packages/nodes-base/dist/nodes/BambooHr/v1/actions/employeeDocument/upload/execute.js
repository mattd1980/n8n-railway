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
  upload: () => upload
});
module.exports = __toCommonJS(execute_exports);
var import_transport = require("../../../transport");
async function upload(index) {
  let body = {};
  const requestMethod = "POST";
  const id = this.getNodeParameter("employeeId", index);
  const category = this.getNodeParameter("categoryId", index);
  const options = this.getNodeParameter("options", index);
  const binaryPropertyName = this.getNodeParameter("binaryPropertyName", index);
  const { fileName, mimeType } = this.helpers.assertBinaryData(index, binaryPropertyName);
  const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(index, binaryPropertyName);
  body = {
    json: false,
    formData: {
      file: {
        value: binaryDataBuffer,
        options: {
          filename: fileName,
          contentType: mimeType
        }
      },
      fileName,
      category
    },
    resolveWithFullResponse: true
  };
  if (options.hasOwnProperty("share") && body.formData) {
    Object.assign(body.formData, options.share ? { share: "yes" } : { share: "no" });
  }
  const endpoint = `employees/${id}/files`;
  const { headers } = await import_transport.apiRequest.call(this, requestMethod, endpoint, {}, {}, body);
  return this.helpers.returnJsonArray({ fileId: headers.location.split("/").pop() });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  upload
});
//# sourceMappingURL=execute.js.map