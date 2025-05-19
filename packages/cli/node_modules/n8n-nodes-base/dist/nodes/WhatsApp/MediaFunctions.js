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
var MediaFunctions_exports = {};
__export(MediaFunctions_exports, {
  getUploadFormData: () => getUploadFormData,
  setupUpload: () => setupUpload
});
module.exports = __toCommonJS(MediaFunctions_exports);
var import_form_data = __toESM(require("form-data"));
var import_n8n_workflow = require("n8n-workflow");
async function getUploadFormData() {
  const mediaPropertyName = (this.getNodeParameter("mediaPropertyName") || "").trim();
  if (!mediaPropertyName)
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), 'Parameter "mediaPropertyName" is not defined');
  const binaryData = this.helpers.assertBinaryData(mediaPropertyName);
  const mediaFileName = this.getNodeParameter("additionalFields").mediaFileName;
  const fileName = mediaFileName || binaryData.fileName;
  if (!fileName)
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No file name given for media upload.");
  const buffer = await this.helpers.getBinaryDataBuffer(mediaPropertyName);
  const formData = new import_form_data.default();
  formData.append("file", buffer, { contentType: binaryData.mimeType, filename: fileName });
  formData.append("messaging_product", "whatsapp");
  return { fileName, formData };
}
async function setupUpload(requestOptions) {
  const uploadData = await getUploadFormData.call(this);
  requestOptions.body = uploadData.formData;
  return requestOptions;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUploadFormData,
  setupUpload
});
//# sourceMappingURL=MediaFunctions.js.map