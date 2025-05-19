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
var utils_exports = {};
__export(utils_exports, {
  errorMapper: () => errorMapper,
  escapeSpecialCharacters: () => escapeSpecialCharacters
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
function errorMapper(error, itemIndex, context) {
  let message;
  let description;
  if (error.message.includes("Cannot create a string longer than")) {
    message = "The file is too large";
    description = 'The binary file you are attempting to read exceeds 512MB, which is limit when using default binary data mode, try using the filesystem binary mode. More information <a href="https://docs.n8n.io/hosting/scaling/binary-data/" target="_blank">here</a>.';
  } else if (error.message.includes("EACCES") && context?.operation === "read") {
    const path = error.path || context?.filePath;
    message = `You don't have the permissions to access ${path}`;
    description = "Verify that the path specified in 'File(s) Selector' is correct, or change the file(s) permissions if needed";
  } else if (error.message.includes("EACCES") && context?.operation === "write") {
    const path = error.path || context?.filePath;
    message = `You don't have the permissions to write the file ${path}`;
    description = "Specify another destination folder in 'File Path and Name', or change the permissions of the parent folder";
  }
  return new import_n8n_workflow.NodeOperationError(this.getNode(), error, { itemIndex, message, description });
}
function escapeSpecialCharacters(str) {
  str = str.replace(/[()]/g, "\\$&");
  return str;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorMapper,
  escapeSpecialCharacters
});
//# sourceMappingURL=utils.js.map